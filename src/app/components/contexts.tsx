import { createContext } from "react";

import {  userDataDefault } from "./schemes";


export const Authorized = createContext<any>(userDataDefault);
