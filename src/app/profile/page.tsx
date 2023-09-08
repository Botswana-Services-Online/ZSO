"use client"
import { doc, getDoc } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { db } from "../api/firebase"
import { userData } from "../components/schemes"
import { useEffect, useState } from "react"
import { mp } from "../components/cssStyles"
export default function Profile(){
    //store profile data 
    const [data,setData] = useState({} as userData)
    const name = useSearchParams().get("name")
    
    const getProfileData=()=>{
        //get data from firebase
        const docRef = doc(db,"users",`${name}`)
        getDoc(docRef).then((doc)=>{
            console.log(doc.data())
        }).catch((error)=>{
            console.log(error)
        })

    }

    useEffect(() => {
     getProfileData()
    }, [])
    
    return(
        <div className={mp}>
            <div>

            </div>
            <h1>Profile</h1>
        </div>
    )
}