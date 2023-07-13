"use client"
import { bgImg, genBtn, mp, vp } from "@/app/components/cssStyles";
import Profile from "./profile";
import {useLayoutEffect,useState,useContext} from "react"
import checkAuth from "@/app/components/checkAuth";
import { Authorized } from "@/app/components/contexts";
export default function Dashboard(){
    const {access,setAccess} = useContext(Authorized)
    const [headerImg,setHeaderImg] = useState<string>("")

    useLayoutEffect(()=>{
        checkAuth()
        if(access.header.length>0){
            setHeaderImg(access.header);
        }else{
            setHeaderImg("https://voideawn.sirv.com/website/Untitled%20design.png")
        }
        
    },[])
    return(
        <div className={mp}>
            <div className="d-flex justify-content-center  align-items-center" style={{...bgImg(headerImg), height:"30vh"}}>
                <button className={genBtn}>Change Banner Image</button>
            </div>
            
                <Profile/>
            
        </div>
    )
}