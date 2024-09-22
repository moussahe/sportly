'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { FaGoogle, FaFacebook, FaApple, FaTwitter } from 'react-icons/fa'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { colors } from '../styles/colors'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      // Implémentez ici la logique d'authentification réelle
      console.log('Connexion avec:', email, password)
      router.push('/')
    } else {
      setError('Veuillez remplir tous les champs')
    }
  }

  const handleSSOLogin = (provider: string) => {
    // Implémentez ici la logique d'authentification SSO réelle
    console.log('Connexion avec:', provider)
    router.push('/')
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
        <div className="text-center mb-16"> {/* Augmenté la marge en bas de mb-8 à mb-16 */}
          <h1 className="text-6xl font-bold mb-4 gowun-batang-bold" style={{ color: colors.primary }}>Sportly.</h1> {/* Augmenté la marge en bas de mb-2 à mb-4 */}
          <p className="text-lg" style={{ color: colors.text }}>Le sport moderne</p>
        </div>
        <Card className="w-full max-w-md mt-8"> {/* Ajouté une marge en haut mt-8 */}
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center" style={{ color: colors.background }}>Connexion</CardTitle>
            <CardDescription className="text-center">Connectez-vous pour accéder aux réservations sportives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {['Google', 'Facebook', 'Apple', 'Twitter'].map((provider) => (
                <Button 
                  key={provider}
                  onClick={() => handleSSOLogin(provider)} 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2 text-sm"
                  style={{ borderColor: colors.primary, color: colors.background }}
                >
                  {provider === 'Google' && <FaGoogle />}
                  {provider === 'Facebook' && <FaFacebook />}
                  {provider === 'Apple' && <FaApple />}
                  {provider === 'Twitter' && <FaTwitter />}
                  <span>{provider}</span>
                </Button>
              ))}
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Ou</span>
              </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: colors.background }}>Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderColor: colors.background }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: colors.background }}>Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderColor: colors.background }}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full font-semibold" style={{ backgroundColor: colors.primary, color: colors.text }}>
                Se connecter
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth/forgot-password" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              Mot de passe oublié
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}