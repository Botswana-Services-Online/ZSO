"use client"
import { mp, vp, bgImg } from "@/app/components/cssStyles";
import { useState,useEffect,useContext } from "react";
import Signup from "./signup";
import Login from "./login";
import { Authorized } from "@/app/components/contexts";
import { useRouter } from "next/navigation";
import { auth, db } from "@/app/api/firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";




export default function Auth() {
    const nav = useRouter()
    const {access,setAcess} = useContext(Authorized)
    const [hide, setHide] = useState({
        hideLogin: true,
        hideSignup: false,
    })

    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                getDoc(doc(db,"users",`${user.uid}`)).then(res=>{
                    if(res.exists()){
                        nav.push("/User/Dashboard")
                    }
                })
            }
        })
        const result = localStorage.getItem("log");
        if(result==="0"){
            setHide({ ...hide, hideLogin: true, hideSignup: false })
        }else{
          
            setHide({ ...hide, hideLogin: false, hideSignup: true })
        }
    },[])

    const switchAuth = () => {
        if (hide.hideLogin === true) {
            setHide({ ...hide, hideLogin: false, hideSignup: true })
        } else {
            setHide({ ...hide, hideLogin: true, hideSignup: false })
        }
    }
    return (
        <div className={mp} style={bgImg("https://voideawn.sirv.com/website/auth_one.jpg")}>
            <div className={vp}>
                <div>


                    <div hidden={hide.hideSignup}>
                        <Signup />
                    </div>
                    <div hidden={hide.hideLogin}>
                        <Login />
                    </div>

                    <br />
                    {hide.hideLogin === false ? <p className="text-white text-center fw-bold shadow">Dont have an account <a className="text-decoration-underline text-white pointer" onClick={() => switchAuth()}>Sign Up</a ></p> : <p className="text-white text-center fw-bold shadow">Already have an account? <a className="text-decoration-underline text-white pointer" onClick={() => switchAuth()}>Sign In</a></p>}
                </div>
            </div>
        </div>
    )
}