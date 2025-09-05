import { NextResponse } from "next/server"
import crypto from "crypto"

export const runtime = "nodejs"

export async function GET() {
  try {
    // Generate cryptographically secure nonce
    const nonce = crypto.randomBytes(32).toString("hex")

    console.log("[v0] Generated SIWE nonce:", nonce)

    const response = NextResponse.json({ nonce })

    // Set HTTP-only cookie with 10-minute expiration
    response.cookies.set("siwe_nonce", nonce, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 600, // 10 minutes
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Error generating nonce:", error)
    return NextResponse.json({ error: "Failed to generate nonce" }, { status: 500 })
  }
}
