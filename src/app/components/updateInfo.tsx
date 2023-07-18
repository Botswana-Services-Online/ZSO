import {doc,updateDoc} from "firebase/firestore"
import { userData } from "./schemes"
import { db } from "../api/firebase"

export const  updateUser=async(data:userData)=>{
    const  user = doc(db,"users",data.id)
    return await updateDoc(user,{...data})
}