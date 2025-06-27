import type React from "react"
import './globals.css'
import { Toaster } from "sonner"

export const metadata = {
  title: "Gerenciamento de Usuários e Posts",
  description: "Crie, edite e exclua usuários e posts",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
