"use client"
import { genBtn, genFrm, mp, vp } from "@/app/components/cssStyles";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { industries } from "@/app/components/categories";
import { search } from "ss-search";

import { addDoc, collection} from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { app, db, } from "@/app/api/firebase";
import moment from "moment";
import { Alert, Spinner } from "react-bootstrap";
import { userData, userDataDefault } from "@/app/components/schemes";
export default function Register() {
    const route = useRouter()


    const [warning, setWarning] = useState<boolean>(false)
    const [hide, setHide] = useState({
        hideIndustrySearch: true
    })
    const [loading,setLoading] = useState<boolean>(false)


    const [formData, setFormData] = useState<any>({
        monday: { openingHours: '', closingHours: '' },
        tuesday: { openingHours: '', closingHours: '' },
        wednesday: { openingHours: '', closingHours: '' },
        thursday: { openingHours: '', closingHours: '' },
        friday: { openingHours: '', closingHours: '' },
        saturday: { openingHours: '', closingHours: '' },
        sunday: { openingHours: '', closingHours: '' },
    });
    const [userData, setUserData] = useState<userData>(userDataDefault)

    const [industryData, setIndustryData] = useState<any>([])




    const handleChange = (day: any, timeType: any, value: any) => {
        setFormData({ ...formData, [day]: { ...formData[day], [timeType]: value } });
    };



    const searchIndustry = (value: string) => {
        if (value.length > 1) {
            const data = search(industries, ["name"], value)
            if (data.length > 0) {
                setHide({...hide,hideIndustrySearch:false})
                setIndustryData(data)
            } else {
                setHide({...hide,hideIndustrySearch:true})
            }
        }

    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const owner = getAuth(app).currentUser?.email
        const createdAt = moment().toLocaleString()
        const data = {
            ...userData,email:owner,hours:formData,createdAt
        }


        addDoc(collection(db, "users"), data).then(res => {
            route.push("/User/Dashboard/")
        }).catch(err => {
            setLoading(false)
            setWarning(true)
            setLoading(true)
        })
    }




    return (
        <div className={mp}>

            <div className={vp}>


                <div className="container d-flex flex-column  justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="text-center mb-3 mt-5">
                        <h1 >Onboarding</h1>
                        <p>Please fill in the necessary details to complete account registration!</p>
                        <Alert show={warning}>Failed To save your information, please try again!</Alert>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="row " >

                            <div className="col-sm mb-3">
                                <p>Company  / Personal Name</p>
                                <input type="text" className={genFrm}  value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Mobile Phone</p>
                                <input type="text" className={genFrm} placeholder="Include country code +263..."  value={userData.mobilePhone} onChange={(e) => setUserData({ ...userData, mobilePhone: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Telephone</p>
                                <input type="text" className={genFrm} placeholder="Include country code +263..." value={userData.telephone} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })} required />
                            </div>

                        </div>




                        <div className="row" >
                            <div className="col-sm mb-3">
                                <p>Website</p>
                                <input type="text" className={genFrm} placeholder="https://site.com" value={userData.website} onChange={(e) => setUserData({ ...userData, website: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Industry</p>
                                <input type="text" value={userData.industry} className={genFrm} placeholder="Industry*" onChange={(e) => { setUserData({...userData,industry:e.target.value}),searchIndustry(e.target.value) }} required/>
                                <div className="shadow-lg  rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideIndustrySearch}>
                                    {
                                        industryData?.map((item: any, index: number) => {

                                            return (
                                                <p className="m-2 pointer" key={index} onClick={() => {setUserData({ ...userData, industry: item.name });setHide({...hide,hideIndustrySearch:true})}}>{item.name}</p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="col-sm mb-3">
                                <p>Register As A</p>
                                <select className={genFrm} value={userData.registerAs} onChange={(e) => setUserData({ ...userData, registerAs: e.target.value })} required>
                                    <option value="Company">Company</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>
                        </div>
                        <div className="row " >

                            <div className="col-sm mb-3">
                                <p>LinkedIn</p>
                                <input type="text" className={genFrm}  value={userData.linkedin} onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Twitter</p>
                                <input type="text" className={genFrm}  value={userData.twitter} onChange={(e) => setUserData({ ...userData, twitter: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Facebook</p>
                                <input type="text" className={genFrm}  value={userData.facebook} onChange={(e) => setUserData({ ...userData, facebook: e.target.value })} required />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Will you be open during holidays</p>
                            <select className="form-control "  required value={userData.holiday} onChange={(e:any)=>setUserData({...userData,holiday:e.target.value})}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            </div>
                           
                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Address</p>
                                <textarea className="form-control" placeholder="Address*" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} required ></textarea>
                            </div>
                        </div>
                       
                        <div>
                            <h4>Working Hours</h4>
                            <p>
                                Once set your working hours cannot be changed!
                            </p>
                        </div>
                        {Object.keys(formData).map((day) => (
                            <div key={day} className=" row">
                                <p className="fw-bold">{day.charAt(0).toUpperCase() + day.slice(1)}</p>
                                <label>
                                    Opening Hours:
                                    <input
                                        type="time"
                                        value={formData[day].openingHours}
                                        className="form-control mb-3"
                                        onChange={(e) => handleChange(day, 'openingHours', e.target.value)}
                                        required
                                    />
                                </label>
                                <label>
                                    Closing Hours:
                                    <input
                                        type="time"
                                        value={formData[day].closingHours}
                                        className="form-control mb-3"
                                        onChange={(e) => handleChange(day, 'closingHours', e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                        ))}

                        <div className="mb-5">
                            <button className={genBtn}>{loading ? <Spinner animation="grow" variant="light" /> : "Let's Go"}</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}