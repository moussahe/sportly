'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { colors } from '../../styles/colors'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setSuccess(true)
        setError('')
      } catch (err) {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } else {
      setError('Veuillez entrer votre adresse email')
    }
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background }}>
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-2" style={{ color: colors.primary, fontFamily: "'Lora', serif" }}>Sportly</h1>
          <p className="text-xl" style={{ color: colors.text }}>Le sport moderne</p>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center" style={{ color: colors.background }}>Mot de passe oublié</CardTitle>
            <CardDescription className="text-center">Entrez votre email pour réinitialiser votre mot de passe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!success ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
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
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full font-semibold" style={{ backgroundColor: colors.primary, color: colors.text }}>
                  Réinitialiser le mot de passe
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <p className="text-green-600 mb-4">Un email de réinitialisation a été envoyé à votre adresse.</p>
                <Link href="/auth" passHref>
                  <Button className="font-semibold" style={{ backgroundColor: colors.primary, color: colors.text }}>
                    Retour à la connexion
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/auth" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              Retour à la connexion
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}