import { getAuth } from "firebase/auth";
import { app, db } from "../api/firebase";
import { query,where,getDocs,collection } from "firebase/firestore";


export const checkAcc=()=>{
    const auth = getAuth(app)
    if(auth.currentUser){
        return auth.currentUser.email
    }else{
        return false
    }
}

export const checkBoarded=()=>{
    const user = checkAcc()
    if(user!==false){
        const dbRef = collection(db,"users");
        const q = query(dbRef,where("email","==",user))
        getDocs(q).then(res=>{
            if(res.docs.length>0){
                const data = res.docs[0].data().registered
                if(data===true){
                    window.location.assign("/User/Dashboard")
                }else{
                    window.location.assign("/User/Auth/onboarding")
                }
            }else{
                 window.location.assign("/User/Auth/onboarding")
            }
        })
    }
}