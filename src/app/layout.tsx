"use client"
import 'bootstrap/dist/css/bootstrap.css';
import '@ionic/react/css/core.css';
import './globals.css'
import { Inter } from 'next/font/google'
import { FooterBar, NavBar } from './components/SiteNavigation';
import { setupIonicReact } from '@ionic/react';
import Script from 'next/script';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

setupIonicReact();
const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Zimbabwe Services Online',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        {children}
        <FloatingWhatsApp phoneNumber='+263788984320' accountName='Zim Services Online' avatar="https://voideawn.sirv.com/website/home_three.jpg"/>
        <FooterBar/>
        <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></Script>
        </body>
    </html>
  )
}
