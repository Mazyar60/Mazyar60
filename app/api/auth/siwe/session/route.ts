import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const runtime = "nodejs"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function GET(req: NextRequest) {
  try {
    const sessionToken = req.cookies.get("cmg_session")?.value

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const decoded = jwt.verify(sessionToken, JWT_SECRET) as any

    return NextResponse.json({
      authenticated: true,
      address: decoded.address,
      chainId: decoded.chainId,
      iat: decoded.iat,
      exp: decoded.exp,
    })
  } catch (error) {
    console.error("Session verification error:", error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true })

    // Clear session cookie
    response.cookies.set("cmg_session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
