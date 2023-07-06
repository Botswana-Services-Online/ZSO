"use Client"
import { genBtn, genFrm } from "@/app/components/cssStyles";
import { useState } from "react";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import {app} from "@/app/api/firebase"
export default function Signup(){
    const auth = getAuth(app)
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [repeatPassword,setRepeatPassword] = useState("")
    const [disableBtn,setDisableBtn]=useState(true)

    const checkPassword=()=>{
        if(password===repeatPassword){
            setDisableBtn(false)
        }else{
            setDisableBtn(true)
        }
    }

    const handleSubmit=(e:FormDataEvent)=>{
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return(
        <div className="container rounded shadow-lg p-3 bg-white text-center  " style={{width:"350px"}}>
            <h1>Sign Up</h1>
            <form onSubmit={(e:any)=>handleSubmit(e)} >
                <div className="row  d-flex  justify-content-center ">
               <div>
                
               </div>
                    <input type="email"  className={`${genFrm} `} style={{width:"280px"}} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
               
                    <input type="password" className={genFrm} style={{width:"280px"}} placeholder="Password"  min={6} onChange={(e)=>setPassword(e.target.value)} required/>
                
                    <input type="password" className={genFrm} style={{width:"280px"}} placeholder="Repeat Password"  min={6} onChange={(e)=>setRepeatPassword(e.target.value)} required/>
                    <br/>
                    <div className="m-3">
                    <input type="checkbox" value="true" className="form-check-input me-1 mb-3" required/><span>By signing up you agree to our <a>Terms and Conditions </a></span>
                    </div>
                   
                
                    <button type="submit" className={genBtn} style={{width:"280px"}} >Sign Up</button>
                    <div>

                    </div>
              
                </div>
               
            </form>
        </div>
    )
}