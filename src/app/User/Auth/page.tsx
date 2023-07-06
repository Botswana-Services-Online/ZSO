"use client"
import { mp, vp, bgImg } from "@/app/components/cssStyles";
import { useState } from "react";
import Signup from "./signup";

export default function Auth(){
    const [hide,setHide]=useState({
        hideLogin:true,
        hideSignup:false
    })
    return(
        <div className={mp} style={bgImg("https://voideawn.sirv.com/website/auth_one.jpg")}>
            <div className={vp}>
                <div>

               
                <div hidden={hide.hideSignup}>
                <Signup/>
                </div>
                <div hidden={hide.hideLogin}>

                </div>
                <br/>
                {hide.hideLogin===false?<p className="text-white text-center">Dont have an account <a className="text-decoration-underline ">Signup</a ></p>:<p className="text-white text-center fw-bold shadow">Already have an account? <a className="text-decoration-underline text-white">Login</a></p>}
                </div>
            </div>
        </div>
    )
}