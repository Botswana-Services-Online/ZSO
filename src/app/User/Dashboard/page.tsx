"use client"
import { alignIcon, bgImg, genBtn, mp, vp } from "@/app/components/cssStyles";
import Profile from "./profile";
import {useEffect,useState,useContext} from "react"
import checkAuth from "@/app/components/checkAuth";
import { Authorized } from "@/app/components/contexts";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import {v4 } from "uuid";
import { storage } from "@/app/api/firebase";
import { updateUser } from "@/app/components/updateInfo";
import { pencil } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Dashboard(){
   
    const {access,setAccess} = useContext(Authorized)
    const [headerImg,setHeaderImg] = useState<string>("")
    

    useEffect(()=>{
        checkAuth()
       
        
    },[headerImg])
    const changeHeader=(file:any)=>{
        console.log(file)
        const headerImage = ref(storage,`headers/${v4()}`)
        uploadBytes(headerImage,file).then(res=>{
            console.log(res)
            getDownloadURL(res.ref).then(url=>{
                console.log(url)
                const newData = {...access,header:url}
                updateUser(newData).then(res=>{
                    console.log(res)
                    window.location.reload()
                }).catch(err=>{console.log(err)})
            }).catch(err=>{console.log(err)})
        }).catch(err=>{console.log(err)})
    }
    return(
        <div className={mp}>
           
            <div className="d-flex  align-items-end  justify-content-end " style={{...bgImg(access.header), height:"40vh",backgroundColor:"grey"}}>
                <label aria-for="fileUpload" className={`Bg rounded-pill shadow-lg pointer text-white m-2 p-2 ${alignIcon}`}>
                <input type="file" accept="image/png image/jpeg" id="fileUpload" style={{display:"none"}} onChange={(e:any)=>{changeHeader(e.target.files[0])}}/>
                <IonIcon  icon={pencil}/>
                </label>
            </div>
            
                <Profile/>
            
        </div>
    )
}