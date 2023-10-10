"use Client"
import { alignIcon, genBtn, genFrm,loading } from "@/app/components/cssStyles";
import { useContext, useState} from "react";
import { GoogleAuthProvider,setPersistence,browserLocalPersistence, getAuth,signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth"
import { app,auth, db } from "@/app/api/firebase"
import { Alert } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { Authorized } from "@/app/components/contexts";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
// import { loading } from "@/app/components/cssStyles";
export default function Login() {
    const route = useRouter()
    const {access,setAccess} = useContext(Authorized)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hide, setHide] = useState(false)
    const [btnTxt,setBtnTxt] = useState<any>("Sign In")

    // const checkPassword=()=>{

    // }

    const checkLoggedUser=(id:string)=>{
        getDoc(doc(db,"users",id)).then(res=>{
            if(res.exists()){
                setAccess(res.data())
                setAccess
                route.push("/User/Dashboard")
            }else{
                route.push("/User/Auth/onboarding")
            }
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit = (e: FormDataEvent) => {
        e.preventDefault()
       
            setBtnTxt(loading)
            setPersistence(auth,browserLocalPersistence).then(()=>{
           signInWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    if(res.user.emailVerified){
                      checkLoggedUser(res.user.uid)
                    }else{
                        sendEmailVerification(res.user).then(()=>{
                            route.push("/User/Auth/verify")
                        })
                    } 
                })
                .catch(() => {
                    setHide(true)
                    setBtnTxt("Sign In")
                    // ..
                });
            }).catch(err=>{
                console.log(err)
            })
       
    }

    const GoogleAuth=()=>{
        const provider = new GoogleAuthProvider();
        setPersistence(auth,browserLocalPersistence).then((res)=>{
            signInWithPopup(auth,provider).then(res=>{
                if(res.user.emailVerified){
                    checkLoggedUser(res.user.uid)
                }else{
                    sendEmailVerification(res.user).then(()=>{
                        route.push("/User/Auth/verify")
                    })
                }
            }).catch(err=>{
                setHide(false)
            })
        }).catch(err=>{
            console.log(err)
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