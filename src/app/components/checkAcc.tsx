import { getAuth } from "firebase/auth";
import { app } from "../api/firebase";


export const checkAcc=()=>{
    const auth = getAuth(app)
    console.log(auth.currentUser)
    if(auth.currentUser){
        return auth.currentUser
    }else{
        return false
    }
}