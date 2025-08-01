import './ui/global.css'
import React, { ReactNode} from 'react';

export const metadata = {
  title: 'NeOZON marketplace',
  description: 'Generated by Next.js developed by Sergey Prasolov',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-light mx-3 p-2'>{children}</body>
    </html>
  )
}
