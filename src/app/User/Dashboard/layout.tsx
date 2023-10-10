"use client"
import { alignIcon, bgImg,  mp } from "@/app/components/cssStyles";
import {useEffect,useState,useContext} from "react"
import checkAuth from "@/app/components/checkAuth";
import { Authorized } from "@/app/components/contexts";
import { getDownloadURL,ref,uploadBytes } from "firebase/storage";
import {v4 } from "uuid";
import { auth, db, storage } from "@/app/api/firebase";
import { updateUser } from "@/app/components/updateInfo";
import {  pencil } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { UserNavigation } from "./userNavigation";
import { doc, getDoc } from "firebase/firestore";


export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const {access,setAccess} = useContext(Authorized)
    const [headerImg,setHeaderImg] = useState<string>("https://firebasestorage.googleapis.com/v0/b/zimso-d10e9.appspot.com/o/plcaholder%2Fyoung-african-american-woman-shopping-with-colorful-packs-blue-background-attractive-female-model.jpg?alt=media&token=47f382c9-b859-4fe9-ba05-1bae7cb55c9d")
    

    useEffect(()=>{
        checkAuth()
        getDoc(doc(db,"users",`${auth.currentUser?.uid}`)).then(res=>{
            if(res.exists()){
                if(res.data().header.length>0){
                setHeaderImg(res.data().header)
                }
            }
        })
    },[])
    const changeHeader=(file:any)=>{
        console.log(file)
        const headerImage = ref(storage,`headers/${v4()}`)
        uploadBytes(headerImage,file).then(res=>{
            console.log(res)
            getDownloadURL(res.ref).then(url=>{
                console.log(url)
                const newData = {header:url}
                updateUser(newData).then(res=>{
                    console.log(res)
                    window.location.reload()
                }).catch(err=>{console.log(err)})
            }).catch(err=>{console.log(err)})
        }).catch(err=>{console.log(err)})
    }
    return(
        <div className={mp}>
           
            <div className="d-flex  align-items-end  justify-content-end placeholder-wave bg-success" style={{...bgImg(headerImg), height:"40vh"}}>
                <label htmlFor="fileUpload" className={`Bg rounded-pill shadow-lg pointer text-white m-2 p-2 ${alignIcon}`}>
                <input type="file" accept="image/png image/jpeg" id="fileUpload" style={{display:"none"}} onChange={(e:any)=>{changeHeader(e.target.files[0])}}/>
                <IonIcon  icon={pencil}/> &nbsp;Change Banner
                </label>
            </div>
            <div className="d-flex justify-content-between  container" >
                    <div className="position-relative  bg-success rounded-pill" style={{ bottom: "40px" }}>
                        {/* <IonIcon size="large" color="success" icon={businessOutline}/> */}
                    

                    </div>
                    <div className="mt-2">
                    {UserNavigation(access.id)}

                    </div>
            </div>
            
              {children}
            
        </div>
    )
}