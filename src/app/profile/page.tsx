"use client"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { db } from "../api/firebase"
import { listingsData, listingsDataDefault, userData, userDataDefault } from "../components/schemes"
import { useEffect, useState } from "react"
import { bgImg, mp, vp } from "../components/cssStyles"
import { businessOutline, callOutline, informationCircleOutline, logoWhatsapp, mailOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { whatsappLink } from "../components/linkFunctions"
export default function Profile() {
    //get name from url
    const name = useSearchParams().get("name")

    //store profile data 
    const [data, setData] = useState<any>(userDataDefault)
    const [listings, setListings] = useState<Array<listingsData>>([])
    const [selected, setSelected] = useState<listingsData>(listingsDataDefault)


    const getProfileData = () => {
        //get data from firebase
        const docRef = doc(db, "users", `${name}`)
        getDoc(docRef).then((doc: any) => {
            setData(doc.data())
            console.log(doc.data().id)
            const q = query(collection(db, "listings"), where("userId", "==", `${doc.data().id}`))
            getDocs(q).then((querySnapshot) => {
                console.log(querySnapshot)
                const listingArray: any = []
                querySnapshot.forEach((doc) => {
                    listingArray.push(doc.data())
                })
                setListings(listingArray)
            })
        }).catch((error) => {
            console.log(error)
        })

    }



    useEffect(() => {
        getProfileData()
    }, [])

    return (
        <div className={mp}>

            <div className="d-flex mt-5  align-items-end  justify-content-end placeholder-wave bg-success" style={{ ...bgImg(data.header), height: "40vh" }}>



            </div>
            <div className="  container pb-3" >
                <div className="position-relative  bg-white rounded-pill p-3" >
                    <IonIcon size="large" icon={businessOutline} /> <p></p>
                    <h4>{data.name}</h4>
                </div>
                <div >
                    <div className=" border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Details</h5>
                        <p className=" "><IonIcon icon={informationCircleOutline} />&nbsp; {data.Description}</p>
                        <p className="d-flex align-items-center "><IonIcon icon={callOutline} />&nbsp; {data.phone}</p>
                        <p className="d-flex align-items-center "><IonIcon icon={mailOutline} />&nbsp; {data.email}</p>
                        <a href={whatsappLink(data.phone)}><button className="btn d-flex align-items-center btn-success"><IonIcon icon={logoWhatsapp} /> Chat on Whatsapp</button></a>
                    </div>
                    <div className=" border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Listings</h5>
                        {
                            listings.map((listing) => {
                                return (
                                    <div className="d-flex align-items-center justify-content-between border-bottom border-1 py-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <img src={listing.image} style={{ width: "50px", height: "50px", objectFit: "cover" }} className="rounded-circle" />
                                            <div className="ms-2">
                                                <p className="mb-0">{listing.name}</p>

                                            </div>
                                        </div>
                                        <button className="btn btn-success" onClick={() => setSelected(listing)}>View</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="border border-1 rounded p-3 mb-3 ">
                        <h5 className="mb-2">Gallery</h5>
                        <div className="scrollHorizontal">

                        
                        {
                            data.images.map((image: string) => {
                                return (
                                    <div className="d-flex align-items-center justify-content-between border-bottom border-1 py-2">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <img src={image} style={{height:"20vh"}} className="rounded me-2" />
                                           
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    <div className="border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Company Documents</h5>
                       
                                <div className="d-flex align-items-center justify-content-between border-bottom border-1 py-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                    
                                        <div className="ms-2">
                                            <p className="mb-0">Certificate of Incoporation</p>
                                           

                                        </div>
                                    </div>
                                    <button className="btn btn-success" >View</button>
                                </div>
                                
                                <div className="d-flex align-items-center justify-content-between border-1 py-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                    
                                        <div className="ms-2">
                                      
                                            <p className="mb-0">Tax Clearence Certificate</p>

                                        </div>
                                    </div>
                                    <button className="btn btn-success" >View</button>
                                </div>
                        
                    </div>
                </div>
            </div>


        </div>
    )
}