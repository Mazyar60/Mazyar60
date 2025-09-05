import { type NextRequest, NextResponse } from "next/server"
import { SiweMessage } from "siwe"
import { z } from "zod"

export const runtime = "nodejs"

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-change-in-production"
const SIWE_DOMAIN = process.env.NEXT_PUBLIC_SIWE_DOMAIN || "coinminingrz.vercel.app"
const SIWE_URI = process.env.NEXT_PUBLIC_SIWE_URI || "https://coinminingrz.vercel.app"
const BSC_CHAIN_ID = 56

// Simple JWT implementation to avoid library conflicts
function createSimpleJWT(payload: any, secret: string, expiresIn = "24h") {
  const header = { alg: "HS256", typ: "JWT" }
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (expiresIn === "24h" ? 86400 : 3600)

  const jwtPayload = { ...payload, iat: now, exp }

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url")
  const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString("base64url")

  const crypto = require("crypto")
  const signature = crypto.createHmac("sha256", secret).update(`${encodedHeader}.${encodedPayload}`).digest("base64url")

  return `${encodedHeader}.${encodedPayload}.${signature}`
}

const verifySchema = z.object({
  message: z.string(),
  signature: z.string(),
  address: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, signature, address } = verifySchema.parse(body)

    // Get nonce from cookie
    const nonce = req.cookies.get("siwe_nonce")?.value
    if (!nonce) {
      return NextResponse.json({ error: "Nonce not found or expired" }, { status: 400 })
    }

    console.log("[v0] Verifying SIWE message for address:", address)

    // Parse and validate SIWE message
    const siweMessage = new SiweMessage(message)
    const fields = await siweMessage.verify({ signature })

    // Strict validation of all fields
    if (fields.data.nonce !== nonce) {
      throw new Error("Invalid nonce")
    }

    if (fields.data.domain !== SIWE_DOMAIN) {
      throw new Error("Invalid domain")
    }

    if (fields.data.uri !== SIWE_URI) {
      throw new Error("Invalid URI")
    }

    if (fields.data.chainId !== BSC_CHAIN_ID) {
      throw new Error("Invalid chain ID - must be BSC (56)")
    }

    if (fields.data.address.toLowerCase() !== address.toLowerCase()) {
      throw new Error("Address mismatch")
    }

    // Check expiration
    if (fields.data.expirationTime && new Date(fields.data.expirationTime) < new Date()) {
      throw new Error("Message expired")
    }

    console.log("[v0] SIWE verification successful for:", address)

    const sessionToken = createSimpleJWT(
      {
        address: address.toLowerCase(),
        chainId: BSC_CHAIN_ID,
      },
      JWT_SECRET,
      "24h",
    )

    const response = NextResponse.json({
      success: true,
      address: address.toLowerCase(),
      chainId: BSC_CHAIN_ID,
    })

    // Set session cookie (24h)
    response.cookies.set("cmg_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
      path: "/",
    })

    // Clear nonce cookie (one-time use)
    response.cookies.set("siwe_nonce", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch (error: any) {
    console.error("SIWE verification error:", error)
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 400 })
  }
}
