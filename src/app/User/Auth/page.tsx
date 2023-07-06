"use client"
import { mp, vp } from "@/app/components/cssStyles";
import Signup from "./signup";

export default function Auth(){
    return(
        <div className={mp}>
            <div className={vp}>
                <Signup/>
            </div>
        </div>
    )
}