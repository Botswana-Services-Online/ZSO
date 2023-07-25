import { getDocs,collection,query,where } from "firebase/firestore";
import { db } from "../api/firebase";


export const fetchData = (email:string)=>{
    const refUser = collection(db,"users")
    const q = query(refUser,where("email","==",`${email}`))
   return getDocs(q)
}


