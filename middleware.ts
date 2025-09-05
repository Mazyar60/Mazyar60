import { type NextRequest, NextResponse } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production"

// Protected routes that require SIWE authentication
const PROTECTED_ROUTES = ["/dashboard", "/api/miners", "/api/rewards", "/api/referrals", "/profile", "/vip"]

function verifySimpleJWT(token: string, secret: string): any {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) {
      throw new Error("Invalid token format")
    }

    const [header, payload, signature] = parts

    // Verify signature
    const crypto = require("crypto")
    const expectedSignature = crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64url")

    if (signature !== expectedSignature) {
      throw new Error("Invalid signature")
    }

    // Decode payload
    const decodedPayload = JSON.parse(Buffer.from(payload, "base64url").toString())

    // Check expiration
    if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error("Token expired")
    }

    return decodedPayload
  } catch (error) {
    throw new Error("Token verification failed")
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check if route needs protection
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  // Get session token
  const sessionToken = req.cookies.get("cmg_session")?.value

  if (!sessionToken) {
    console.log("[v0] No session token found, redirecting to auth")
    return NextResponse.redirect(new URL("/auth/siwe", req.url))
  }

  try {
    const payload = verifySimpleJWT(sessionToken, JWT_SECRET)
    console.log("[v0] Session verified for protected route:", pathname, "Address:", payload.address)
    return NextResponse.next()
  } catch (error) {
    console.log("[v0] Invalid session token, redirecting to auth")

    // Clear invalid session cookie
    const response = NextResponse.redirect(new URL("/auth/siwe", req.url))
    response.cookies.set("cmg_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    })

    return response
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/miners/:path*",
    "/api/rewards/:path*",
    "/api/referrals/:path*",
    "/profile/:path*",
    "/vip/:path*",
  ],
}
