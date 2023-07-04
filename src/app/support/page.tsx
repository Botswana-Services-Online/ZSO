"use client"
import { useRef,useState,useEffect } from "react";
import { genBtn, genFrm, mp,vp } from "../components/cssStyles";
import emailjs from "@emailjs/browser"
import { IonAlert } from "@ionic/react";
import { Alert } from "react-bootstrap";

export default function Support(){
    const [message,setMessage]=useState<string>("Saved")
    const [hide,setHide]=useState<boolean>(false)

    useEffect(() => {
        localStorage.getItem("james") === '1';
    }, [])
    const form:any = useRef();
    const handleSubmit=(e:FormDataEvent)=>{
        e.preventDefault();
        emailjs.sendForm('service_4ndlw3e', 'template_pvzzwgd', form.current, '-YPZq3rY5rHdD3NNk')
        .then((result) => {
            setMessage("We received your message!")
            setHide(true)
        }, (error) => {
            setMessage("Failed to send your message, please contact us on whatsapp or via our email!")
            setHide(true)
        });
    }
    return(
        <div className={mp}  suppressHydrationWarning>
            <div className="mb-5">&nbsp;</div>
            <div className="text-center container mb-5">
            <h1 className="mt-5 mb-3 ">Support</h1>
            <p className="mt-2">Get in touch with us!</p>
            <form ref={form} className="container" onSubmit={(e:any)=>handleSubmit(e)}>
            
                    <div className="row text-center mb-3">
                        <div className="col-sm">
                            <input type="text" required className={genFrm} placeholder="Name" name="user_name"/>
                        </div>
                        <div className="col-sm">
                            <input type="tel" required className={genFrm} placeholder="Phone Number" name="user_phone"/>
                        </div>
                        <div className="col-sm">
                            <input type="email" required className={genFrm} placeholder="Email" name="user_email"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <textarea name="message" required placeholder="Your Message..." className="form-control shadow-lg rounded bg-white " rows={7}></textarea>
                    </div>
                    <div>
                        <button type="submit" className={genBtn}>Send Message</button>
                    </div>
               </form>
          
            </div>
            <Alert className="container" variant="success" show={hide} onClose={()=>setHide(false)}  dismissible>
                {message}
            </Alert>
           
        </div>
    )
}