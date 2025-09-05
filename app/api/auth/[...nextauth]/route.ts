import NextAuth, { type NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import * as bcrypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"

export const runtime = "nodejs"

let prisma: PrismaClient | null = null

try {
  if (process.env.DATABASE_URL && typeof window === "undefined") {
    prisma = new PrismaClient()
  }
} catch (error) {
  console.warn("Prisma initialization failed during build:", error)
  prisma = null
}

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
})

export const authOptions: NextAuthOptions = {
  adapter: prisma ? PrismaAdapter(prisma) : undefined,
  session: { strategy: prisma ? "database" : "jwt" },
  pages: {
    signIn: "/auth",
    error: "/auth",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!prisma || !process.env.DATABASE_URL) {
            return null
          }

          const parsed = credentialsSchema.safeParse(credentials)
          if (!parsed.success) {
            throw new Error("Invalid email or password")
          }

          const { email, password } = parsed.data

          const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true },
          })

          if (!user || !user.passwordHash) {
            throw new Error("Invalid email or password")
          }

          const isValidPassword = await bcrypt.compare(password, user.passwordHash)
          if (!isValidPassword) {
            throw new Error("Invalid email or password")
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name || "",
            image: user.profile?.avatarUrl,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-build",
  callbacks: {
    async session({ session, user, token }) {
      if (prisma && process.env.DATABASE_URL && user) {
        if (session.user) {
          session.user.id = user.id

          // Fetch profile data
          try {
            const profile = await prisma.profile.findUnique({
              where: { userId: user.id },
            })

            if (profile) {
              ;(session as any).profile = profile
            }
          } catch (error) {
            console.error("Profile fetch error:", error)
          }
        }
      } else if (token && session.user) {
        // JWT session handling
        session.user.id = token.sub || ""
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (!prisma || !process.env.DATABASE_URL) {
        return true
      }

      try {
        // Create profile for new users
        if (account?.provider === "google" && user.id) {
          const existingProfile = await prisma.profile.findUnique({
            where: { userId: user.id },
          })

          if (!existingProfile) {
            await prisma.profile.create({
              data: {
                userId: user.id,
                nickname: user.name || "",
                avatarUrl: user.image || "",
              },
            })
          }
        }
      } catch (error) {
        console.error("Profile creation error:", error)
      }
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
