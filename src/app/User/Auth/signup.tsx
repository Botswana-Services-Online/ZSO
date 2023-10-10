"use Client"
import { alignIcon, genBtn, genFrm,loading } from "@/app/components/cssStyles";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification,signInWithPopup,GoogleAuthProvider } from "firebase/auth"
import { useRouter } from "next/navigation";
import { app } from "@/app/api/firebase"
import { Alert } from "react-bootstrap";
import {  logoGoogle } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
// import { loading } from "@/app/components/cssStyles";
export default function Signup() {
    const router = useRouter()
    const auth:any = getAuth(app)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [warn, setWarn] = useState(true)
    const [hide, setHide] = useState(false)
    const [btnTxt,setBtnTxt] = useState<any>("Sign Up")

    // const checkPassword=()=>{

    // }

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault()
        if (password === repeatPassword) {
            setBtnTxt(loading)
            setWarn(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(auth.currentUser)
                    sendEmailVerification(auth.currentUser).then(res=>{
                        setTimeout(()=>router.push("/User/Auth/verify"),5000)
                    }).catch(err=>{
                        setTimeout(()=>router.push("/User/Auth/verify"),5000)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setHide(true)
                    setBtnTxt("Sign Up")
                    // ..
                });
        } else {
            setWarn(false)
        }
    }

    const GoogleAuth=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(res=>{
            setTimeout(()=>router.push("/User/Auth/onboarding"),2000)
        }).catch(err=>{
            setWarn(false)
        })
    }


    return (
        <div className="container rounded shadow-lg p-3 bg-white text-center  " style={{ width: "350px" }}>
            <h1>Sign Up</h1>
            <form onSubmit={(e: any) => handleSubmit(e)} autoComplete="none">
                <div className="row  d-flex  justify-content-center ">
                    <div>
                        <Alert variant="danger" show={hide}>
                            Failed to Sign up 😥, try again!
                        </Alert>
                    </div>
                    <input type="email" className={`${genFrm} `} style={{ width: "280px" }} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="password" className={genFrm} style={{ width: "280px" }} placeholder="Password" min={6} onChange={(e) => setPassword(e.target.value)} required />

                    <input type="password" className={genFrm} style={{ width: "280px" }} placeholder="Repeat Password" min={6} onChange={(e) => { setRepeatPassword(e.target.value); }} required />

                    <small className="m-1 text-danger" hidden={warn}>Password does not match with repeated one!</small>
                    <br />
                    <div className="m-3">
                        <input type="checkbox" value="true" className="form-check-input me-1 mb-3" required /><span><small>By signing up you agree to our <a href="https://zimbabweservices.com/legal">Terms and Conditions </a></small></span>
                    </div>


                    <button type="submit" className={genBtn} style={{ width: "280px" }}  >{btnTxt}</button>
                    <div className=" p-2 text-center d-flex justify-content-center ">
                        <div>
                        <button onClick={()=>GoogleAuth()} className={`btn btn-primary m-1 p-2 rounded-pill  ${alignIcon}`}><IonIcon icon={logoGoogle}/></button>

                        </div>
                        {/* <div>
                        <button onClick={()=>FacebookAuth()} className={`btn btn-primary rounded-pill m-1 p-2 ${alignIcon}`}><IonIcon icon={logoFacebook}/></button>

                        </div> */}
                    </div>

                </div>

            </form>
        </div>
    )
}