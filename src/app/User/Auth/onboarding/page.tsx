"use client"
import { genFrm, mp } from "@/app/components/cssStyles";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { industries } from "@/app/components/categories";
import { loading } from "@/app/components/cssStyles";
import { search } from "ss-search";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { app, db, storage } from "@/app/api/firebase";
import { v4 } from "uuid"
import moment from "moment";
import { Alert } from "react-bootstrap";
export default function Register() {
    const route = useRouter()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [doc, setDoc] = useState<any>()
    const [address, setAddress] = useState("")
    const [employees, setNumEmployees] = useState<any>(0)
    const [industry, setIndustry] = useState<string>("")
    const [tax, setTax] = useState<any>()
    const [hide, setHide] = useState({
        hideOne: false,
        hideTwo: true,
        hideThree: true
    })

    const [progress, SetProgress] = useState<number>(33)
    const [btnState, setBtnState] = useState<any>("Next")
    const [industryData, setIndustryData] = useState<Array<any>>()
    const [hideIndustry, setHideIndustry] = useState<boolean>(true)
    const [industryPlace, setIndustryPlace] = useState<string>("")

    const [docR, setDocR] = useState<string>("")
    const [taxR, setTaxR] = useState<string>("")
    const [warning, setWarning] = useState<boolean>(false)

    const submitFirst = (e: FormDataEvent) => {
        e.preventDefault()
        SetProgress(66)
        setHide({ ...hide, hideOne: true, hideTwo: false, hideThree: true })
    }
    const submitSecond = (e: FormDataEvent) => {
        e.preventDefault()
        SetProgress(100)
        setHide({ ...hide, hideOne: true, hideTwo: true, hideThree: false })
    }
    const submitThird = (e: FormDataEvent) => {
        e.preventDefault()
        setBtnState(loading)
        const DocRef = ref(storage, `doc/${v4()}`)
        const TaxRef = ref(storage, `tax/${v4()}`)
        console.log(DocRef)
        console.log(TaxRef)
        uploadBytes(DocRef, doc).then((res) => {
            getDownloadURL(res.ref).then(urlf => {
                console.log(urlf)
                setDocR(urlf)
                uploadBytes(TaxRef, doc).then((r) => {
                    getDownloadURL(r.ref).then(urls => {
                        console.log(urls)
                        setTaxR(urls)
                        submitAll(urlf, urls)
                    }).catch((err) => {
                        console.log(err)
                        setBtnState("Next")
                    })
                }).catch(err => {
                    console.log(err)
                    setBtnState("Next")
                })
            }).catch((err) => {
                console.log(err)
                setBtnState("Next")
            })
        }).catch(err => {
            console.log(err)
            setBtnState("Next")
        })




    }


    const goBack = () => {
        if (hide.hideTwo === false) {
            setHide({ ...hide, hideOne: false, hideTwo: true, hideThree: true })
        } else {
            setHide({ ...hide, hideOne: true, hideTwo: false, hideThree: true })
        }
    }

    const searchIndustry = (value: string) => {
        if (value.length > 0) {
            const data = search(industries, ["name"], value)

            setIndustryData(data)
            setHideIndustry(false)
        } else {
            setHideIndustry(true)
        }
    }

    const submitAll = (urlf: string, urls: string) => {
        const owner = getAuth(app).currentUser?.email
        const createdAt = moment().toLocaleString()
        const data = {
            Cert: urlf,
            Tax: urls,
            name,
            address,
            phone,
            numEmployees: employees,
            email: owner,
            createdAt: createdAt,
            industry
        }

        addDoc(collection(db, "users"), data).then(res => {
            route.push("/User/Dashboard/")
        }).catch(err => {
            console.log(err.message)
            setBtnState("Next")
            setWarning(true)
        })
    }

    const selectIndustry = (item: string) => {
        setIndustry(item)
        setIndustryPlace(item)
        setHideIndustry(true)
    }


    return (
        <div className={mp}>


            <div className="container d-flex flex-column  justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div className="text-center mb-3">
                    <h1 >Onboarding</h1>
                    <p>Please fill in the necessary details to complete account registration!</p>
                    <Alert show={warning}>Failed To save your information, please try again!</Alert>
                </div>
                <form onSubmit={(e: any) => submitFirst(e)} hidden={hide.hideOne}>
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
                        <button type="submit" className="btn Bg rounded-pill text-white">Next</button>
                    </div>
                </form>

                <form onSubmit={(e: any) => submitSecond(e)} hidden={hide.hideTwo}>
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
                        <button type="button" value="cancel" className="btn Bg rounded-pill text-white" onClick={() => goBack()}>Back</button>

                        <button type="submit" className="btn Bg rounded-pill text-white">Next</button>
                    </div>
                </form>
                <form onSubmit={(e: any) => submitThird(e)} hidden={hide.hideThree}>
                    <div className="row" >
                        <div className="col-sm">
                            <input type="number" className={genFrm} placeholder="Number of Employees*" onChange={(e) => setNumEmployees(e.target.value)} required />
                        </div>
                        <div className="col-sm ">

                            <input type="text" value={industryPlace} className={genFrm} placeholder="Industry*" onChange={(e) => { setIndustryPlace(e.target.value); searchIndustry(e.target.value) }} />
                            <div className="shadow-lg  rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hideIndustry}>
                                {
                                    industryData?.map((item: any, index: number) => {

                                        return (
                                            <p className="m-2 pointer" key={index} onClick={() => selectIndustry(item.name)}>{item.name}</p>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" text-center d-flex justify-content-evenly w-100  m-3">
                        <button type="button" className="btn Bg rounded-pill text-white" onClick={() => goBack()}>Back</button>

                        <button type="submit" className="btn Bg rounded-pill text-white">{btnState}</button>
                    </div>
                </form>

                <progress className="Bg w-50 rounded-pill mt-5 text-white" value={progress} max={100}></progress>
            </div>
        </div>
    )
}