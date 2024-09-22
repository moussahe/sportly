'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Users, Info, Trophy, LogOut } from 'lucide-react'

const colors = {
  primary: "#FF3300",
  background: "#000033",
  text: "#FFFFFF",
}

const menuItems = [
  { title: "Calendrier", icon: CalendarDays, description: "Gérez les réservations et les disponibilités de vos installations sportives.", action: "Accéder au calendrier", path: "/calendar" },
  { title: "Gestion des utilisateurs", icon: Users, description: "Gérez les comptes utilisateurs, les autorisations et les abonnements.", action: "Gérer les utilisateurs", path: "/users" },
  { title: "Informations du centre", icon: Info, description: "Mettez à jour les informations de votre centre sportif et gérez vos installations.", action: "Modifier les informations", path: "/center-info" },
  { title: "Tournois", icon: Trophy, description: "Créez et gérez des tournois pour vos différentes disciplines sportives.", action: "Créer un tournoi", path: "/tournaments" }
]

export default function SportsBookingManagerPage() {
  const [managerName, setManagerName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Simuler la récupération du nom du gestionnaire
    setManagerName("John Doe")
  }, [])

  const handleLogout = () => {
    console.log('Déconnexion')
    router.push('/auth/login')
  }

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`)
    router.push(path)
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen bg-[#000033] font-['Inria_Sans',sans-serif]">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-[#FF3300] font-['Lora',serif]">
              Sportly.
            </h1>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Bienvenue, {managerName}</span>
              <Button onClick={handleLogout} variant="outline" className="font-medium">
                <LogOut className="mr-2 h-4 w-4" /> Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {menuItems.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl font-semibold">
                      <item.icon className="mr-4 h-8 w-8 text-[#FF3300]" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-600">{item.description}</p>
                    <Button 
                      onClick={() => handleNavigation(item.path)} 
                      className="w-full text-lg py-6 font-medium bg-[#FF3300] text-white hover:bg-[#FF3300]/90"
                    >
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">Aperçu rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Réservations aujourd'hui</h3>
                    <p className="text-3xl font-bold text-[#FF3300]">15</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Terrains disponibles</h3>
                    <p className="text-3xl font-bold text-[#FF3300]">8/10</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Prochain tournoi</h3>
                    <p className="text-xl">Tournoi de tennis - 15 juin 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  )
}