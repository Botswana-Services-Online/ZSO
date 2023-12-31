"use client"
import { auth, db } from "@/app/api/firebase"
import { useState,  useEffect, FormEvent } from "react"
// import ViewDocs from "@/app/components/viewDocs"
import {  closeCircleOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { storage } from "@/app/api/firebase"
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage"
import { v4 } from "uuid"
import { updateUser } from "@/app/components/updateInfo"
import { alignIcon, bgImg, genBtn, genFrm, loading,  outlineBtn } from "@/app/components/cssStyles"
import { Alert, Modal,  } from "react-bootstrap"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { listingsData, listingsDataDefault, userData, userDataDefault } from "@/app/components/schemes"
import { categories, cities } from "@/app/components/categories"
import { search } from "ss-search"
import { onAuthStateChanged } from "firebase/auth"





export default function Profile() {


    
    const [msg, setMsg] = useState({
        gallery: "Add Pictures"
    })
    const [hide, setHide] = useState({
        showGalleryView: false,
        showAddListing: false,
        showSelected: false,
        hideCategories: true,
        hideCities: true
    })
    const [userUid,setUserUid] =useState<string>("")
    const [viewSelected, setViewSelected] = useState<string>("")
    const [categoryList, setCategoryList] = useState<Array<any>>([])
    const [citiesList, setCitiesList] = useState<Array<any>>([])
    const [genDetails, setGenDetails] = useState<any>(userDataDefault)
    const [listingData, setListingData] = useState<Array<listingsData>>([])
    const [selectedListing, setSelectedListing] = useState<listingsData>(listingsDataDefault)
    const [selectedId, setSelectedId] = useState<string>("")
    const [workingHours, setWorkingHours] = useState<any>({
        monday: { openingHours: '', closingHours: '' },
        tuesday: { openingHours: '', closingHours: '' },
        wednesday: { openingHours: '', closingHours: '' },
        thursday: { openingHours: '', closingHours: '' },
        friday: { openingHours: '', closingHours: '' },
        saturday: { openingHours: '', closingHours: '' },
        sunday: { openingHours: '', closingHours: '' },
    })
    const success = {
        show: true,
        msg: "Changes Saved",
        variant: "success"
    }
    const error = {
        show: true,
        msg: "Something Went Wrong",
        variant: "danger"
    }
    const [showUserMsg, setShowUserMsg] = useState({
        show: false,
        msg: "",
        variant: "success"
    })



    //listing data
    const [name, setName] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [serviceLocation, setServiceLocation] = useState<string>("")
    const [descriptionNew, setDescriptionNew] = useState<string>("")
    const [imageListing, setImageListing] = useState<any>()
    const [imagePreview, setImagePreview] = useState<string>("")


    //loaders
    const [addListingLoad, setAddListingLoad] = useState<any>(<button type="submit" className={genBtn}>Add Listing</button>)
    const [updateListingLoad, setUpdateListingLoad] = useState<any>(<button type="submit" className={genBtn}>Update Listing</button>)

    const getListingData = () => {
        const id = localStorage.getItem("user")
        const dbRef = collection(db, "listings")
        const q = query(dbRef, where("userId", "==", `${auth.currentUser?.uid}`))
        getDocs(q).then(res => {
            const resData: any = []
            // res.do
            res.docs.forEach(doc => resData.push(doc))
            setListingData(resData)
        }).catch(err => {
            console.log(err)
        })
    }


    const getUserDetails = (uid:string) => {
        console.log(auth.currentUser?.uid)
        getDoc(doc(db, "users", `${uid}`)).then((res) => {

            if(res.exists()){
            console.log(res.data())
            setGenDetails(res.data())
            setWorkingHours({
                monday: { ...res.data().hours.monday },
                tuesday: { ...res.data().hours.tuesday },
                wednesday: { ...res.data().hours.wednesday },
                thursday: { ...res.data().hours.thursday },
                friday: { ...res.data().hours.friday },
                saturday: { ...res.data().hours.saturday },
                sunday: { ...res.data().hours.sunday },
            })
        }else{
            console.log("no data")
        }
          
        }).catch(err => {
            console.log(err)
            setShowUserMsg(error)
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, call getUserDetails()
                setUserUid( user.uid); // User ID
                getUserDetails(user.uid);
                getListingData()
            } else {
                // User is signed out
                console.log('No user is signed in.');
            }
        });
       
    
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);
    
        // getUserDetails()
      
      
   
    const AddToGallery = (image: any) => {
        const galleryRef = ref(storage, `gallery/${v4()}`)
        uploadBytes(galleryRef, image).then(res => {
            getDownloadURL(res.ref).then(url => {
                const newImg = [...genDetails.images, url]
                const data = { ...genDetails, images: newImg }

                updateUser(data).then(res => {
                    getUserDetails(userUid)
                    setShowUserMsg(success)
                }).catch(err => { setShowUserMsg(error) })
            }).catch(err => { setShowUserMsg(error) })
        }).catch(err => { setShowUserMsg(error) })
    }

    const viewImage = (imageUrl: string) => {
        setViewSelected(imageUrl);
        setHide({ ...hide, showGalleryView: true })
    }

    const deleteImage = (imageUrl: string) => {
        const imgRef = ref(storage, imageUrl)
        deleteObject(imgRef).then(res => {
            const newData = genDetails.images.filter((item: string) => item !== imageUrl)
            const data = { ...genDetails, images: newData }
            updateUser(data).then(res => {
                getUserDetails(userUid)
                setShowUserMsg(success)
            }).catch(err => { setShowUserMsg(error) })
        }).catch(err => { setShowUserMsg(error) })
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
        setAddListingLoad(loading)
        const listingRef = collection(db, "listings")
        const imageRef = ref(storage, `listings/${v4()}`)
        const data: listingsData = {
            name,
            description: descriptionNew,
            price,
            serviceLocation,
            image: "",
            category,
            userId: `${auth.currentUser?.uid}`,
            call: genDetails.mobilePhone,
            whatsapp: `https://wa.me/${genDetails?.mobilePhone}`,
            email: genDetails.email,
            rating: 0,
            review: [],
            company: genDetails.name,
            type: "listing"
        }

        uploadBytes(imageRef, imageListing).then(res => {
            getDownloadURL(res.ref).then(url => {
                const uploadData = { ...data, image: url }
                addDoc(listingRef, uploadData).then(res => {
                    setHide({ ...hide, showAddListing: false })
                    setAddListingLoad(<button type="submit" className={genBtn}>Add Listing</button>)
                    getListingData()
                    setShowUserMsg(success)
                    setTimeout(() => setHide({ ...hide, showAddListing: false }), 5000)
                }).catch(err => { setShowUserMsg(error); setAddListingLoad(<button type="submit" className={genBtn}>Add Listing</button>) })
            }).catch(err => { setShowUserMsg(error); setAddListingLoad(<button type="submit" className={genBtn}>Add Listing</button>) })
        }).catch(err => { setShowUserMsg(error); setAddListingLoad(<button type="submit" className={genBtn}>Add Listing</button>) })
    }

    const previewImg = (image: any) => {
        return URL.createObjectURL(image)
    }

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault()
        setUpdateListingLoad(loading)
        updateDoc(doc(db, "listings", selectedId), { ...selectedListing }).then(res => {
            getListingData()
            setUpdateListingLoad(<button type="submit" className={genBtn}>Update Listing</button>)
            setHide({ ...hide, showSelected: false })
            setShowUserMsg(success)
        }).catch(err => {
            setShowUserMsg(error)
            setUpdateListingLoad(<button type="submit" className={genBtn}>Update Listing</button>)
        })
    }

    const updateGenDetails = (e: FormEvent) => {
        e.preventDefault()
        updateUser(genDetails).then(res => {
            getUserDetails(`${auth.currentUser?.uid}`)
            setShowUserMsg(success)
        }).catch(err => {
            console.log(err)
            setShowUserMsg(error)
        })

    }

    const RemoveListing = () => {
        deleteDoc(doc(db, "listings", selectedId)).then(res => {
            getListingData()
            setHide({ ...hide, showSelected: false })
            setShowUserMsg(success)
        }).catch(err => {
            setShowUserMsg(error)
        })
    }

    const handleHoursChange = (day: any, timeType: any, value: any) => {

        setWorkingHours({ ...workingHours, [day]: {...workingHours[day], [timeType]: value } });
        console.log(workingHours)
    };
    const handleHoursUpdate = (e: FormEvent) => {
        e.preventDefault()
        updateUser({ ...genDetails, hours: workingHours }).then(res => {
            getUserDetails(userUid)
            setShowUserMsg(success)
        }).catch(err => { setShowUserMsg(error) })
    }


    return (
        <div className="container">
            <div className="mb-3">
                <h1>{genDetails?.name}</h1>
            </div>
            <Alert show={showUserMsg.show} variant={showUserMsg.variant} dismissible={true} onClose={() => setShowUserMsg({ ...showUserMsg, show: false })} >

                {showUserMsg.msg}
            </Alert>

            <div className="mb-5 border border-1 rounded p-2">
                <h3>Listings</h3>
                <div className=" m-3 scrollHorizontal" >
                    <div className="d-flex flex-column align-items-center justify-content-center border rounded me-2 " style={{ minWidth: "30vw", maxWidth: "30vw", height: "30vh" }}>
                        <img className="imgGreen" src="https://voideawn.sirv.com/website/add-circle.svg" width="25" />
                        <br />
                        <p className="text-truncate">{listingData?.length >= 1 ? <small><a href="/pricing" >Upgrade</a></small> : <small className="text-success text-center text-decoration-underline pointer" onClick={() => setHide({ ...hide, showAddListing: true })}>New Listing</small>}</p>
                    </div>
                    {
                        listingData?.map((item: any, index: number) => {
                            return (
                                <div key={index} className="mb-3 me-2 pointer" onClick={() => { setSelectedListing(item.data()); setSelectedId(item.id); setHide({ ...hide, showSelected: true }) }}>
                                    <div className="card" style={{ minWidth: "30vw", maxWidth: "30vw", height: "30vh" }}>
                                        <img src={item.data().image} loading="eager" style={{ height: "20vh" }} className="rounded  m-2 img-fluid  fitImages" alt="..." />
                                        <div className=" text-center ">
                                            <p className="card-title text-truncate m-1"><small>{item.data().name}</small></p>

                                            <div className="d-flex justify-content-between ">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <div>

                <div className="mb-5 border border-1 rounded p-2">
                    <h3>General Details</h3>
                    <form onSubmit={(e) => updateGenDetails(e)}>

                        <div className="row">
                            <p>Description</p>
                            <div className="col-sm mb-3">
                                <textarea className="form-control" value={genDetails?.Description} onChange={(e) => setGenDetails({ ...genDetails, Description: e.target.value })} required>

                                </textarea>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm mb-3  ">
                                <p className={`m-2 `}>Email</p>
                                <input type="text" className="form-control rounded-pill  " disabled value={genDetails?.email} readOnly />
                            </div>
                            <div className="col-sm mb-3 ">
                                <p className="m-2">Mobile Number</p>
                                <input type="text" className="form-control rounded-pill  " value={genDetails?.mobilePhone} onChange={(e) => setGenDetails({ ...genDetails, mobilePhone: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p className="m-2 ">Telephone Number</p>
                                <input type="text" className="form-control rounded-pill  " value={genDetails?.telephone} onChange={(e: any) => setGenDetails({ ...genDetails, telephone: e.target.value })} required />
                            </div>


                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>LinkedIn</p>
                                <input className="form-control rounded-pill" value={genDetails?.linkedin} onChange={(e) => setGenDetails({ ...genDetails, linkedin: e.target.value })}  />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Twitter</p>
                                <input className="form-control rounded-pill" value={genDetails?.twitter} onChange={(e) => setGenDetails({ ...genDetails, twitter: e.target.value })}  />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Facebook</p>
                                <input className="form-control rounded-pill" value={genDetails?.facebook} onChange={(e) => setGenDetails({ ...genDetails, facebook: e.target.value })} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm mb-3">
                                <p>Website</p>
                                <input className="form-control rounded-pill" value={genDetails?.website} onChange={(e) => setGenDetails({ ...genDetails, website: e.target.value })} required />
                            </div>
                            <div className="col-sm mb-3">
                                <p>Open on Holidays : {genDetails?.holiday}</p>
                                <select onChange={(e: any) => setGenDetails({ ...genDetails, holiday: e.target.value })} className="form-control rounded-pill" required>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div className="col-sm mb-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm mb-5">
                                <p className="m-2">Address</p>
                                <textarea className="form-control   " value={genDetails?.address} onChange={(e) => setGenDetails({ ...genDetails, address: e.target.value })} required></textarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className={outlineBtn} >Update</button>
                        </div>
                    </form>
                </div>
                {/* <div className="mb-5 border-1 rounded p-2">
                    <h3>Documents</h3>
                    <div className="d-flex justify-content-center ">
                        <ViewDocs doc={[access.Cert, access.Tax]} />
                    </div>
                </div> */}
                <div className="mb-5 rounded border border-1 p-2">
                    <h3>Gallery</h3>
                    <div className="scrollHorizontal m-3" >
                        <div className=" m-2 pointer d-flex flex-column align-items-center justify-content-center border rounded p-3" style={{ minWidth: "30vw", maxWidth: "30vw", height: "30vh" }}>
                            <div className=" text-center">
                                <img className="imgGreen" src="https://voideawn.sirv.com/website/images.svg" width="25" />
                                <br />

                                <label htmlFor="gallery" className="text-success pointer">
                                    <input type="file" id="gallery" accept="imga/jpeg image/png" onChange={(e: any) => AddToGallery(e.target.files[0])} style={{ display: "none" }} />
                                    <small><u>{msg.gallery}</u></small></label>
                            </div>
                        </div>

                        {
                            genDetails?.images?.map((item: string, index: number) => {
                                return (
                                    <div className="m-2 d-flex flex-row justify-content-center align-items-center border rounded" key={index} style={{ ...bgImg(item), maxWidth: "30vh", minWidth: "30vh", height: "30vh" }}>

                                        <button className={`btn btn-success shadow-lg rounded-pill m-2 ${alignIcon}`} onClick={() => viewImage(item)}><img className="imgWhite" src="https://voideawn.sirv.com/website/eye.svg" width="25" /></button>
                                        <button className={`btn btn-success shadow-l rounded-pill m-2 ${alignIcon}`} onClick={() => deleteImage(item)}><img className="imgWhite" src="https://voideawn.sirv.com/website/trash.svg" width="25" /></button>




                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="border border-1 mb-5 p-2 rounded">
                    <h3 className="mb-3">Working Hours</h3>
                    <form onSubmit={(e) => handleHoursUpdate(e)}>
                        {Object.keys(workingHours).map((day) => (
                            <div key={day} className=" row">
                                <p className="fw-bold">{day.charAt(0).toUpperCase() + day.slice(1)}</p>
                                <label>
                                    Opening Hours:
                                    <input
                                        type="time"
                                        value={workingHours[day].openingHours}
                                        className="form-control mb-3"
                                        onChange={(e) => handleHoursChange(day, 'openingHours', e.target.value)}

                                    />
                                </label>
                                <label>
                                    Closing Hours:
                                    <input
                                        type="time"
                                        value={workingHours[day].closingHours}
                                        className="form-control mb-3"
                                        onChange={(e) => handleHoursChange(day, 'closingHours', e.target.value)}

                                    />
                                </label>
                            </div>
                        ))}
                        <div>
                            <button className={genBtn}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal size="lg" show={hide.showGalleryView}>
                <Modal.Header>
                    <h3>View Image</h3>
                    <button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => setHide({ ...hide, showGalleryView: false })}> <img className="imgGreen" src="https://voideawn.sirv.com/website/close.svg" width="25" /></button>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <img className="img-fluid" src={viewSelected} />
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="xl" show={hide.showAddListing}>
                <Modal.Header>
                    <h3>Create A New Listing</h3>
                    <button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => { setHide({ ...hide, showAddListing: false }); setImagePreview("") }}> <img className="imgGreen" src="https://voideawn.sirv.com/website/close.svg" width="25" /></button>
                </Modal.Header>
                <Modal.Body >
                    <div >
                        <form onSubmit={(e: any) => handleSubmit(e)}>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row d-flex align-items-center  text-center" style={{ ...bgImg(imagePreview), height: "50vh" }}>

                                        <label htmlFor="newPicture" className="pointer">
                                            <input type="file" id="newPicture" style={{ display: "none" }} accept="image/jpg image/png image/webp image/jpeg" onChange={(e: any) => { setImagePreview(previewImg(e.target.files[0])); setImageListing(e.target.files[0]) }} />
                                            <p className=" btn bg-white btn-outline-success  outlineHover btn-white rounded-pill">Add Picture</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Product/Service Name" onChange={(e) => setName(e.target.value)} required />
                                        </div>
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Category" value={category} onChange={(e) => { setCategory(e.target.value); searchCategories(e.target.value); }} required />
                                            <div className="shadow-lg p-2 me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCategories} >
                                                {
                                                    categoryList.map((item: { name: string }, index: number) => {
                                                        return (
                                                            <p key={index} className="pointer" onClick={() => { setCategory(item.name); setHide({ ...hide, hideCategories: true }) }}>{item.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Service Area" value={serviceLocation} onChange={(e) => { setServiceLocation(e.target.value); searchCities(e.target.value); }} required />
                                            <div className="shadow-lg p-2  me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCities} >
                                                {
                                                    citiesList.map((item: { name: string }, index: number) => {
                                                        return (
                                                            <p key={index} className="pointer" onClick={() => { setServiceLocation(item.name); setHide({ ...hide, hideCities: true }) }}>{item.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-sm mb-3">
                                            <input type="number" className={genFrm} placeholder="Price - Optional" onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm mb-3 m-2">
                                            <textarea required className="form-control rounded shadow-lg" placeholder="Description" onChange={(e) => setDescriptionNew(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">

                                        <>{addListingLoad}</>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal show={hide.showSelected} size="lg">
                <Modal.Header>
                    <h3>Edit Listing</h3>
                    <button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => { setHide({ ...hide, showSelected: false }); setImagePreview("") }}> <IonIcon color="danger" icon={closeCircleOutline} /></button>
                </Modal.Header>
                <Modal.Body >
                    <div >
                        <form onSubmit={(e) => handleUpdate(e)}>
                            <div className="row">
                                <div className="col-sm">
                                    <div className="row d-flex align-items-center  text-center" style={{ ...bgImg(selectedListing.image), height: "50vh" }}>

                                        {/* <label htmlFor="newPicture" className="pointer">
                                            <input type="file" id="newPicture" style={{ display: "none" }} accept="image/jpg image/png image/webp image/jpeg" onChange={(e: any) => { setImagePreview(previewImg(e.target.files[0])); setSelectedListing({...selectedListing,image:e.target.files[0]}) }} />
                                            <p className=" btn bg-white btn-outline-success  outlineHover btn-white rounded-pill">Change Image</p>
                                        </label> */}
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="row">
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Product/Service Name" value={selectedListing.name} onChange={(e) => setSelectedListing({ ...selectedListing, name: e.target.value })} required />
                                        </div>
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Category" value={selectedListing.category} onChange={(e) => { setSelectedListing({ ...selectedListing, category: e.target.value }); searchCategories(e.target.value); }} required />
                                            <div className="shadow-lg p-2 me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCategories} >
                                                {
                                                    categoryList.map((item: { name: string }, index: number) => {
                                                        return (
                                                            <p key={index} className="pointer" onClick={() => { setSelectedListing({ ...selectedListing, category: item.name }); setHide({ ...hide, hideCategories: true }) }}>{item.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm mb-3">
                                            <input type="text" className={genFrm} placeholder="Service Area" value={selectedListing.serviceLocation} onChange={(e) => { setSelectedListing({ ...selectedListing, serviceLocation: e.target.value }); searchCities(e.target.value); }} required />
                                            <div className="shadow-lg p-2  me-5 rounded m-1 z-0 position-absolute bg-white overflow-auto " style={{ maxHeight: "20vh", width: "50vh" }} hidden={hide.hideCities} >
                                                {
                                                    citiesList.map((item: { name: string }, index: number) => {
                                                        return (
                                                            <p key={index} className="pointer" onClick={() => { setSelectedListing({ ...selectedListing, serviceLocation: item.name }); setHide({ ...hide, hideCities: true }) }}>{item.name}</p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-sm mb-3">
                                            <input type="number" value={selectedListing.price} className={genFrm} placeholder="Price - Optional" onChange={(e) => setSelectedListing({ ...selectedListing, price: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm mb-3 m-2">
                                            <textarea required className="form-control rounded shadow-lg" value={selectedListing.description} placeholder="Description" onChange={(e) => setSelectedListing({ ...selectedListing, description: e.target.value })}></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">

                                        <>{updateListingLoad}</>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-outline-danger  rounded-pill" onClick={() => RemoveListing()}>Remove Listing</button>
                </Modal.Footer>

            </Modal>

        </div>
    )
}
