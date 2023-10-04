import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/firebase";

const checkAuth=()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
           location.replace("/User/Auth")
        }
    })
}

export default checkAuth