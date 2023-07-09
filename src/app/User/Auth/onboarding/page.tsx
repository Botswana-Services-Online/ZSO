"use client"
import { genBtn, genFrm, mp, vp } from "@/app/components/cssStyles";
import { Blob } from "buffer";
import { useState } from "react";
import { ProgressBar } from "react-bootstrap";
import { IonBadge } from "@ionic/react";
export default function Register(){

    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [doc,setDoc] = useState<any>()
    const [address,setAddress] = useState("")
    const [employees,setNumEmployees] = useState<any>(0)
    const [industry,setIndustry] = useState<Array<string>>([])
    const [tax,setTax] = useState<any>()
    const [hide,setHide] = useState({
        hideOne:false,
        hideTwo:true,
        hideThree:true
    })
    const [progress,SetProgress] = useState<number>(0)
    
    const updateProgress=()=>{
        if(hide.hideOne){
            setHide({...hide,hideOne:true,hideTwo:false,hideThree:true})
            SetProgress(66.66)
        }else if(hide.hideTwo){
            setHide({...hide,hideOne:true,hideTwo:true,hideThree:false})
            SetProgress(66.66)
        }else{
            setHide({...hide,hideOne:true,hideTwo:false,hideThree:true})
            SetProgress(100)
        }
    }
    

    return(
        <div className={mp}>
            
           
            <div className={vp}>
                <div className="row" hidden={hide.hideOne}>
                <div className="">
            <h1 className="text-center ">Onboarding</h1>
            </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Company Name*" onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Phone Number*" onChange={(e)=>setPhone(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Address*" onChange={(e)=>setAddress(e.target.value)} required/>
                    </div>
                    <button className={genBtn} onClick={()=>updateProgress()}>Next</button>
                </div>
                <div className="row" hidden={hide.hideTwo}>
                    <div className="col-sm">
                        <input type="number" className={genFrm} placeholder="Number of Employees*" onChange={(e)=>setNumEmployees(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <input type="file" className={genFrm} placeholder="Company Registration Document CR5*" onChange={(e:any)=>setDoc(e.target.files[0])} required/>
                    </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Tax Clearence Certificate*" onChange={(e:any)=>setDoc(e.target.files[0])} required/>
                    </div>
                    <button className={genBtn} onClick={()=>updateProgress()}>Next</button>
                </div>
                <div className="row" hidden={hide.hideThree}>
                    <div className="col-sm">
                        <p>Choose up to five items</p>
                        <input type="text" placeholder="Category*" />
                        <button className={genBtn} onClick={()=>updateProgress()}>Next</button>
                    </div>
                </div>
                <ProgressBar defaultValue={20} className="Bg"  now={progress}/>
            </div>
        </div>
    )
}