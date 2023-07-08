import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../api/firebase";

export interface userAuth{
    access:boolean,
}
export const Authorized = createContext<any>(getAuth(app).currentUser?true:false);