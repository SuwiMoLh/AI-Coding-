"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Star, Phone, Mail, User, Crown } from "lucide-react"
import { dbOperations, type Service, type Booking } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { FloatingIcons, NailIcon, HandNailsIcon } from "@/components/nail-icons"
import { NailArtDisplay, ServiceNailIcons } from "@/components/nail-art-display"

export default function NailSalonBooking() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [bookingData, setBookingData] = useState<Partial<Booking>>({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    booking_date: "",
    booking_time: "",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    const services = await dbOperations.getServices()
    setServices(services)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await dbOperations.createBooking({
        ...bookingData,
        service_id: Number.parseInt(selectedService),
      } as Booking)

      if (!result.success) {
        throw new Error(result.error || "Failed to create booking")
      }

      toast({
        title: "จองคิวสำเร็จ! 💅✨",
        description: "เราจะติดต่อกลับเพื่อยืนยันการจองในเร็วๆ นี้",
      })

      // Reset form
      setBookingData({
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        booking_date: "",
        booking_time: "",
        notes: "",
      })
      setSelectedService("")
    } catch (error) {
      console.error("Error creating booking:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถจองคิวได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceData = services.find((s) => s.id.toString() === selectedService)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
      <FloatingIcons />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
                <NailIcon className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-800">nails Now</h1>
              <NailIcon className="w-4 h-4 text-pink-400 ml-1" />
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>02-xxx-xxxx</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              ความสวยงามที่
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500"> ปลายนิ้ว</span>
              <HandNailsIcon className="inline-block w-10 h-10 ml-2 text-pink-400" />
            </h2>
            <p className="text-lg text-gray-600 mb-8">บริการทำเล็บมืออาชีพ ด้วยผลิตภัณฑ์คุณภาพสูง และการออกแบบที่เป็นเอกลักษณ์</p>

            {/* Nail Art Display */}
            <NailArtDisplay />

            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>4.9/5 รีวิว</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>เปิด 9:00-19:00</span>
              </div>
              <div className="flex items-center space-x-1">
                <NailIcon className="w-4 h-4 text-pink-400" />
                <span>บริการครบครัน</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="bg-white/70 backdrop-blur-sm border-pink-200 shadow-xl">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crown className="w-6 h-6 text-pink-500" />
                <NailIcon className="w-6 h-6 text-pink-500" />
                <CardTitle className="text-2xl text-gray-800">จองคิวทำเล็บ</CardTitle>
                <NailIcon className="w-6 h-6 text-pink-500" />
                <Crown className="w-6 h-6 text-pink-500" />
              </div>
              <CardDescription className="text-gray-600">กรอกข้อมูลเพื่อจองคิวทำเล็บกับเรา</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-gray-700 flex items-center space-x-1">
                    <NailIcon className="w-4 h-4 text-pink-500" />
                    <span>เลือกบริการ *</span>
                  </Label>
                  <Select value={selectedService} onValueChange={setSelectedService} required>
                    <SelectTrigger className="border-pink-200 focus:border-pink-400">
                      <SelectValue placeholder="เลือกบริการที่ต้องการ" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center space-x-2">
                              <ServiceNailIcons serviceType={service.name} />
                              <span>{service.name}</span>
                            </div>
                            <span className="text-pink-600 font-medium ml-4">฿{service.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedServiceData && (
                    <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <ServiceNailIcons serviceType={selectedServiceData.name} />
                        <p className="text-sm text-gray-600">{selectedServiceData.description}</p>
                      </div>
                      <p className="text-sm text-pink-600 mt-1">
                        ระยะเวลา: {selectedServiceData.duration} นาที | ราคา: ฿{selectedServiceData.price}
                      </p>
                    </div>
                  )}
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      ชื่อ-นามสกุล *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="กรอกชื่อ-นามสกุล"
                        className="pl-10 border-pink-200 focus:border-pink-400"
                        value={bookingData.customer_name}
                        onChange={(e) => setBookingData({ ...bookingData, customer_name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      เบอร์โทรศัพท์ *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0xx-xxx-xxxx"
                        className="pl-10 border-pink-200 focus:border-pink-400"
                        value={bookingData.customer_phone}
                        onChange={(e) => setBookingData({ ...bookingData, customer_phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">
                    อีเมล (ไม่บังคับ)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="pl-10 border-pink-200 focus:border-pink-400"
                      value={bookingData.customer_email}
                      onChange={(e) => setBookingData({ ...bookingData, customer_email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-gray-700">
                      วันที่ต้องการ *
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10 border-pink-200 focus:border-pink-400"
                        value={bookingData.booking_date}
                        onChange={(e) => setBookingData({ ...bookingData, booking_date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-gray-700">
                      เวลาที่ต้องการ *
                    </Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10 border-pink-200 focus:border-pink-400"
                        value={bookingData.booking_time}
                        onChange={(e) => setBookingData({ ...bookingData, booking_time: e.target.value })}
                        min="09:00"
                        max="18:00"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-gray-700">
                    หมายเหตุเพิ่มเติม
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="ระบุความต้องการพิเศษ หรือสีที่ต้องการ... 💅"
                    className="border-pink-200 focus:border-pink-400 resize-none"
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "กำลังจองคิว... 💅💕" : "จองคิวเลย 💅💖✨"}
                </Button>

                <p className="text-xs text-gray-500 text-center">เราจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง</p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">บริการของเรา</h3>
            <div className="flex items-center justify-center space-x-2">
              <NailIcon className="w-6 h-6 text-pink-400" />
              <span className="text-gray-600">เลือกบริการที่ใช่สำหรับคุณ</span>
              <NailIcon className="w-6 h-6 text-pink-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="bg-white/70 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-2">
                    <ServiceNailIcons serviceType={service.name} />
                    <CardTitle className="text-lg text-gray-800">{service.name}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration} นาที</span>
                    </span>
                    <span className="text-lg font-bold text-pink-600">฿{service.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center">
              <NailIcon className="w-4 h-4 text-white" />
            </div>
            <h4 className="text-lg font-semibold">nails Now</h4>
            <NailIcon className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-gray-400 mb-2">ความสวยงามที่ปลายนิ้วของคุณ 💅</p>
          <p className="text-sm text-gray-500">เปิดทุกวัน 9:00-19:00 | โทร: 02-xxx-xxxx</p>
        </div>
      </footer>
    </div>
  )
}
