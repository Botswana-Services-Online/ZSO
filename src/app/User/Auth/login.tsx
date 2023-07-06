"use Client"
import { genBtn, genFrm,loading } from "@/app/components/cssStyles";
import { useState } from "react";
import { getAuth,sendEmailVerification,signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "next/navigation";
import { app } from "@/app/api/firebase"
import { Alert } from "react-bootstrap";
// import { loading } from "@/app/components/cssStyles";
export default function Login() {
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
                    console.log(auth.currentUser)
                    console.log(auth.currentUser)
                    // sendEmailVerification(auth.currentUser).then(res=>{
                    //     setTimeout(()=>router.push("/User/Auth/verify"),5000)
                    // }).catch(err=>{
                    //     setTimeout(()=>router.push("/User/Auth/verify"),5000)
                    // })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setHide(true)
                    setBtnTxt("Sign In")
                    // ..
                });
       
    }

    return (
        <div className="container rounded shadow-lg p-3 bg-white text-center  " style={{ width: "350px" }}>
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

                    <button type="submit" className={genBtn} style={{ width: "280px" }}  >{btnTxt}</button>
                    <div>

                    </div>

                </div>

            </form>
        </div>
    )
}