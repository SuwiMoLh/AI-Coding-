import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export type Service = {
  id: number
  name: string
  description: string
  duration: number
  price: number
}

export type Booking = {
  id?: number
  customer_name: string
  customer_phone: string
  customer_email?: string
  service_id: number
  booking_date: string
  booking_time: string
  notes?: string
  status?: string
}

// Mock data for when Supabase is not configured
export const mockServices: Service[] = [
  {
    id: 1,
    name: "เจลเล็บสีพื้น",
    description: "ทาเจลเล็บสีพื้นธรรมดา สวยงามและทนทาน",
    duration: 60,
    price: 350.0,
  },
  {
    id: 2,
    name: "เจลเล็บลายศิลป์",
    description: "เจลเล็บพร้อมลายศิลป์สวยงาม ออกแบบตามต้องการ",
    duration: 90,
    price: 550.0,
  },
  {
    id: 3,
    name: "ต่อเล็บเจล",
    description: "ต่อเล็บเจลให้ยาวสวย พร้อมทาสีตามต้องการ",
    duration: 120,
    price: 750.0,
  },
  {
    id: 4,
    name: "มานิเคียร์",
    description: "ดูแลเล็บมือ ตัดแต่งเล็บ และบำรุงมือ",
    duration: 45,
    price: 250.0,
  },
  {
    id: 5,
    name: "เพดิเคียร์",
    description: "ดูแลเล็บเท้า ตัดแต่งเล็บ และบำรุงเท้า",
    duration: 60,
    price: 300.0,
  },
  {
    id: 6,
    name: "ถอดเจลเล็บ",
    description: "ถอดเจลเล็บเก่าและบำรุงเล็บ",
    duration: 30,
    price: 150.0,
  },
]

// Helper functions for database operations
export const dbOperations = {
  async getServices(): Promise<Service[]> {
    if (supabase) {
      const { data, error } = await supabase.from("services").select("*").order("price")
      if (error) {
        console.error("Error fetching services:", error)
        return mockServices
      }
      return data || mockServices
    }
    return mockServices
  },

  async createBooking(booking: Omit<Booking, "id">): Promise<{ success: boolean; error?: string }> {
    if (supabase) {
      const { data, error } = await supabase.from("bookings").insert([booking]).select()

      if (error) {
        console.error("Error creating booking:", error)
        return { success: false, error: error.message }
      }
      return { success: true }
    } else {
      // Mock successful booking when Supabase is not configured
      console.log("Mock booking created:", booking)
      return { success: true }
    }
  },
}
