"use client"
import { app, db } from "@/app/api/firebase"
import { getAuth } from "firebase/auth"
import { useState, useLayoutEffect, useContext } from "react"
import ViewDocs from "@/app/components/viewDocs"
import { Authorized } from "@/app/components/contexts"
import { addCircle, close, eye, images, informationCircle, personCircle, trash } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { storage } from "@/app/api/firebase"
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { updateUser } from "@/app/components/updateInfo"
import { alignIcon, bgImg, genBtn, genFrm, outlineBtn } from "@/app/components/cssStyles"
import { Modal } from "react-bootstrap"
import { addDoc, collection } from "firebase/firestore"
import { listingsData } from "@/app/components/schemes"
import { categories, cities } from "@/app/components/categories"
import { search } from "ss-search"



const Profile = () => {
    const { access, setAccess } = useContext(Authorized)

    const profilePicture = getAuth(app).currentUser?.photoURL || personCircle
    const [msg, setMsg] = useState({
        gallery: "Add Pictures"
    })
    const [hide, setHide] = useState({
        showGalleryView: false,
        showAddListing: false,
        hideCategories: true,
        hideCities: true
    })
    const [viewSelected, setViewSelected] = useState<string>("")
    const [description, setDescription] = useState<string>(access.Description)
    const [phone, setPhone] = useState<string>(access.phone)
    const [address, setAddress] = useState<string>(access.address)
    const [numEmployees, setNumEmployees] = useState<number>(access.numEmployees)
    const [categoryList, setCategoryList] = useState<Array<any>>([])
    const [citiesList, setCitiesList] = useState<Array<any>>([])

    //listing data
    const [name, setName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [price, setPrice] = useState<number>(0)
    const [serviceLocation, setServiceLocation] = useState<string>("")
    const [descriptionNew, setDescriptionNew] = useState<string>("")
    const [imageListing, setImageListing] = useState<any>()
    const [imagePreview, setImagePreview] = useState<string>("")


    useLayoutEffect(() => {

        console.log("check leackages")
    }, [])

    const AddToGallery = (image: any) => {
        const galleryRef = ref(storage, `gallery/${v4()}`)
        uploadBytes(galleryRef, image).then(res => {
            getDownloadURL(res.ref).then(url => {
                const newImg = [...access.images, url]
                const data = { ...access, images: newImg }
                console.log(data)
                updateUser(data).then(res => {
                    window.location.reload()
                }).catch(err => { })
            }).catch(err => { })
        }).catch(err => { })
    }

    const viewImage = (imageUrl: string) => {
        setViewSelected(imageUrl);
        setHide({ ...hide, showGalleryView: true })
    }

    const deleteImage = (imageUrl: string) => {
        const imgRef = ref(storage, imageUrl)
        deleteObject(imgRef).then(res => {
            const newData = access.images.filter((item: string) => item !== imageUrl)
            const data = { ...access, images: newData }
            updateUser(data).then(res => {
                window.location.reload()
            }).catch(err => { })
        }).catch(err => { })
    }

    const updateDescription = () => {
        const newData = { ...access, Description: description }
        updateUser(newData).then(res => {
            window.location.reload()
        }).catch(err => { })
    }

    const updateGeneralDetails = () => {
        let newData = {
            ...access,
        }

        if (phone.length > 0) {
            newData = { ...newData, phone }
        }
        if (address.length > 0) {
            newData = { ...newData, address }
        }
        if (numEmployees !== 0) {
            newData = { ...newData, numEmployees }
        }
        updateUser(newData).then(res => {
            window.location.reload()
        }).catch(err => { })

    }

    const searchCategories = (value: string) => {
        if (value.length > 0) {
            const data = search(categories, ["name"], value)
            if (data.length > 0) {
                setCategoryList(data)
                setHide({ ...hide, hideCategories: false })
            } else {
                setHide({ ...hide, hideCategories: true })
            }
        } else {
            setHide({ ...hide, hideCategories: true })
        }
    }

    const searchCities = (value: string) => {
        if (value.length > 0) {
            const data = search(cities, ["name"], value)
            if (data.length > 0) {
                setCitiesList(data)
                setHide({ ...hide, hideCities: false })
            } else {
                setHide({ ...hide, hideCities: true })
            }
        } else {
            setHide({ ...hide, hideCities: true })
        }
    }

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault();
        const listingRef = collection(db, "listings")
        const imageRef = ref(storage, `listings/${v4()}`)
        const data: listingsData = {
            name,
            description: descriptionNew,
            price,
            serviceLocation,
            image: "",
            category,
            userId: access.id,
            call: access.phone,
            whatsapp: `https://wa.me/${access.phone}`,
            email: access.email
        }

        uploadBytes(imageRef, imageListing).then(res => {
            getDownloadURL(res.ref).then(url => {
                const uploadData = { ...data, image: url }
                addDoc(listingRef, uploadData).then(res => {
                    window.location.reload()
                }).catch(err => { })
            }).catch(err => { })
        }).catch(err => { })
    }

    const previewImg = (image: any) => {
        return URL.createObjectURL(image)
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
                        <small className="text-success text-center text-decoration-underline pointer" onClick={() => setHide({ ...hide, showAddListing: true })}>New Listing</small>
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
                            <textarea className="form-control" value={description} rows={5} onChange={(e) => setDescription(e.target.value)}>

                            </textarea>
                        </div>
                        <div className="mb-3">
                            <button className={outlineBtn} onClick={() => { updateDescription() }}>Update</button>
                        </div>

                    </div>
                </div>
                <div className="mb-5 shadow-lg rounded p-2">
                    <h3>General Details</h3>
                    <form>


                        <div className="row">
                            <div className="col-sm mb-3  ">
                                <p className={`m-2 `}>Email <IonIcon size="small" color="success" icon={informationCircle} /></p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" placeholder={access.email} readOnly />
                            </div>
                            <div className="col-sm mb-3 ">
                                <p className="m-2">Phone Number</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" placeholder={access.phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="col-sm mb-3">
                                <p className="m-2 ">Number of Employees</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" placeholder={access.numEmployees} onChange={(e: any) => setNumEmployees(e.target.value)} />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm mb-5">
                                <p className="m-2">Address</p>
                                <input type="text" className="form-control rounded-pill  shadow-lg" placeholder={access.address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className={outlineBtn} onClick={() => updateGeneralDetails()}>Update</button>
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

                                <label htmlFor="gallery" className="text-success pointer">
                                    <input type="file" id="gallery" accept="imga/jpeg image/png" onChange={(e: any) => AddToGallery(e.target.files[0])} style={{ display: "none" }} />
                                    <small><u>{msg.gallery}</u></small></label>
                            </div>
                        </div>

                        {
                            access.images?.map((item: string, index: number) => {
                                return (
                                    <div className="col-sm m-2 d-flex flex-row justify-content-center align-items-center border rounded" key={index} style={{ ...bgImg(item), maxWidth: "20vh", height: "45vh" }}>

                                        <button className={`btn btn-success shadow-lg rounded-pill m-2 ${alignIcon}`} onClick={() => viewImage(item)}> <IonIcon size="small" icon={eye} /></button>
                                        <button className={`btn btn-success shadow-l rounded-pill m-2 ${alignIcon}`} onClick={() => deleteImage(item)}><IonIcon size="small" icon={trash} /></button>




                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
            <Modal size="lg" show={hide.showGalleryView}>
                <Modal.Header><h3>View Image</h3><button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => setHide({ ...hide, showGalleryView: false })}><IonIcon icon={close} /></button></Modal.Header>
                <Modal.Body >
                    <div >
                        <img className="img-fluid" src={viewSelected} />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="xl" show={hide.showAddListing}>
                <Modal.Header><h3>Create A New Listing</h3><button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => setHide({ ...hide, showAddListing: false })}><IonIcon color="danger" icon={close} /></button></Modal.Header>
                <Modal.Body >
                    <div >
                        <form onSubmit={(e: any) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row d-flex align-items-center  text-center" style={{ ...bgImg(imagePreview),height:"50vh"}}>

                                        <label htmlFor="newPicture" className="pointer">
                                            <input type="file" id="newPicture" style={{ display: "none" }} accept="image/jpg image/png image/webp image/jpeg" onChange={(e: any) =>{ setImagePreview(previewImg(e.target.files[0]));setImageListing(e.target.files[0])}} />
                                            <p className=" btn bg-white btn-outline-success  outlineHover btn-white rounded-pill">Add Picture</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-sm">
                                <div className="row">
                                <div className="col-sm mb-3">
                                    <input type="text" className={genFrm} placeholder="Product/Service Name" required/>
                                </div>
                                <div className="col-sm mb-3">
                                    <input type="text" className={genFrm} placeholder="Category" value={category} onChange={(e)=>{setCategory(e.target.value);searchCategories(e.target.value);}} required/>
                                    <div className="shadow-lg p-2 w-50 me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCategories} >
                                        {
                                            categoryList.map((item:{name:string},index:number)=>{
                                                return(
                                                    <p key={index} className="pointer" onClick={()=>setCategory(item.name)}>{item.name}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm mb-3">
                                    <input type="text" className={genFrm} placeholder="Service Area" value={serviceLocation} onChange={(e)=>{setServiceLocation(e.target.value);searchCities(e.target.value);}} required/>
                                    <div className="shadow-lg p-2 w-50 me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCities} >
                                        {
                                            citiesList.map((item:{name:string},index:number)=>{
                                                return(
                                                    <p key={index} className="pointer" onClick={()=>setServiceLocation(item.name)}>{item.name}</p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-sm mb-3">
                                    <input type="text" className={genFrm} placeholder="Price" required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm mb-3 m-2">
                                    <textarea required className="form-control rounded shadow-lg" placeholder="Description"></textarea>
                                </div>
                            </div>
                            <div className="text-center">
                                <button type="submit" className={genBtn}>Add Listing</button>
                            </div>
                                </div>
                            </div>


                        </form>
                    </div>

                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Profile