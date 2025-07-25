import type React from "react"
import type { Metadata } from "next"
import { Mali } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const mali = Mali({
  subsets: ["latin", "thai"],
  weight: ["200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "nails Now - จองคิวทำเล็บออนไลน์",
  description: "จองคิวทำเล็บออนไลน์ที่ nails Now บริการมืออาชีพ ด้วยผลิตภัณฑ์คุณภาพสูง",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={mali.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
