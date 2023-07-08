"use Client"
import { alignIcon, genBtn, genFrm,loading } from "@/app/components/cssStyles";
import { useState,useContext } from "react";
import { GoogleAuthProvider, getAuth,sendEmailVerification,signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation";
import { app } from "@/app/api/firebase"
import { Alert } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { Authorized } from "@/app/components/contexts";
// import { loading } from "@/app/components/cssStyles";
export default function Login() {
    const {access,setAccess} = useContext(Authorized)
    const router = useRouter()
    const auth:any = getAuth(app)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [disableBtn, setDisableBtn] = useState(true)
    const [warn, setWarn] = useState(true)
    const [hide, setHide] = useState(false)
    const [btnTxt,setBtnTxt] = useState<any>("Sign In")

    // const checkPassword=()=>{

    // }

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault()
       
            setBtnTxt(loading)
            setWarn(true)
           signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                
                    setTimeout(()=>router.push("/User/Dashboard/"),5000)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setHide(true)
                    setBtnTxt("Sign In")
                    // ..
                });
       
    }

    const GoogleAuth=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider).then(res=>{
            setAccess(true)
            setTimeout(()=>router.push("/User/Dashboard"),2000)
        }).catch(err=>{
            setAccess(false)
            setWarn(false)
        })
    }

    return (
        <div className="container rounded shadow-lg p-3 bg-white text-center  " style={{ width: "350px", minHeight:"60vh" }}>
            <h1>Sign In</h1>
            <form onSubmit={(e: any) => handleSubmit(e)} autoComplete="none">
                <div className="row  d-flex  justify-content-center ">
                    <div>
                        <Alert variant="danger" show={hide}>
                            Failed to login, Make sure you entered the correct details!
                        </Alert>
                    </div>
                    <input type="email" className={`${genFrm} `} style={{ width: "280px" }} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="password" className={genFrm} style={{ width: "280px" }} placeholder="Password" min={6} onChange={(e) => setPassword(e.target.value)} required />

                    <button type="submit" className={`${genBtn} mt-3`} style={{ width: "280px" }}  >{btnTxt}</button>
                        <div className="container d-flex justify-content-center m-2">
                        <button onClick={()=>GoogleAuth()} className={` btn rounded-pill m-3 p-2 btn-primary ${alignIcon} `}><IonIcon icon={logoGoogle}/></button>
                        </div>
                    

                </div>

            </form>
        </div>
    )
}