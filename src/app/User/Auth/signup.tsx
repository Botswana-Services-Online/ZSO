"use Client"
import { genBtn, genFrm } from "@/app/components/cssStyles";
import { useState } from "react";
export default function Signup(){
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
    }

    return(
        <div className="container rounded shadow-lg p-3 bg-white text-center  " >
            <h1>Sign Up</h1>
            <form onSubmit={(e:any)=>handleSubmit(e)} >
                <div className="row container d-flex fl justify-content-center ">
               <div>
                
               </div>
                    <input type="email"  className={`${genFrm} `} style={{width:"280px"}} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
               
                    <input type="password" className={genFrm} style={{width:"280px"}} placeholder="Password"  min={6} onChange={(e)=>setPassword(e.target.value)}/>
                
                    <input type="password" className={genFrm} style={{width:"280px"}} placeholder="Repeat Password"  min={6} onChange={(e)=>setRepeatPassword(e.target.value)}/>
                    <br/>
                    <div>
                    <input type="checkbox" value="true" className="form-check-input me-1 mb-3" required/><span>By signing up you agree to our <a>Terms and Conditions </a></span>
                    </div>
                   
                
                    <button className={genBtn} style={{width:"280px"}} disabled={disableBtn}>Sign Up</button>
              
                </div>
               
            </form>
        </div>
    )
}