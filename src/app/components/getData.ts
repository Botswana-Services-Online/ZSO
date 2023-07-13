import { getDocs,collection,query,where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../api/firebase";
import { db } from "../api/firebase";
import { userData } from "./schemes";

const user:any = localStorage.getItem('userData')
export const getUserData = ()=>{
   const data:userData = JSON.parse(user);   
   return data
}

