"use client"
import { filterOutline, searchOutline } from "ionicons/icons";
import { alignIcon, genBtn, genFrm, mp, vp } from "../components/cssStyles";
import { IonIcon } from "@ionic/react";

export default function Listings(){
    return(
        <div className={mp}>
            <div className=" d-flex justify-content-center p-3 position-fixed w-100  text-center bg-light ">
                <div className="input-group">
                    <input className="form-control rounded-pill me-1" placeholder="What are you looking for"/>
                    <button className={`${alignIcon} btn Bg text-white rounded-pill me-1`}><IonIcon icon={filterOutline}/></button>
                    <button className={`${alignIcon} btn Bg text-white rounded-pill`}><IonIcon icon={searchOutline}/></button>
                </div>
                
               
            </div>
            <div className={vp}>

            </div>
        </div>
    )
}