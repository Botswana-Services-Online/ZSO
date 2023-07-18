"use client"
import { app } from "@/app/api/firebase"
import { getAuth } from "firebase/auth"
import { useState, useEffect, useContext } from "react"
import ViewDocs from "@/app/components/viewDocs"
import { Authorized } from "@/app/components/contexts"
import { addCircle, images, personCircle } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { storage } from "@/app/api/firebase"
import {ref, getDownloadURL,uploadBytes } from "firebase/storage"
import { v4 } from "uuid"


const Profile = () => {
    const { access, setAccess } = useContext(Authorized)
    const profilePicture = getAuth(app).currentUser?.photoURL || personCircle
    const [msg, setMsg] = useState({
        gallery: "Add Pictures"
    })


    useEffect(() => {

        console.log("check leackage")
    }, [access])


    const AddToGallery = () => {
        const galleryRef = ref(storage,`gallery/${v4()}`)
    }
    return (
        <div className="container">

            <div className="d-flex position-relative" style={{ bottom: "40px" }}>
                <img className="rounded-pill" src={profilePicture} alt="Profile pic" style={{ maxWidth: "100px" }} />
            </div>

            <div className="mb-3">
                <h1>{access.name}</h1>
            </div>
            <div className="mb-5 shadow-lg rounded p-2">
                <h3>Listings</h3>
                <div className="row m-3" >
                    <div className="col-sm d-flex flex-column align-items-center justify-content-center border rounded" style={{ maxWidth: "20vh", height: "45vh" }}>
                        <IonIcon color="success" icon={addCircle} />
                        <br />
                        <small className="specialText text-decoration-underline "><strong>New Listing</strong></small>
                    </div>
                    <div className="col-sm"></div>
                    {
                        // map out images
                    }
                </div>
            </div>
            <div >
                <div className="mb-5 shadow-lg rounded p-2">

                    <h3>
                        Description
                    </h3>
                    <div className="container">
                        <div className="mb-3 mb-3">
                            <textarea className="form-control" value={access.Description} rows={5} readOnly>

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-transparent border-none fw-bold text-success"><u>Update</u></button>
                        </div>

                    </div>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>General Details</h3>
                    <form>


                        <div className="row">
                            <div className="col-sm mb-3  ">
                                <p className="m-2">Email</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={access.email} readOnly />
                            </div>
                            <div className="col-sm mb-3 ">
                                <p className="m-2">Phone Number</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={access.phone} readOnly />
                            </div>
                            <div className="col-sm mb-3">
                                <p className="m-2 ">Number of Employees</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={access.numEmployees} readOnly />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm mb-5">
                                <p className="m-2">Address</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" value={access.address} readOnly />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-transparent border-none fw-bold text-success"><u>Update</u></button>
                        </div>
                    </form>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>Company Documents</h3>
                    <div className="d-flex justify-content-center ">
                        <ViewDocs doc={[access.Cert, access.Tax]} />
                    </div>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>Gallery</h3>
                    <div className="row m-3" >
                        <div className="col-sm pointer d-flex flex-column align-items-center justify-content-center border rounded" style={{ maxWidth: "20vh", height: "45vh" }}>
                            <div className=" text-center">
                                <IonIcon color="success" icon={images} />
                                <br />

                                <label aria-for="gallery" className="specialText pointer">
                                    <input type="file" id="gallery" accept="imga/jpeg image/png" style={{ display: "none" }} />
                                    <small><strong>{msg.gallery}</strong></small></label>
                            </div>
                        </div>
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