import { doc,updateDoc} from "firebase/firestore"
import { userData } from "./schemes"
import { db } from "../api/firebase"
import { auth } from "../api/firebase"

export const  updateUser=(data:userData)=>{

    const  user = doc(db,"users",`${data.id}`)
    return updateDoc(user,{data})
}