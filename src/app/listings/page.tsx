"use client"
import { call,  checkmarkDoneCircleOutline,  closeCircleOutline, filterOutline, location, logoWhatsapp, mail,  searchOutline, star } from "ionicons/icons";
import { alignIcon,  mp, nomBtn, transBtn, vp } from "../components/cssStyles";
import { IonIcon } from "@ionic/react";
import { Modal } from "react-bootstrap";
import { cities,categories } from "../components/categories";
import { useEffect, useState } from "react";
import { listingsData, listingsDataDefault } from "../components/schemes";
import { collection, query, getDocs, limit, startAfter } from "firebase/firestore";
import { db } from "../api/firebase";
export default function Listings(){
    const [searchName,setSearchName] = useState<string>("")
    const [searchCategory,setSearchCategory] = useState<string>("")
    const [searchLocation,setSearchLocation] = useState<string>("")
    const [searchPrice,setSearchPrice] = useState<string>("")
    const [hide,setHide] = useState({
        showFilterOptions: false,
        showDetails:false
    })
    const [data,setData] = useState<Array<listingsData>>([])
    const [selected,setSelected] = useState<listingsData>(listingsDataDefault)

    let lastVisible:any = null;
    let hasMore = true;
    
    // Function to retrieve data from Firestore with a limit of 20 documents at a time
    async function getData() {
      // Get a reference to the collection
      const colRef = collection(db, "listings");
    
      // Create a query with a limit of 20 documents
      let q = query(colRef, limit(20));
    
      // If there is a last retrieved document, start the query after that document
      if (lastVisible) {
        q = query(colRef, startAfter(lastVisible), limit(20));
      }
    
      // Execute the query and get the results
      const querySnapshot = await getDocs(q);
    
      // Check if there are more documents to retrieve
      hasMore = !querySnapshot.empty;
    
      // If there are more documents, update the last retrieved document
      if (hasMore) {
        lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log(lastVisible);
      }
    
      // Return the retrieved data
      let gotData:any = []
      querySnapshot.docs.map(doc =>gotData.push(doc.data()));
      setData([...gotData])
      return gotData
    }


    useEffect(()=>{
        getData()
    },[])

    const handleSearch=(e:FormDataEvent)=>{
        e.preventDefault()
        const q = query(collection(db,""))
    }

    return(
        <div className={mp}>
             <form onSubmit={(e:any)=>handleSearch(e)}>
            <div className=" d-flex justify-content-center p-3 mt-2 mb-3 position-fixed w-100  text-center bg-light z-1">
                  
                <div className="input-group">
                    <input className="form-control rounded-pill me-2" placeholder="Looking for?" value={searchName} onChange={(e)=>setSearchName(e.target.value)} required/>
                    <button type="button" className={`${alignIcon} btn btn-outline-success rounded-pill me-1 btnHover`}  onClick={()=>setHide({...hide,showFilterOptions:true})}><IonIcon icon={filterOutline}/></button>
                    <button type="submit" className={`${alignIcon} btn btn-outline-success rounded-pill btnHover`}><IonIcon icon={searchOutline}/></button>
                </div>
                
                
               
            </div>
              </form>
            <div className={vp}>
              <div className="row d-flex">
                {data?.map((item:listingsData,index:number)=>{
                    return(
                        <div className="col-sm  mb-3 w-100 d-flex  justify-content-center" key={index}>
                            <div className="card" style={{width:"18rem", height:"40rem"}} >
                                <img src={item.image} className="card-img-top img-thumbnail h-50"   alt=""/>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between ">
                                    {item.review?.map((item:any,index:number)=>{
                                       if(item.length===0){
                                        return(
                                            <p>< IonIcon color="medium" size="small" icon={star}/></p>
                                        )
                                       }else{

                                       }
                                    })}
                                    <IonIcon color="medium" icon={checkmarkDoneCircleOutline}/>
                                    </div>
                                    <div className="d-flex justify-content-between ">
                                    
                                    
                                    <h6 className="card-title">{item.name}</h6>
                                    <h6 className="specialText">$ {item.price}</h6>
                                    </div>
                                    <p className=" text-truncate">
                                    <small >{item.description}</small>
                                    </p>
                                       
                                    
                                    <p className=""><small><IonIcon size="small" icon={location}/> {item.serviceLocation}</small></p>
                                    <p ><IonIcon  size="small" src={call}/><small> {item.call}</small></p>
                                    <p className="d-flex align-items-center"><IonIcon size="small" icon={mail}/><small>&nbsp; {item.email}</small></p>
                                </div>
                                <div className="card-footer d-flex justify-content-between ">
                                    <button onClick={()=>{setSelected(item);setHide({...hide,showDetails:true})}} className="btn  btn-transparent text-success">View</button>
                                    <a target="_blank" href={`https://wa.me/${item.call.split(" ").join("")}?text=Good day,can i get more details about ${item.name}. I saw the post on Zimbabwe Services Online!`}><button className="btn  btn-transparent"><IonIcon color="success" icon={logoWhatsapp}/></button></a>
                                </div>
                              
                               
                            </div>
                        </div>
                    )
                })}
              </div>
            </div>
            <Modal show={hide.showFilterOptions} size="lg">
                <Modal.Header>
                    <h3>Filter Options</h3>
                    <button className={`${alignIcon} btn btn-transparent rounded-pill`}  onClick={()=>setHide({...hide,showFilterOptions:false})}><IonIcon color="danger" icon={closeCircleOutline}/></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-sm">
                          <p>Category</p>
                            <select className="form-control" value={searchCategory} onChange={(e)=>setSearchCategory(e.target.value)}>
                                {
                                    categories.map((item:any,index:number)=>{
                                        return(
                                            <option value={item.name} key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm">
                        <p>Location</p>
                            <select className="form-control" value={searchLocation} onChange={(e)=>setSearchLocation(e.target.value)}>
                                {
                                    cities.map((item:any,index:number)=>{
                                        return(
                                            <option value={item.name} key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm">
                            <p>Price</p>
                            <input type="text" className="form-control" placeholder="Price" value={searchPrice} onChange={(e)=>setSearchPrice(e.target.value)} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className={nomBtn}>Apply</button>
                </Modal.Footer>
            </Modal>
            <Modal size="lg" show={hide.showDetails}>
                <Modal.Header>
                    <h3>View</h3>
                    <button className="btn btn-transparent" onClick={()=>setHide({...hide,showDetails:false})}><IonIcon color="danger" icon={closeCircleOutline}/></button>
                    </Modal.Header>
                <Modal.Body>
                    <div className="row d-flex align-items-center ">
                        <div className="col-sm">
                                <img src={selected.image} className="img-fluid" />
                        </div>
                        <div className="col-sm">
                                <div className="row">
                                    <div className="col-sm">
                                        <p><b>Details</b></p>
                                        <p>{selected.name}</p>
                                    </div>
                                    <div className="col-sm">
                                        <p>${selected.price}</p>
                                    </div>
                            
                                    
                                </div>
                                <div>
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
                                    <button className={transBtn}><u>Leave a review</u></button>
                                </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal>
                <Modal.Header>
                                <h3>Review</h3>
                                <button className={transBtn}><IonIcon size="small" icon={closeCircleOutline}/></button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <h4>Reviews</h4>
                            <div style={{height:"20vh"}}>
                            {
                                selected.review?.map((item:any,index:number)=>{
                                    return(
                                        <div className="d-flex">
                                            
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
        </div>
    )
}