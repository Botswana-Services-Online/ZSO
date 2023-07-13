"use client"
import { bgImg, genBtn, mp, vp } from "@/app/components/cssStyles";
import { getAuth } from "firebase/auth";
import { app } from "@/app/api/firebase";
import Profile from "./profile";
import {useLayoutEffect,useState} from "react"
import checkAuth from "@/app/components/checkAuth";
import { getUserData,  } from "@/app/components/getData";
export default function Dashboard(){
    const [headerImg,setHeaderImg] = useState<string>("")

    useLayoutEffect(()=>{
        checkAuth()
        const imgH = getUserData()?.header;
        if(getUserData()?.header.length>0){
            setHeaderImg(imgH);
        }else{
            setHeaderImg("https://voideawn.sirv.com/website/Untitled%20design.png")
        }
        
    },[])
    return(
        <div className={mp}>
            <div className="d-flex justify-content-center  align-items-center" style={{...bgImg(headerImg), height:"30vh"}}>
                <button className={genBtn}>Change Banner Image</button>
            </div>
            <div>
                <h1>{getUserData()?.name}</h1>
            </div>
            <div className={vp}>

                <Profile/>
            </div>
        </div>
    )
}