"use client"
import { close, filterOutline, searchOutline } from "ionicons/icons";
import { alignIcon,  mp, nomBtn, vp } from "../components/cssStyles";
import { IonIcon } from "@ionic/react";
import { Modal } from "react-bootstrap";
import { cities,categories } from "../components/categories";
import { useEffect, useState } from "react";
import { listingsData } from "../components/schemes";
import { collection, query, getDocs, limit, startAfter } from "firebase/firestore";
import { db } from "../api/firebase";
export default function Listings(){
    const [searchName,setSearchName] = useState<string>("")
    const [searchCategory,setSearchCategory] = useState<string>("")
    const [searchLocation,setSearchLocation] = useState<string>("")
    const [searchPrice,setSearchPrice] = useState<string>("")
    const [hide,setHide] = useState({
        showFilterOptions: false,
    })
    const [data,setData] = useState<Array<listingsData>>([])

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

    return(
        <div className={mp}>
            <div className=" d-flex justify-content-center p-3 mt-2 mb-3 position-fixed w-100  text-center bg-light z-1">
                <div className="input-group">
                    <input className="form-control rounded-pill me-2" placeholder="Looking for?" value={searchName} onChange={(e)=>setSearchName(e.target.value)}/>
                    <button className={`${alignIcon} btn btn-outline-success rounded-pill me-1 btnHover`}  onClick={()=>setHide({...hide,showFilterOptions:true})}><IonIcon icon={filterOutline}/></button>
                    <button className={`${alignIcon} btn btn-outline-success rounded-pill btnHover`}><IonIcon icon={searchOutline}/></button>
                </div>
                
               
            </div>
            <div className={vp}>
              <div className="row  ">
                {data?.map((item:listingsData,index:number)=>{
                    return(
                        <div className="col-sm " key={index}>
                            <div className="card" style={{width:"18rem", height:"30rem"}}>
                                <img src={item.image} className="card-img-top" height="50%" alt=""/>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between ">
                                    <h5 className="card-title">{item.name}</h5>
                                    <h5 className="specialText">{item.price}</h5>
                                    </div>
                                    <p>
                                        {item.description}
                                    </p>
                                    <p><small>{item.serviceLocation}</small></p>
                                </div>
                                <div className="card-footer">
                                <a href="" >View</a>

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
                    <button className={`${alignIcon} btn btn-outline-danger rounded-pill`}  onClick={()=>setHide({...hide,showFilterOptions:false})}><IonIcon icon={close}/></button>
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
        </div>
    )
}