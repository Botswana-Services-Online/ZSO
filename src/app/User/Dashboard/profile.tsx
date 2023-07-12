"use client"
import { genFrm, nomBtn, vp } from "@/app/components/cssStyles"
import { collection,getDocs,limit,query,where } from "firebase/firestore"
import { app, db } from "@/app/api/firebase"
import { getAuth } from "firebase/auth"
import { userData } from "@/app/components/schemes"
import { useState,useEffect } from "react"
import ViewDocs from "@/app/components/viewDocs"


 const Profile=()=>{
    const [data,setData] = useState<userData>({
        name:"",
        address:"",
        phone:"",
        email:"",
        Tax:"",
        Cert:"",
        numEmployees:0,
        description:""
    })
        
    const getUserData=()=>{
        const userEmail:any = getAuth(app).currentUser?.email
        const userRef = collection(db,"users")
        const q = query(userRef,where("email","==",`${userEmail}`),limit(1))
        getDocs(q).then((res:any)=>{
            setData(res.docs[0].data())
            console.log(res.docs[0].data())
        }).catch((err=>{

        }))
    }

    useEffect(()=>{
        getUserData()
    },[])
    return(
        <div className="container">
            <div>

            </div>
            <div className="mb-3">
                <div>
                <h3>
                    Description
                </h3>
                <div>
                    <div className="mb-3">
                    <textarea className="form-control" value={data.description}>

</textarea>
                    </div>
                    <div className="mb-3">
                    <button className={nomBtn}>Save</button>
                    </div>
                   
                </div>
                </div>
                <div className="mb-3">
                   <h3>General Details</h3>
                   <div className="row">
                        <div className="col-sm mb-3  ">
                            <p className="m-2">Email</p>
                            <input type="text" className={genFrm} size={50} value={data.email}/>
                        </div>
                        <div className="col-sm mb-3 ">
                        <p className="m-2">Phone Number</p>
                            <input type="text" className={genFrm} value={data.phone}/>
                        </div>
                        <div className="col-sm mb-3">
                        <p className="m-2">Address</p>
                            <input type="text" className={genFrm} value={data.address}/>
                        </div>
                   </div>
                </div>
                <div className="mb-3 ">
                    <h3>Company Documents</h3>
                    <div className="d-flex justify-content-center ">
                         <ViewDocs doc={[data.Cert,data.Tax]}/>
                    </div>
                </div>
                <div>
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