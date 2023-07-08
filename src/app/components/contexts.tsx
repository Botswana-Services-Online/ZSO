import { createContext } from "react";

export interface userAuth{
    access:boolean,
}
export const Authorized = createContext<any>(false);