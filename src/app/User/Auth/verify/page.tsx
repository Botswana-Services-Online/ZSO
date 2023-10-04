import { auth } from "@/app/api/firebase";
import { genBtn, mp, vp } from "@/app/components/cssStyles";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export default function Verify(){
    const [message,setMessage]  = useState({
        show:false,
        msg:"",
        variant:"success"
    })
    const router = useRouter()
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
            router.push("/User/Dashboard")
        }else{
            setMessage({...message,show:true,msg:"Please verify your email before continuing :(", variant:"danger"})
        } 
    }
    return(
        <div className={mp}>
            <div className={`${vp} bg-white p-5`}>
                <h1>
                    Check Your Inbox For The Verification Link We Sent You!
                </h1>
                <Alert show={message.show} variant={message.variant}>{message.msg}</Alert>
                <p>If you can&apos;t find us in your primary mail box check spam! or <b className="text-primary" onClick={()=>Verify()}>request one</b></p>
                <br />
                <button className={genBtn} onClick={()=>checkVerified()}>I verified My Email!</button>
            </div>
        </div>
    )
}