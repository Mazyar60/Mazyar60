import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import * as bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

export const runtime = "nodejs"

let prisma: PrismaClient

try {
  if (process.env.DATABASE_URL) {
    prisma = new PrismaClient()
  } else {
    // Mock prisma for build time when DATABASE_URL is not available
    prisma = {} as PrismaClient
  }
} catch (error) {
  console.warn("Prisma initialization failed during build:", error)
  prisma = {} as PrismaClient
}

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  country: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  phone: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const data = await req.json()
    const validatedData = registerSchema.parse(data)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(validatedData.password, 12)

    // Create user with profile
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: `${validatedData.firstName} ${validatedData.lastName}`.trim(),
        passwordHash,
        profile: {
          create: {
            nickname: `${validatedData.firstName} ${validatedData.lastName}`.trim(),
            country: validatedData.country,
            city: validatedData.city,
            region: validatedData.region,
            phone: validatedData.phone,
          },
        },
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    console.log("[v0] User registered successfully:", user.email)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Registration error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
