"use client"
import { auth } from "@/app/api/firebase";
import { genBtn, mp } from "@/app/components/cssStyles";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";

export default function Verify(){
    const router = useRouter()
    const [message,setMessage]  = useState({
        show:false,
        msg:"",
        variant:"success"
    })
    
    const VerifyEmail=()=>{
        if (auth.currentUser) {
            sendEmailVerification(auth.currentUser).then(res => {
              setMessage({...message,show:true,msg:"Success! Please check your inbox", variant:"success"})
            }).catch(err => {
                setMessage({...message,show:true,msg:"We ran into a problem, please try again later!", variant:"danger"})
            })
        } else {
           router.push("/User/Auth")
        }
    }

    const checkVerified=()=>{
        auth.currentUser?.reload();
        
        if (auth.currentUser?.emailVerified) {
            router.push("/User/Auth/onboarding")
        }else{
            setMessage({...message,show:true,msg:"Please verify your email before continuing", variant:"primary"})
        } 
    }

    useEffect(() => {
      auth.currentUser?.emailVerified ? router.push("/User/Auth/onboarding") : null
    }, [])
    
    return(
        <div className={mp}>
            <div className={`page text-center  bg-white p-5`}>
                <h1 className="mb-3">
                    Check Your Inbox For The Verification Link We Sent You!
                </h1>
                <Alert show={message.show} variant={message.variant}>{message.msg}</Alert>
                <p className="mb-3">If you can&apos;t find us in your primary mail box check spam! or <b className="text-primary pointer" onClick={()=>VerifyEmail()}>request one</b></p>
              
                <button className={genBtn} onClick={()=>{checkVerified()}}>I verified My Email!</button>
                <p className="mt-3"><small>Please wait for 5 seconds before retrying</small></p>
            </div>
        </div>
    )
}