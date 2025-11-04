import './globals.css'

export const metadata = {
  title: 'Пивас - Крафтове пиво та затишна атмосфера',
  description: 'ПИВАС — магазини розливного пива, закуски, доставка та франшиза.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/lumberjack-rough" rel="stylesheet" />
        <link href="https://fonts.cdnfonts.com/css/irpin-type" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
