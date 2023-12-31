"use client"
import { genBtn, genFrm, mp, vp } from "@/app/components/cssStyles";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { cities, industries } from "@/app/components/categories";
import { search } from "ss-search";
import { addDoc, collection, doc, setDoc} from "firebase/firestore"
import {  auth, db, } from "@/app/api/firebase";
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
        const owner = auth.currentUser?.email
        const createdAt = moment().toLocaleString()
        const data = {
            ...userData,email:owner,hours:formData,log:true,createdAt
        }


        setDoc(doc(db, "users",`${auth.currentUser?.uid}`), data).then(res => {
            route.push("/User/Dashboard")
        }).catch(err => {
            setLoading(false)
            setWarning(true)
        })
    }




    return (
        <div className={mp}>

            <div className={vp}>


                <div className="container d-flex flex-column  justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="text-center mb-3 mt-5">
                        <h1 >Onboarding</h1>
                        <p>Please fill in the necessary details to complete account registration! Fields marked with <b className="text-danger">*</b> are required</p>
                        <Alert show={warning}>Failed To save your information, please try again!</Alert>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} >
                        <div className="row " >

                            <div className="col-sm mb-3">
                                <p>Company  / Personal Name <b className="text-danger">*</b></p>
                                <input type="text" className="form-control"  value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Mobile Phone <b className="text-danger">*</b></p>
                                <input type="text" className="form-control" placeholder="Include country code +263..."  value={userData.mobilePhone} onChange={(e) => setUserData({ ...userData, mobilePhone: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Telephone</p>
                                <input type="text" className="form-control" placeholder="Include country code +263..." value={userData.telephone} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })}  />
                            </div>

                        </div>




                        <div className="row" >
                            <div className="col-sm mb-3">
                                <p>Website</p>
                                <input type="text" className="form-control" placeholder="https://site.com" value={userData.website} onChange={(e) => setUserData({ ...userData, website: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Industry <b className="text-danger">*</b></p>
                                <input type="text" value={userData.industry} className="form-control" placeholder="Industry*" onChange={(e) => { setUserData({...userData,industry:e.target.value}),searchIndustry(e.target.value) }} required/>
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
                                <p>Register As A <b className="text-danger">*</b> </p>
                                <select className="form-control" value={userData.registerAs} onChange={(e) => setUserData({ ...userData, registerAs: e.target.value })} required>
                                    <option value="Company">Company</option>
                                    <option value="Individual">Individual</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <p className="fw-bold">Socials</p>
                            <p>Please enter your usernames only, no links allowed</p>
                        </div>
                        <div className="row " >

                            <div className="col-sm mb-3">
                                <p>LinkedIn</p>
                                <input type="text" className="form-control" placeholder="Username"  value={userData.linkedin} onChange={(e) => setUserData({ ...userData, linkedin: e.target.value })}  />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Twitter</p>
                                <input type="text" className="form-control" placeholder="Username "  value={userData.twitter} onChange={(e) => setUserData({ ...userData, twitter: e.target.value })}  />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Facebook</p>
                                <input type="text" className="form-control" placeholder="Username" value={userData.facebook} onChange={(e) => setUserData({ ...userData, facebook: e.target.value })}  />
                            </div>

                        </div>
                      
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Will you be open during holidays <b className="text-danger">*</b></p>
                            <select className="form-control "  required value={userData.holiday} onChange={(e:any)=>setUserData({...userData,holiday:e.target.value})}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            </div>
                           
                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Service Location <b className="text-danger">*</b></p>
                                <select className="form-control" value={userData.serviceLocation} onChange={(e)=>setUserData({...userData,serviceLocation:e.target.value})}>
                                    {
                                        cities.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.name}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Address <b className="text-danger">*</b></p>
                                <textarea className="form-control" placeholder="Address*" value={userData.address} onChange={(e) => setUserData({ ...userData, address: e.target.value })} required ></textarea>
                            </div>
                        </div>
                       
                        <div>
                            <h4>Working Hours</h4>
                            <p>If you are not open on a particular day just leave blank, note if you leave all fields blank your shop will be marked as closed</p>
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
                                        
                                    />
                                </label>
                                <label>
                                    Closing Hours:
                                    <input
                                        type="time"
                                        value={formData[day].closingHours}
                                        className="form-control mb-3"
                                        onChange={(e) => handleChange(day, 'closingHours', e.target.value)}
                                        
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