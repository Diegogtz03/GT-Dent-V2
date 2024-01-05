import './globals.css'

export const metadata = {
  title: 'GT Dent',
  description: 'An app by Diego Gtz',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
