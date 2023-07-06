"use Client"
import { genBtn, genFrm } from "@/app/components/cssStyles";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth"
import { useRouter } from "next/navigation";
import { app } from "@/app/api/firebase"
import { Alert } from "react-bootstrap";
import { loading } from "@/app/components/cssStyles";
export default function Signup() {
    const router = useRouter()
    const auth:any = getAuth(app)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("")
    const [disableBtn, setDisableBtn] = useState(true)
    const [warn, setWarn] = useState(true)
    const [hide, setHide] = useState(false)

    // const checkPassword=()=>{

    // }

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault()
        if (password === repeatPassword) {
            setWarn(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log(auth.currentUser)
                    sendEmailVerification(auth.currentUser).then(res=>{
                        setTimeout(()=>router.push("/User/Auth/verify"),5000)
                    }).catch(err=>{
                        setHide(true)
                    })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setHide(true)
                    // ..
                });
        } else {


            setWarn(false)

        }
    }

    return (
        <div className="container rounded shadow-lg p-3 bg-white text-center  " style={{ width: "350px" }}>
            <h1>Sign Up</h1>
            <form onSubmit={(e: any) => handleSubmit(e)} >
                <div className="row  d-flex  justify-content-center ">
                    <div>
                        <Alert variant="danger" show={hide}>
                            Failed to Sign up 😥, try again!
                        </Alert>
                    </div>
                    <input type="email" className={`${genFrm} `} style={{ width: "280px" }} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>

                    <input type="password" className={genFrm} style={{ width: "280px" }} placeholder="Password" min={6} onChange={(e) => setPassword(e.target.value)} required />

                    <input type="password" className={genFrm} style={{ width: "280px" }} placeholder="Repeat Password" min={6} onChange={(e) => { setRepeatPassword(e.target.value); }} required />

                    <p className="m-1 text-danger" hidden={warn}>Password does not match with repeated one!</p>
                    <br />
                    <div className="m-3">
                        <input type="checkbox" value="true" className="form-check-input me-1 mb-3" required /><span>By signing up you agree to our <a>Terms and Conditions </a></span>
                    </div>


                    <button type="submit" className={genBtn} style={{ width: "280px" }}  >Sign Up</button>
                    <div>

                    </div>

                </div>

            </form>
        </div>
    )
}