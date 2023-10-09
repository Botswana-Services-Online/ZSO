"use client"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"
import { db } from "../api/firebase"
import { listingsData, listingsDataDefault, userData, userDataDefault } from "../components/schemes"
import { useEffect, useState } from "react"
import { alignIcon, bgImg,  mp, nomBtn, transBtn, vp } from "../components/cssStyles"
import { businessOutline, call, callOutline,location, informationCircleOutline, logoWhatsapp, mail, mailOutline, closeCircleOutline, watchOutline, calendarOutline, timeOutline, logoLinkedin, logoTwitter, logoFacebook } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import { whatsappLink } from "../components/linkFunctions"
import { Modal } from "react-bootstrap"
import Review from "../components/review"
import { ReviewCalc } from "../components/calculate"
import moment from "moment"
export default function Profile() {
    //get name from url
    const name = useSearchParams()

    //store profile data 
    const [data, setData] = useState<userData>(userDataDefault)
    const [listings, setListings] = useState<Array<listingsData>>([])
    const [selected, setSelected] = useState<listingsData>(listingsDataDefault)
    const [viewSelected, setViewSelected] = useState<string>("")
    const [hide,setHide] = useState({showDetails:false,showGallery:false})
    const [showReview,setShowReview] = useState<boolean>(false)
    const [rating,setRating] = useState<number>(0)
    const [today,setToday] = useState<{openingHours:string,closingHours:string}>({openingHours:"",closingHours:""})


    const getProfileData = () => {
        //get data from firebase
        const p:any = name?.get("name")
        const docRef = doc(db, "users", `${p}`)
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

    const getOpenHours=()=>{
        const day = moment().format("dddd").toLowerCase()
        const todaysHours:{openingHours:string,closingHours:string} = data.hours[day]
        setToday(todaysHours)

    }

    useEffect(() => {
        getProfileData()
        getOpenHours()
    }, [])

    
    return (
        <div className={mp}>

            <div className="d-flex mt-5  align-items-end  justify-content-end placeholder-wave bg-success" style={{ ...bgImg(data.header), height: "40vh" }}>



            </div>
            <div className="  container pb-3" >
                <div className="position-relative  bg-white rounded-pill p-3" >
                    <IonIcon size="large" icon={businessOutline} /> <p></p>
                    <h4>{data.name}</h4>
                    <h5 className="d-flex align-items-center">{ReviewCalc(data.reviews)}</h5>
                    <u className="pointer" onClick={()=>setShowReview(true)}><small>Leave a review!</small></u>
                </div>
                <div >
                    <div className=" border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Details</h5>
                        <p className=" "><IonIcon icon={informationCircleOutline} />&nbsp; {data.Description}</p>
                        <p className="d-flex align-items-center "><IonIcon icon={callOutline} />&nbsp; {data.mobilePhone}  {data.telephone.length>0?` or ${data.telephone}`:null}</p>
                        <p className="d-flex align-items-center "><IonIcon icon={mailOutline} />&nbsp; {data.email}</p>
                        <p className="d-flex align-items-center "><IonIcon icon={timeOutline} /> &nbsp;{today?.openingHours?.length>0?`Open from ${today.openingHours} - ${today.closingHours}`:"Closed"} </p>
                        <p className="d-flex align-items-center "><IonIcon icon={calendarOutline} /> &nbsp;Open on holidays - {data.holiday}</p>

                        <a className="text-decoration-none " target="blank" href={whatsappLink(data.phone)}><button className="btn d-flex align-items-center btn-success"><IonIcon icon={logoWhatsapp} />&nbsp;Chat on Whatsapp</button></a>

                    </div>
                    <div className=" border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Socials</h5>
                        {data.linkedin.length > 0 ? <p className="d-flex"><IonIcon icon={logoLinkedin}/>&nbsp;<a href={`https://www.linkedin.com/in/${data.linkedin}/`} target="_blank" className="d-flex align-items-center "> {data.linkedin}</a></p> : null}
                        {data.twitter.length > 0 ? <p  className="d-flex"><IonIcon icon={logoTwitter}/>&nbsp; <a href={`https://twitter.com/${data.twitter}/`} target="_blank" className="d-flex align-items-center ">{data.twitter}</a></p> : null}
                        {data.facebook.length > 0 ? <p  className="d-flex"><IonIcon icon={logoFacebook}/>&nbsp;<a href={`https://www.facebook.com/${data.facebook}/`} target="_blank" className="d-flex align-items-center "> {data.facebook}</a></p> : null}
                    </div>
                    <div className=" border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Listings</h5>
                        {
                            listings?.map((listing,index:number) => {
                                return (
                                    <div key={index} className="d-flex align-items-center justify-content-between border-bottom border-1 py-2 pointer">
                                        <div className="d-flex align-items-center justify-content-between" onClick={() => {setSelected(listing);setHide({...hide,showDetails:true})}}>
                                            <img src={listing.image} style={{ width: "50px", height: "50px", objectFit: "cover" }} className="rounded-circle" />
                                            <div className="ms-2">
                                                <p className="mb-0">{listing.name}</p>
                                            </div>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="border border-1 rounded p-3 mb-3 ">
                        <h5 className="mb-2">Gallery</h5>
                        <div className="scrollHorizontal">

                        
                        {
                            data.images?.map((image: string,index:number) => {
                                return (
                                    <div key={index} className="d-flex align-items-center justify-content-between border-bottom border-1 py-2 pointer">
                                        <div className="d-flex align-items-center justify-content-between" onClick={()=>{setViewSelected(image);setHide({...hide,showGallery:true})}}>
                                            <img src={image} style={{height:"20vh"}} className="rounded me-2" />
                                           
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                    {/* <div className="border border-1 rounded p-3 mb-3">
                        <h5 className="mb-2">Company Documents</h5>
                       
                                <div className="d-flex align-items-center justify-content-between border-bottom border-1 py-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                    
                                        <div className="ms-2">
                                            <p className="mb-0">Certificate of Incoporation</p>
                                           

                                        </div>
                                    </div>
                                    <a href={data.Cert} target="_blank"><button className={nomBtn} >View</button></a>
                                </div>
                                
                                <div className="d-flex align-items-center justify-content-between border-1 py-2">
                                    <div className="d-flex align-items-center justify-content-between">
                                    
                                        <div className="ms-2">
                                      
                                            <p className="mb-0">Tax Clearence Certificate</p>

                                        </div>
                                    </div>
                                    <a href={data.Tax} target="_blank"><button className={nomBtn}>View</button></a>
                                </div>
                        
                    </div> */}
                </div>
            </div>
            <Modal size="lg" show={hide.showDetails}>
                <Modal.Header>
                    <h3>View</h3>
                    <button className="btn btn-transparent" onClick={()=>setHide({...hide,showDetails:false})}><IonIcon color="danger" icon={closeCircleOutline}/></button>
                    </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex align-items-center ">
                        <div className="col-sm mb-3">
                                <img src={selected.image} className="img-fluid" />
                        </div>
                        <div className="col-sm">
                            {/* <div>
                                <p className="pointer"><Link className="text-success" href={{pathname:"/profile",query:{name:selected.userId}}}><IonIcon color="success" icon={businessOutline}/><u>{selected.company}</u></Link></p>
                            </div> */}
                                <div className="row">
                                    <small>
                                    <div className="col-sm">
                                        <p><b>Listing Details</b></p>
                                        <p>{selected.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <p>${selected.price}</p>
                                    </div>
                            </small>
                                    
                                </div>
                                <div>
                                    <small>
                                    <p>{selected.category}</p>
                                    <p>
                                        {selected.description}
                                    </p>
                                    <p>
                                       <b>Contact Details</b> 
                                    </p>
                                    <p><IonIcon size="small" icon={location}/> {selected.serviceLocation}</p>
                                    <p><IonIcon size="small" icon={call}/> {selected.call}</p>
                                    <p className="d-flex align-items-center"><IonIcon size="small" icon={mail}/>&nbsp; {selected.email}</p>
                                    {/* <p>{selected.company}</p> */}
                                    </small>
                                    <button className={transBtn}><u>Leave a review</u></button>
                                </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal size="lg" show={hide.showGallery}>
                <Modal.Header>
                    <h3>View Image</h3>
                    <button className={`btn btn-transparent rounded-pill ${alignIcon}`} onClick={() => setHide({ ...hide, showGallery: false })}> <img className="imgGreen" src="https://voideawn.sirv.com/website/close.svg" width="25" /></button>
                </Modal.Header>
                <Modal.Body >
                    <div className="text-center">
                        <img className="img-fluid" src={viewSelected} />
                    </div>
                </Modal.Body>
            </Modal>
            <Review close={{showReview,setShowReview}} data={data}/>


        </div>
    )
}