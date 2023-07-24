import { getAuth } from "firebase/auth";
import { app } from "../api/firebase";

export const logout=()=>{
    const user = getAuth(app)
    user.signOut().then(res=>{
        window.location.assign("/");
    }).catch(err=>{
        logout()
    })
}