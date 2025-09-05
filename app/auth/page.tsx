"use client"

import type React from "react"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Lock, User, MapPin, Phone, Chrome, Zap, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "Brazil",
  "India",
  "China",
  "Mexico",
  "Spain",
]

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    region: "",
    phone: "",
  })

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else if (result?.ok) {
        // Refresh session and redirect
        await getSession()
        router.push("/dashboard")
      }
    } catch (error) {
      setError("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords match
    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          password: signUpData.password,
          country: signUpData.country,
          city: signUpData.city,
          region: signUpData.region,
          phone: signUpData.phone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Auto sign in after successful registration
        const signInResult = await signIn("credentials", {
          email: signUpData.email,
          password: signUpData.password,
          redirect: false,
        })

        if (signInResult?.ok) {
          await getSession()
          router.push("/dashboard")
        }
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (error) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      setError("Google sign in failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-effect">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-serif font-bold text-foreground pulse-neon">
              CoinMining<span className="text-primary">.Game</span>
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted-foreground">Sign in or create your mining account</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full glow-effect" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={signUpData.firstName}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={signUpData.lastName}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, lastName: e.target.value }))}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Create password"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, password: e.target.value }))}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm password"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                          className="pl-10"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={signUpData.country}
                      onValueChange={(value) => setSignUpData((prev) => ({ ...prev, country: value }))}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="city"
                          placeholder="Your city"
                          value={signUpData.city}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, city: e.target.value }))}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="region"
                          placeholder="Region/State"
                          value={signUpData.region}
                          onChange={(e) => setSignUpData((prev) => ({ ...prev, region: e.target.value }))}
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Your phone number"
                        value={signUpData.phone}
                        onChange={(e) => setSignUpData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="pl-10"
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full glow-effect" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="flex items-center gap-2 p-3 mt-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}

            <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 bg-transparent"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
