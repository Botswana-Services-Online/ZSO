import { doc,updateDoc} from "firebase/firestore"
import { userData } from "./schemes"
import { db } from "../api/firebase"
import { auth } from "../api/firebase"

export const  updateUser=(data:any)=>{
    const  user = doc(db,"users",`${auth.currentUser?.uid}`)

    return updateDoc(user,{...data})
}