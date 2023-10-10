import { sendEmailVerification } from "firebase/auth";
import { auth, db } from "../api/firebase";
import {  getDoc, doc } from "firebase/firestore";



export const checkAcc=()=>{

    if(auth.currentUser){
        return auth.currentUser
    }else{
        return false
    }
}


export const checkBoarded=()=>{
    const user = checkAcc()
    
    if(user!==false && user.emailVerified===true){
        getDoc(doc(db,"users",user.uid)).then(res=>{
            if(!res.exists()){
                window.location.assign("/User/Auth/onboarding")
            }
        }).catch(err=>{
            console.log(err)
        })
    }else if(user!==false && user.emailVerified===false){
        sendEmailVerification(user).then(res=>{
            window.location.assign("/User/Auth/verify")
        })
    }else if(user==false){
        window.location.assign("/")
    }
}