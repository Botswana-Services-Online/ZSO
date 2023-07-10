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

    const removeProgress=()=>{

    }
    

    return(
        <div className={mp}>
            
           
            <div className="container d-flex flex-column  justify-content-center align-items-center" style={{minHeight:"80vh"}}>
            <div className="text-center mb-3">
            <h1 >Onboarding</h1>
            <p>Please fill in the necessary details to complete account registration!</p>
            </div>
                <div className="row container" hidden={hide.hideOne}>
               
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Company Name*" onChange={(e)=>setName(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Phone Number*" onChange={(e)=>setPhone(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <input type="text" className={genFrm} placeholder="Address*" onChange={(e)=>setAddress(e.target.value)} required/>
                    </div>
                   
                </div>
                <div className="row" hidden={hide.hideTwo}>
                    <div className="col-sm">
                        <input type="number" className={genFrm} placeholder="Number of Employees*" onChange={(e)=>setNumEmployees(e.target.value)} required/>
                    </div>
                    <div className="col-sm">
                        <span className="input-group-text">CR5 Document</span>
                        <input type="file"  accept="application/pdf" className="form-control" placeholder="Company Registration Document CR5*" onChange={(e:any)=>setDoc(e.target.files[0])} required/>
                    </div>
                    <div className="col-sm input-group">
                        <span className="input-group-text">Tax Clearence</span>
                        <input type="file" accept="application/pdf" className="form-control" placeholder="Tax Clearence Certificate*" onChange={(e:any)=>setDoc(e.target.files[0])} required/>
                    </div>
                   
                </div>
                <div className="row" hidden={hide.hideThree}>
                    <div className="col-sm">
                        <p>Choose up to five items</p>
                        <input type="text" placeholder="Category*" />
                       
                    </div>
                </div>
                <div className=" d-flex justify-content-between w-75  mb-3">
                    <button className="btn Bg rounded-pill text-white">Back</button>
                    
                    <button className="btn Bg rounded-pill text-white">Next</button>
                </div>
                <progress className="Bg w-50 rounded-pill mt-5" value={progress} max={100}></progress>
            </div>
        </div>
    )
}