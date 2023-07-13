"use client"
import 'bootstrap/dist/css/bootstrap.css';
import '@ionic/react/css/core.css';
import './globals.css'
import { Inter } from 'next/font/google'
import { FooterBar, NavBar } from './components/SiteNavigation';
import { setupIonicReact } from '@ionic/react';
import Script from 'next/script';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useContext,useState,useLayoutEffect } from 'react';
import { Authorized } from './components/contexts';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './api/firebase';

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

  const [access,setAccess] = useState<boolean>(false)
  const auth =getAuth(app)
  useLayoutEffect(()=>{
   onAuthStateChanged(auth,(user)=>{
    console.log(user)
    if(user){
      setAccess(true)
    }else{
      setAccess(false)
    }
   })
  },[access])
  return (
    <html lang="en">
      <body className={inter.className} >
      <Authorized.Provider value={{access,setAccess}}>
        <NavBar/>
        {children}
        <FloatingWhatsApp statusMessage='Typically replies in 2 minutes' phoneNumber='+263788984320' accountName='Zim Services Online' avatar="https://voideawn.sirv.com/website/home_three.jpg"/>
        <FooterBar/>
        </Authorized.Provider>
        <Script src="https://scripts.sirv.com/sirvjs/v3/sirv.js"></Script>
        </body>
    </html>
  )
}
