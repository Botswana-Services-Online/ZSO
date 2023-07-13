"use client"
import { bgImg, genFrm, nomBtn, vp } from "@/app/components/cssStyles"
import { collection, getDocs, limit, query, where } from "firebase/firestore"
import { app, db } from "@/app/api/firebase"
import { getAuth } from "firebase/auth"
import { userData } from "@/app/components/schemes"
import { useState, useLayoutEffect, useContext } from "react"
import ViewDocs from "@/app/components/viewDocs"
import { Authorized } from "@/app/components/contexts"


const Profile = () => {
    const {access,setAccess} = useContext(Authorized)
    const [data, setData] = useState<userData>({
        name: "",
        address: "",
        phone: "",
        email: "",
        Tax: "",
        Cert: "",
        numEmployees: 0,
        description: "",
        images:[],
        listings:[],
        header:""
    })

    const getUserData = () => {
        const userEmail: any = getAuth(app).currentUser?.email
        const userRef = collection(db, "users")
        const q = query(userRef, where("email", "==", `${userEmail}`), limit(1))
        getDocs(q).then((res: any) => {
            setData(res.docs[0].data())
            console.log(res.docs[0].data())
        }).catch((err => {

        }))
    }

    useLayoutEffect(() => {
        getUserData()
    }, [data])
    return (
        <div className="container">
            
                    <div className="d-flex ">
                        <img src={""} alt="Profile pic"/>
                    </div>
           
            <div className="mb-3">
                <h1>{access.name}</h1>
            </div>
            <div className="mb-5 shadow-lg rounded p-2">
                <h3>Listings</h3>
                <div>
                    {/* map listings */}
                </div>
            </div>
            <div >
                <div className="mb-5 shadow-lg rounded p-2">

                    <h3>
                        Description
                    </h3>
                    <div className="container">
                        <div className="mb-3 mb-3">
                            <textarea className="form-control" value={data.description}>

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <button className={nomBtn}>Save</button>
                        </div>

                    </div>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>General Details</h3>
                    <form>


                        <div className="row">
                            <div className="col-sm mb-3  ">
                                <p className="m-2">Email</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg"  value={data.email} />
                            </div>
                            <div className="col-sm mb-3 ">
                                <p className="m-2">Phone Number</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={data.phone} />
                            </div>
                            <div className="col-sm mb-3">
                            <p className="m-2 ">Number of Employees</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={data.numEmployees} />
                            </div>
                            

                        </div>
                        <div className="row">
                        <div className="col-sm mb-3">
                                <p className="m-2">Address</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={data.address} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className={nomBtn}>Save</button>
                        </div>
                    </form>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>Company Documents</h3>
                    <div className="d-flex justify-content-center container">
                        <ViewDocs doc={[data.Cert, data.Tax]} />
                    </div>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>Gallery</h3>
                    <div className="row">
                        <div className="col-sm"></div>
                        {
                            // map out images
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile