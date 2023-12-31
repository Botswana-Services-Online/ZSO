import { Modal } from "react-bootstrap";
import { userData } from "./schemes";
import { nomBtn, transBtn } from "./cssStyles";
import { closeCircleOutline, star } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import {doc,updateDoc} from "firebase/firestore";
import { db } from "../api/firebase";
import { useState } from "react";

const Review=(props:{close:{showReview:boolean,setShowReview:(c:boolean)=>void},data:userData})=>{
    const [reviewData,setReviewData]=useState({
        rating:0,
        message:""
    })

    const handleSubmit=(e:FormDataEvent)=>{
        e.preventDefault()
        //update doc reviews
        //update doc in firebase
        const updated = [{rating:reviewData.rating,message:reviewData.message}]
        props.data.reviews?.map((review:any)=>updated.push(review))
        updateDoc(doc(db,"users",props.data.id),{
            reviews:updated
        }).then(res=>{
            console.log(res)
            props.close.setShowReview(false)
        }).catch(err=>{
            console.log(err)
            props.close.setShowReview(false)
        })
    }
    return(
        <Modal size="lg" show={props.close.showReview}>
            <Modal.Header>
                <h3>Reviews</h3>
                <button className={transBtn} onClick={()=>props.close.setShowReview(false)}><IonIcon color="danger" icon={closeCircleOutline}/></button>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <form onSubmit={(e:any)=>handleSubmit(e)}>
                    <p><b>Leave a review</b></p>
                    <br />
                    <p>Rating</p>
                    <div className="input-group mb-3">
                    <select className=" form-control" required onChange={(e:any)=>setReviewData({...reviewData,rating:e.target.value})}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <span className="input-group-text"><IonIcon color="warning" size="small" icon={star}/></span>
                    </div>
                    
                   
                    <textarea required className="form-control mb-3" placeholder="Review....."  onChange={(e)=>setReviewData({...reviewData,message:e.target.value})}></textarea>
                    <button type="submit" className={nomBtn}>Submit</button>
                    </form>
                </div>
                <div className="d-block overflow-auto  mt-2" style={{height:"20vh"}}>
                    {
                        // map through reviews
                        props.data.reviews?.map((review:any,index:number)=>{
                            return(
                                <div key={index} className="shadow rounded p-2 m-2 mb-3">
                                    <p>{review.message}</p>
                                    <p>{review.rating} <IonIcon color="warning" icon={star}/></p>
                                </div>
                            )
                        })
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Review;