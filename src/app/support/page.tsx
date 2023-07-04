"use client"
import { useRef } from "react";
import { genBtn, genFrm, mp,vp } from "../components/cssStyles";
import emailjs from "@emailjs/browser"

export default function Support(){
    const form:any = useRef();
    const handleSubmit=(e:FormDataEvent)=>{
        e.preventDefault();
        emailjs.sendForm('service_4ndlw3e', 'template_pvzzwgd', form.current, '-YPZq3rY5rHdD3NNk')
        .then((result) => {
            console.log(result)
            console.log(result.text);
        }, (error) => {
            console.log(error)
            console.log(error.text);
        });
    }
    return(
        <div className={mp}>
            <div className="mb-5">&nbsp;</div>
            <div className="text-center container mb-5">
            <h1 className="mt-5 mb-3 ">Support</h1>
            <p className="mt-2">Get in touch with us!</p>
            <form ref={form} className="container">
            
                    <div className="row text-center mb-3">
                        <div className="col-sm">
                            <input type="text" className={genFrm} placeholder="Name" name="user_name"/>
                        </div>
                        <div className="col-sm">
                            <input type="tel" className={genFrm} placeholder="Phone Number" name="user_phone"/>
                        </div>
                        <div className="col-sm">
                            <input type="email" className={genFrm} placeholder="Email" name="user_email"/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <textarea name="message " placeholder="Your Message..." className="form-control shadow-lg rounded bg-white " rows={7}></textarea>
                    </div>
                    <div>
                        <button className={genBtn}>Send Message</button>
                    </div>
               </form>
          
            </div>
            
            
        </div>
    )
}