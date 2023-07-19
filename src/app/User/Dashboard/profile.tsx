"use client"
import { app } from "@/app/api/firebase"
import { getAuth } from "firebase/auth"
import { useState, useEffect, useContext } from "react"
import ViewDocs from "@/app/components/viewDocs"
import { Authorized } from "@/app/components/contexts"
import { addCircle, close, eye, images, personCircle, trash } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { storage } from "@/app/api/firebase"
import {ref,getDownloadURL,uploadBytes, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { updateUser } from "@/app/components/updateInfo"
import { alignIcon, bgImg } from "@/app/components/cssStyles"
import { Modal } from "react-bootstrap"



const Profile = () => {
    const { access, setAccess } = useContext(Authorized)
    const profilePicture = getAuth(app).currentUser?.photoURL || personCircle
    const [msg, setMsg] = useState({
        gallery: "Add Pictures"
    })
    const [hide,setHide] = useState({
        showGalleryView:false
    })
    const [viewSelected,setViewSelected] = useState<string>("")

    useEffect(() => {

        console.log("check leackage")
    }, [access])

    const AddToGallery = (image:any) => {
        const galleryRef = ref(storage,`gallery/${v4()}`)
        uploadBytes(galleryRef,image).then(res=>{
            getDownloadURL(res.ref).then(url =>{
                const newImg = [...access.images,url]
                const data = {...access,images:newImg}
                console.log(data)
                updateUser(data).then(res=>{
                   window.location.reload()
                }).catch(err=>{})
            }).catch(err=>{})
        }).catch(err=>{})
    }

    const viewImage=(imageUrl:string)=>{
        setViewSelected(imageUrl);
        setHide({...hide, showGalleryView:true})
    }

    const deleteImage=(imageUrl:string)=>{
        const imgRef = ref(storage,imageUrl)
        deleteObject(imgRef).then(res=>{
            const newData = access.images.filter((item:string)=>item!==imageUrl)
            const data = {...access,images:newData}
            updateUser(data).then(res=>{
                window.location.reload()
            }).catch(err=>{})
        }).catch(err=>{})
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
            <div>
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
                    <div className="row m-3 flex-wrap" >
                        <div className="col-sm m-2 pointer d-flex flex-column align-items-center justify-content-center border rounded" style={{ maxWidth: "20vh", height: "45vh" }}>
                            <div className=" text-center">
                                <IonIcon color="success" icon={images} />
                                <br />

                                <label aria-for="gallery" className="specialText pointer">
                                    <input type="file" id="gallery" accept="imga/jpeg image/png" onChange={(e:any)=>AddToGallery(e.target.files[0])} style={{ display: "none" }} />
                                    <small><strong>{msg.gallery}</strong></small></label>
                            </div>
                        </div>
                        
                        {
                            access.images.map((item:string,index:number)=>{
                                return(
                                    <div className="col-sm m-2 d-flex flex-row justify-content-center align-items-center border rounded" key={index} style={{...bgImg(item), maxWidth: "20vh", height: "45vh" }}>

                                            <button className={`btn btn-success shadow-lg rounded-pill m-2 ${alignIcon}`} onClick={()=>viewImage(item)}> <IonIcon size="small" icon={eye}/></button>
                                            <button className={`btn btn-success shadow-l rounded-pill m-2 ${alignIcon}`} onClick={()=>deleteImage(item)}><IonIcon size="small" icon={trash}/></button>
                                           
                                        
                                       

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <Modal size="lg" show={hide.showGalleryView}>
                        <Modal.Header><button className={`btn btn-danger rounded-pill ${alignIcon}`} onClick={()=>setHide({...hide,showGalleryView:false})}><IonIcon icon={close}/></button></Modal.Header>
                    <Modal.Body >
                        <div >
                            <img className="img-fluid" src={viewSelected}/>
                        </div>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile