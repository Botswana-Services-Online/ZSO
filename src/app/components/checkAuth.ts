import { getAuth,onAuthStateChanged } from "firebase/auth";
import { app } from "../api/firebase";

const checkAuth=()=>{
    const auth = getAuth(app)
    onAuthStateChanged(auth,(user)=>{
        if(!user){
           location.replace("/User/Auth")
        }
    })
}

export default checkAuth