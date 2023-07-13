import { getDocs,collection,query,where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../api/firebase";
import { db } from "../api/firebase";
import { userData } from "./schemes";

export const fetchData = (email:string)=>{
    const refUser = collection(db,"users")
    const q = query(refUser,where("email","==",`${email}`))
   return getDocs(q)
}


