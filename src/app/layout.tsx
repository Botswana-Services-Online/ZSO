"use client"
import 'bootstrap/dist/css/bootstrap.css';
import '@ionic/react/css/core.css';
import './globals.css'
//import { Inter } from 'next/font/google'
import { FooterBar, NavBar } from './components/SiteNavigation';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import { useState,useEffect } from 'react';
import { Authorized } from './components/contexts';
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { app } from './api/firebase';
import { fetchData } from './components/getData';
import { userData, userDataDefault } from './components/schemes';


// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Zimbabwe Services Online',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // setupIonicReact();
  const [access,setAccess] = useState<userData>(userDataDefault)
  const auth =getAuth(app)
  useEffect(()=>{
   onAuthStateChanged(auth,(user:any)=>{
    console.log(user)
    if(user){
    
      if(user.emailVerified===true){
      fetchData(user.email).then((data:any)=>{
        console.log(data.docs[0].id)
        setAccess({...data.docs[0].data(),log:true,id:data.docs[0].id})
        localStorage.setItem("user",data.docs[0].id)
        console.log(access)
      }).catch(error=>{
        console.log(error)
      })
      fetch(user.photoUrl).then((res:any)=>{
        localStorage.setItem("profilePicture",URL.createObjectURL(res))
      }).catch(err=>{
        localStorage.setItem("profilePicture","https://voideawn.sirv.com/website/person-circle.svg")
      })
    }
    }
   })
  },[])
  return (
    <html lang="en">
      <head>
      <meta name="google-adsense-account" content="ca-pub-7691895735151663"/>
      {/* <link rel='shortcut icon' href='https://voideawn.sirv.com/website/favicon.jpg'/> */}
      <title>Zimbabwe Services Online</title>
      </head>
      {/* <body className={inter.className} > */}
      <body>
      <Authorized.Provider value={{access,setAccess}}>
        <NavBar/>
        {children}
        <FloatingWhatsApp statusMessage='Typically replies in 2 minutes' phoneNumber='+263788984320' accountName='Zim Services Online' avatar="https://voideawn.sirv.com/website/home_three.jpg"/>
        <FooterBar/>
        </Authorized.Provider>
        </body>
    </html>
  )
}
