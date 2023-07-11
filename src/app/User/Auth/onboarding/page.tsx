"use client"
import { genBtn, genFrm, mp, vp } from "@/app/components/cssStyles";
import { Blob } from "buffer";
import { useState } from "react";
import { Alert, ProgressBar } from "react-bootstrap";
import { IonBadge } from "@ionic/react";
export default function Register() {

    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [doc, setDoc] = useState<any>()
    const [address, setAddress] = useState("")
    const [employees, setNumEmployees] = useState<any>(0)
    const [industry, setIndustry] = useState<Array<string>>([])
    const [tax, setTax] = useState<any>()
    const [hide, setHide] = useState({
        hideOne: false,
        hideTwo: true,
        hideThree: true
    })
    const [warn, setWarning] = useState<boolean>(false)
    const [progress, SetProgress] = useState<number>(33)
    const [btnState,setBtnState] = useState<any>("Next")


    const submitFirst = (e:FormDataEvent) => {
        e.preventDefault()
        SetProgress(66)
        setHide({ ...hide, hideOne: true, hideTwo: false, hideThree: true })
    }
    const submitSecond = (e:FormDataEvent) => {
        e.preventDefault()
        SetProgress(100)
        setHide({ ...hide, hideOne: true, hideTwo: true, hideThree: false })
    }
    const submitThird = (e:FormDataEvent) => {
        e.preventDefault()
       
    }
  

    const goBack = () => {
        if(hide.hideTwo===false){
            setHide({ ...hide, hideOne: false, hideTwo: true, hideThree: true })
        }else{
            setHide({ ...hide, hideOne: true, hideTwo: false, hideThree: true })
        }
    }


    return (
        <div className={mp}>


            <div className="container d-flex flex-column  justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="text-center mb-3">
                    <h1 >Onboarding</h1>
                    <p>Please fill in the necessary details to complete account registration!</p>
                </div>
                {/* <Alert show={warn} variant="danger">
                    Please fill in all information to complete account registration!
                </Alert> */}
                <form onSubmit={(e:any)=>submitFirst(e)} hidden={hide.hideOne}>
                    <div className="row container" >

                        <div className="col-sm">
                            <input type="text" className={genFrm} placeholder="Company Name*" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="col-sm">
                            <input type="text" className={genFrm} placeholder="Phone Number*" onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="col-sm">
                            <input type="text" className={genFrm} placeholder="Address*" onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                    </div>
                    <div className=" text-center d-flex justify-content-evenly w-100  m-3">
                        {/* <button className="btn Bg rounded-pill text-white">Back</button> */}

                        <button type="submit" className="btn Bg rounded-pill text-white">Next</button>
                    </div>
                </form>

                <form onSubmit={(e:any)=>submitSecond(e)}  hidden={hide.hideTwo}>
                <div className="row">
                    
                    <div className="col-sm">
                        <span >CR5 Document</span>
                        <input type="file" accept="application/pdf" className="form-control shadow-lg mb-3 rounded-pill" placeholder="Company Registration Document CR5*" onChange={(e: any) => setDoc(e.target.files[0])} required />
                    </div>
                    <div className="col-sm ">
                        <span className="">Tax Clearence</span>
                        <input type="file" accept="application/pdf" className="form-control shadow-lg mb-3 rounded-pill" placeholder="Tax Clearence Certificate*" onChange={(e: any) => setDoc(e.target.files[0])} required />
                    </div>

                </div>
                <div className=" text-center d-flex justify-content-evenly w-100  m-3">
                        <button type="button" value="cancel" className="btn Bg rounded-pill text-white" onClick={()=>goBack()}>Back</button>

                        <button type="submit" className="btn Bg rounded-pill text-white">Next</button>
                    </div>
                </form>
                <form onSubmit={(e:any)=>submitThird(e)} hidden={hide.hideThree}>
                <div className="row" >
                <div className="col-sm">
                        <input type="number" className={genFrm} placeholder="Number of Employees*" onChange={(e) => setNumEmployees(e.target.value)} required />
                    </div>
                    <div className="col-sm">
                       
                        <input type="text" className={genFrm} placeholder="Industry*" />

                    </div>
                </div>
                <div className=" text-center d-flex justify-content-evenly w-100  m-3">
                        <button type="button"  className="btn Bg rounded-pill text-white" onClick={()=>goBack()}>Back</button>

                        <button type="submit" className="btn Bg rounded-pill text-white">{btnState}</button>
                    </div>
                </form>
               
                <progress className="Bg w-50 rounded-pill mt-5 text-white" value={progress} max={100}></progress>
            </div>
        </div>
    )
}