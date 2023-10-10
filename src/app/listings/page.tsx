"use client"
import { businessOutline, call, cartOutline, checkmarkDoneCircleOutline, closeCircleOutline, location, logoWhatsapp, mail, searchOutline, star } from "ionicons/icons";
import { alignIcon, bgImg, mp, nomBtn, transBtn, vp } from "../components/cssStyles";
import { IonIcon } from "@ionic/react";
import { Modal } from "react-bootstrap";
import { cities, categories } from "../components/categories";
import { FormEvent, useEffect, useRef, useState } from "react";
import { listingsData, listingsDataDefault, userData } from "../components/schemes";
import { useSearchParams } from "next/navigation";
import { db } from "../api/firebase";
import Link from "next/link";
import { ReviewCalc } from "../components/calculate";
import { useRouter } from "next/navigation";
import algolia from "algoliasearch"
import { convertToGeometry, getDistance } from "../components/calcDistance";
import { Highlight, useInfiniteHits, Snippet } from "react-instantsearch";

export default function Listings() {
    const nav = useRouter()
    const name = useSearchParams()
    const [hideLoad, setHideLoad] = useState<boolean>(true)
    const [searchName, setSearchName] = useState<string>("")
    const [searchLocation, setSearchLocation] = useState<string>("")
    const [hideListings, setHideListings] = useState<boolean>(true)
    const searchAll = algolia("WVEPWJXG9S", "70781c8d8f715f97a5a55cb90ba3eccd")
    const listingIndex = searchAll.initIndex("listings")
    const usersIndex = searchAll.initIndex("users")
    const [hide, setHide] = useState({
        showFilterOptions: false,
        showDetails: false,

    })
    const [data, setData] = useState<Array<listingsData>>([])
    const [compData, setCompData] = useState<Array<userData>>([])
    const [selected, setSelected] = useState<listingsData>(listingsDataDefault)

    const [advanced, setAdvanced] = useState({
        category: "All Categories",
        location: "Harare",
        price: "",
        currenltyOpened: "Yes",
        nearest: "Yes"
    })

    const advancedSearch = (e: FormEvent) => {
        e.preventDefault()
        setHide({ ...hide, showFilterOptions: false })
        setHideLoad(false)
        let data: any = []

        // get data from current city
        listingIndex.search(`${searchName} ${searchLocation}`, {
            hitsPerPage: 50,
        }).then(res => {
            data = [...res.hits]
            console.log(data)
            if (data.length === 0) {
                setData([])
            } else {
                //check if we have user location
                navigator.geolocation.getCurrentPosition((position) => {
                    let userPositon = { lat: position.coords.latitude, lng: position.coords.longitude }
                    data.forEach((item: any) => {
                        let address = item.address
                        convertToGeometry(address).then(res => {
                            console.log(res)
                            let destination = res.geometry.
                                console.log(userPositon)
                            console.log(destination)
                            getDistance(userPositon, destination).then(res => {
                                console.log(res)
                            }).catch(err => console.log(err))
                        }).catch(err => {
                            console.log(err)
                        })

                    })
                }, (err) => {
                    // alert user if we don't have access to location
                    alert("Please enable location services and try again!")
                    setHideLoad(false)
                })
            }
        }).catch(err => {
            console.log(err)
        })

    }

    const basicSearch = (value: string, location: string) => {
        setHideLoad(false)
        listingIndex.search(`${value} ${location}`, {
            hitsPerPage: 50,
            filters: "type:listing",
            getRankingInfo: true,


        }).then((res: any) => {
          
            setData(res.hits)
            setHideLoad(true)
        }).catch(err => {
            setHideLoad(true)
        })

        usersIndex.search(`${value} ${location}`, {
            hitsPerPage: 50,
           

        }).then((res: any) => {
            console.log(res.hits)
            setCompData(res.hits)
            setHideLoad(true)
        }).catch(err =>   setHideLoad(true))


    }



    useEffect(() => {
        let getSearchValue: any = name.get("name") !== null ? name.get("name") : ""
        let getSearchLocation: any = name.get("location") !== null ? name.get("location") : ""
        basicSearch(getSearchValue, getSearchLocation)
    }, [])

    const handleSearch = (e: FormDataEvent) => {
        e.preventDefault()
        setHideLoad(false)
        basicSearch(searchName, searchLocation)

    }



 

    return (
        <div className={mp}>
            <form onSubmit={(e: any) => handleSearch(e)} className="mb-5">
                <div className=" d-flex flex-column justify-content-center p-3 mt-2 mb-5 position-fixed w-100  text-center bg-light z-1">

                    <div className="input-group mb-3">
                        <input className="form-control rounded-start-pill" placeholder="Looking for?" value={searchName} onChange={(e) => setSearchName(e.target.value)} required />
                        <input className="form-control rounded-end-pill me-2" placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} />

                        <button type="submit" className={`${alignIcon} btn btn-outline-success rounded-pill btnHover`}><IonIcon icon={searchOutline} /></button>
                    </div>
                    <button type="button" className={`${alignIcon} btn btn-outline-success rounded-pill me-1 btnHover`} onClick={() => setHide({ ...hide, showFilterOptions: true })}>Advanced Search</button>

                    <div className="d-flex justify-content-center align-items-center   flex-row mt-3 rounded">
                        <button type="button" className={`me-3 ${transBtn} ${hideListings === true ? "text-success" : "text-dark"}`} onClick={() => { setHideListings(true) }}><IonIcon icon={cartOutline} />&nbsp;Listings</button>
                        <button type="button" className={`ms-3 ${transBtn} ${hideListings === false ? "text-success" : "text-dark"}`} onClick={() => { setHideListings(false) }}><IonIcon icon={businessOutline} />&nbsp;Companies</button>
                    </div>



                </div>
                <br />
                <br />
                <br />

            </form>
            <div className={vp}>
                <div className="mt-5">

                </div>
                <div className="ais-InfiniteHits">
                    {hideListings === true ?

                        <div className="d-flex flex-row flex-wrap  m-3 mt-5 justify-content-evenly ais-InfiniteHits-list" >
                            <div className="mt-5"></div>
                            <br />
                            {/* <div className="d-flex justify-content-center align-items-center flex-column mt-5" aria-hidden={data.length>0?false:true}>
                                           
                                           <h3>Sorry Couldn't find anything 🤕</h3>
                                       </div> */}

                            {data?.map((item: listingsData, index: number) => {
                               
                                    return (
                                        <div className="col-sm m-2  mb-3 w-100 d-flex  justify-content-center" key={index}>
                                            <div className="card" style={{ width: "18rem", height: "40rem" }} >
                                                {/* <img src={item.image} className="card-img-top img-thumbnail "    alt=""/> */}
                                                <div className="card-img-top" style={{ ...bgImg(item.image), height: "20rem", width: "100%" }}>

                                                </div>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between ">
                                                        {item.review?.map((item: any, index: number) => {
                                                            if (item.length === 0) {
                                                                return (
                                                                    <p key={index}>< IonIcon color="medium" size="small" icon={star} /></p>
                                                                )
                                                            } else {

                                                            }
                                                        })}
                                                        <IonIcon color="medium" icon={checkmarkDoneCircleOutline} />
                                                    </div>
                                                    <div className="d-flex justify-content-between ">


                                                        <h6 className="card-title">{item.name}</h6>
                                                        <h6 className="specialText">$ {item.price}</h6>
                                                    </div>
                                                    <p className=" text-truncate">
                                                        <small >{item.description}</small>
                                                    </p>


                                                    <p className=""><small><IonIcon size="small" icon={location} /> {item.serviceLocation}</small></p>
                                                    <p ><IonIcon size="small" src={call} /><small> {item.call}</small></p>
                                                    <p className="d-flex align-items-center"><IonIcon size="small" icon={mail} /><small>&nbsp; {item.email}</small></p>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between ">
                                                    <button onClick={() => { setSelected(item); setHide({ ...hide, showDetails: true }) }} className="btn  btn-transparent text-success">View</button>
                                                    <a target="_blank" href={`https://wa.me/${item.call.split(" ").join("")}?text=Good day,can i get more details about ${item.name}. I saw the post on Zimbabwe Services Online!`}><button className="btn  btn-transparent"><IonIcon color="success" icon={logoWhatsapp} /></button></a>
                                                </div>


                                            </div>
                                        </div>
                                    )
                              
                            })}


                        </div> :
                        <div className="d-flex flex-row flex-wrap  m-3  justify-content-evenly " >
                            <br />

                            {compData?.map((item:any, index: number) => {
                                return (
                                    <div key={index} className="rounded pointer shadow-lg p-3 m-2 " style={{ width: "18rem", height: "27vh" }} onClick={() => nav.push(`/profile?name=${item.objectID}`)}>
                                        <div className="d-flex justify-content-between ">
                                            <p>{item.name}</p>
                                            <IonIcon color="medium" icon={checkmarkDoneCircleOutline} />
                                        </div>
                                        <hr />
                                        <div >
                                            <p>{item.industry}</p>
                                            {ReviewCalc(item.reviews)}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
                </div>
            </div>
            <Modal show={hide.showFilterOptions} size="lg">
                <Modal.Header>
                    <h3>AI Powered Search</h3>
                    <button className={`${alignIcon} btn btn-transparent rounded-pill`} onClick={() => setHide({ ...hide, showFilterOptions: false })}><IonIcon color="danger" icon={closeCircleOutline} /></button>
                </Modal.Header>
                <form onSubmit={(e) => advancedSearch(e)}>
                    <Modal.Body>
                        <div>
                            <p><small>By default AI powered search is already in use to give you the best results, change values if you arent satisfied</small></p>

                            <div className="row">
                                <div className="col-sm mb-3">
                                    <p>Category </p>
                                    <select className="form-control" value={advanced.category} onChange={(e) => setAdvanced({ ...advanced, category: e.target.value })}>
                                        {
                                            categories.map((item: any, index: number) => {
                                                return (
                                                    <option value={item.name} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm mb-3">
                                    <p>Location <b className="text-danger">*</b></p>
                                    <select className="form-control" value={advanced.location} onChange={(e) => setAdvanced({ ...advanced, location: e.target.value })} required>
                                        {
                                            cities.map((item: any, index: number) => {
                                                return (
                                                    <option value={item.name} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-sm mb-3">
                                    <p>Price</p>
                                    <input type="text" className="form-control" placeholder="Price" value={advanced.price} onChange={(e) => setAdvanced({ ...advanced, price: e.target.value })} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm mb-3">
                                    <p>Currently Opened? <b className="text-danger">*</b></p>
                                    <select className="form-control" value={advanced.currenltyOpened} onChange={(e) => setAdvanced({ ...advanced, currenltyOpened: e.target.value })} required>
                                        <option value="yes">Yes</option>
                                        <option value="any">Any</option>
                                    </select>
                                </div>
                                <div className="col-sm mb-3">
                                    <p>Search nearest to you ? <b className="text-danger">*</b></p>
                                    <select className="form-control" value={advanced.nearest} onChange={(e) => setAdvanced({ ...advanced, nearest: e.target.value })} required>
                                        <option value="yes">Yes</option>
                                        <option value="any">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className={nomBtn}>Apply</button>

                    </Modal.Footer>
                </form>
            </Modal>
            <Modal size="lg" show={hide.showDetails}>
                <Modal.Header>
                    <h3>View</h3>
                    <button className="btn btn-transparent" onClick={() => setHide({ ...hide, showDetails: false })}><IonIcon color="danger" icon={closeCircleOutline} /></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex align-items-center ">
                        <div className="col-sm mb-3">
                            <img src={selected.image} className="img-fluid" />
                        </div>
                        <div className="col-sm">
                            <div>
                                <p className="pointer"><Link className="text-success" href={{ pathname: "/profile", query: { name: selected.userId } }}><IonIcon color="success" src={businessOutline} /><u>{selected.company}</u></Link></p>
                            </div>
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
                                    <p><IonIcon size="small" icon={location} /> {selected.serviceLocation}</p>
                                    <p><IonIcon size="small" icon={call} /> {selected.call}</p>
                                    <p className="d-flex align-items-center"><IonIcon size="small" icon={mail} />&nbsp; {selected.email}</p>
                                    {/* <p>{selected.company}</p> */}
                                </small>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal>
                <Modal.Header>
                    <h3>Review</h3>
                    <button className={transBtn}><IonIcon size="small" icon={closeCircleOutline} /></button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <h4>Reviews</h4>
                            <div style={{ height: "20vh" }}>
                                {
                                    selected.review?.map((item: any, index: number) => {
                                        return (
                                            <div key={index} className="d-flex">

                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <p>What do your rate them?</p>
                            <select className="form-control">
                                <option value={0}>0</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
            <div className="d-flex justify-content-center start-50 position-absolute text-center bottom-50" >
                <img src="https://voideawn.sirv.com/website/color.jpg " hidden={hideLoad} width="100" className="img-fluid text-success spinner-border" />
            </div>
        </div>
    )
}