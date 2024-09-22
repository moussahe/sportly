'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, MessageSquare, ArrowLeft, LogOut } from 'lucide-react'
import { format, startOfWeek, addDays, addWeeks, subWeeks } from 'date-fns'
import { fr } from 'date-fns/locale'
import Head from 'next/head'

const colors = {
  primary: "#FF3300",
  background: "#000033",
  text: "#FFFFFF",
}

const courts = [
  { id: 1, name: "Tennis Court 1" },
  { id: 2, name: "Tennis Court 2" },
  { id: 3, name: "Basketball Court" },
  { id: 4, name: "Football Field" },
]

const events = [
  { 
    id: 1, 
    title: 'Réservation - John Doe', 
    start: '2023-09-18T08:00:00', 
    end: '2023-09-18T09:30:00', 
    courtId: 1,
    participants: ['John Doe', 'Jane Smith'],
    paid: true,
    organizerPhone: '0123456789',
    lobbyLevel: 3,
    status: 'active'
  },
  { 
    id: 2, 
    title: 'Tournoi - Alice Smith', 
    start: '2023-09-19T10:00:00', 
    end: '2023-09-19T12:00:00', 
    courtId: 1,
    participants: ['Alice Smith', 'Bob Johnson', 'Carol Williams'],
    paid: true,
    organizerPhone: '0987654321',
    lobbyLevel: 4,
    status: 'active'
  },
  // Add more events as needed
]

export default function CalendarPage() {
  const [selectedCourt, setSelectedCourt] = useState(courts[0].id)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMessageSectionOpen, setIsMessageSectionOpen] = useState(false)
  const [message, setMessage] = useState('')

  const managerName = "John Doe" // This should be dynamically set based on the logged-in user

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked")
  }

  const handleGoBack = () => {
    // Implement go back logic here
    console.log("Go back clicked")
  }

  const filteredEvents = events.filter(event => event.courtId === selectedCourt)

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStart(prevWeek => 
      direction === 'prev' ? subWeeks(prevWeek, 1) : addWeeks(prevWeek, 1)
    )
  }

  const handleEventClick = (event: any) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
    setIsMessageSectionOpen(false)
  }

  const handleSendMessage = () => {
    console.log(`Message envoyé au lobby: ${message}`)
    setMessage('')
    setIsMessageSectionOpen(false)
    setIsModalOpen(false)
  }

  const handleChangeCourt = (newCourtId: number) => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? { ...event, courtId: newCourtId } : event
    )
    console.log('Événements mis à jour:', updatedEvents)
    setIsModalOpen(false)
  }

  const handleSuspendEvent = () => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? { ...event, status: 'suspended' } : event
    )
    console.log('Événement suspendu:', updatedEvents)
    setIsModalOpen(false)
  }

  const handleCancelEvent = () => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id ? { ...event, status: 'cancelled' } : event
    )
    console.log('Événement annulé:', updatedEvents)
    setIsModalOpen(false)
  }

  const renderWeekView = () => {
    const days = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))
    const hours = Array.from({ length: 16 }, (_, i) => i + 6) // 6:00 to 22:00

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100"></th>
              {days.map((day, index) => (
                <th key={index} className="border p-2 bg-gray-100">
                  {format(day, 'EEEE d', { locale: fr })}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="border p-2 bg-gray-50 text-sm">
                  {`${hour.toString().padStart(2, '0')}:00`}
                </td>
                {days.map((day, dayIndex) => {
                  const eventsForThisHour = filteredEvents.filter(event => {
                    const eventStart = new Date(event.start)
                    return eventStart.getDate() === day.getDate() && eventStart.getHours() === hour
                  })
                  return (
                    <td key={dayIndex} className="border p-2 relative min-h-[60px]">
                      {eventsForThisHour.map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`absolute top-0 left-0 right-0 p-1 text-xs overflow-hidden cursor-pointer ${
                            event.status === 'suspended' ? 'bg-yellow-100' :
                            event.status === 'cancelled' ? 'bg-red-100' : 'bg-blue-100'
                          }`}
                          style={{
                            height: `${(new Date(event.end).getHours() - new Date(event.start).getHours()) * 60}px`,
                          }}
                          onClick={() => handleEventClick(event)}
                        >
                          {event.title}
                        </div>
                      ))}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
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
            <div className="flex items-center">
              <Button onClick={handleGoBack} variant="ghost" size="icon" className="mr-4">
                <ArrowLeft className="h-6 w-6" />
              </Button>
              <h1 className="text-4xl font-bold text-[#FF3300] font-['Lora',serif]">
                Sportly.
              </h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-700">Bienvenue, {managerName}</span>
              <Button onClick={handleLogout} variant="outline" className="font-medium">
                <LogOut className="mr-2 h-4 w-4" /> Déconnexion
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#FF3300]">Calendrier des réservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Select onValueChange={(value) => setSelectedCourt(Number(value))} defaultValue={selectedCourt.toString()}>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Sélectionnez un terrain" />
                  </SelectTrigger>
                  <SelectContent>
                    {courts.map((court) => (
                      <SelectItem key={court.id} value={court.id.toString()}>
                        {court.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-4">
                  <Button onClick={() => navigateWeek('prev')} variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold">
                    {format(currentWeekStart, 'MMMM yyyy', { locale: fr })}
                  </span>
                  <Button onClick={() => navigateWeek('next')} variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {renderWeekView()}
            </CardContent>
          </Card>
        </main>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#FF3300]">Détails du créneau</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Titre</Label>
                    <p className="text-lg font-semibold">{selectedEvent.title}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Statut de paiement</Label>
                    <p className="text-lg font-semibold">{selectedEvent.paid ? 'Payé' : 'Non payé'}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Téléphone de l'organisateur</Label>
                    <p className="text-lg font-semibold">{selectedEvent.organizerPhone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Niveau du lobby</Label>
                    <p className="text-lg font-semibold">{selectedEvent.lobbyLevel}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Participants</Label>
                  <p className="text-lg font-semibold">{selectedEvent.participants.join(', ')}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Changer de terrain</Label>
                  <Select onValueChange={(value) => handleChangeCourt(Number(value))} defaultValue={selectedEvent.courtId.toString()}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sélectionnez un terrain" />
                    </SelectTrigger>
                    <SelectContent>
                      {courts.map((court) => (
                        <SelectItem key={court.id} value={court.id.toString()}>
                          {court.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleSuspendEvent} variant="outline" className="flex-1">
                    Suspendre
                  </Button>
                  <Button onClick={handleCancelEvent} variant="destructive" className="flex-1">
                    Annuler
                  </Button>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsMessageSectionOpen(true)} className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                Envoyer un message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isMessageSectionOpen} onOpenChange={setIsMessageSectionOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#FF3300]">Envoyer un message au lobby</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message ici"
                className="h-32"
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSendMessage} className="w-full">Envoyer le message</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}