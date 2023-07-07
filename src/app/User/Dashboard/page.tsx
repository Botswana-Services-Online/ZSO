"use client"
import { mp, vp } from "@/app/components/cssStyles";
import { getAuth } from "firebase/auth";
import { app } from "@/app/api/firebase";
export default function Dashboard(){
    console.log("z")
    console.log(getAuth(app).currentUser)
    return(
        <div className={mp}>
            <div className={vp}></div>
        </div>
    )
}