import { useState } from "react"
import { reauthenticateWithCredential,getAuth,updatePassword,EmailAuthCredential, EmailAuthProvider } from "firebase/auth"
import { app } from "@/app/api/firebase"
import { logout } from "@/app/components/logout"
import { JsxElement } from "typescript"
import { loading } from "@/app/components/cssStyles"
export const Security=()=>{
    const user:any = getAuth(app).currentUser
    const [currentPassword,setCurrentPassword] = useState<string>("")
    const [newPassword,setNewPassword] = useState<string>("")
    const [repeatPassword,setRepeatPassword] = useState<string>("")
    const [warn,setWarn] = useState({
        message:"",
        hide:true
    })
    const [btn,setBtn] = useState<any>("Update")

    const handleSubmit=(e:FormDataEvent)=>{
        e.preventDefault();
        setBtn(loading)
        const credentials = EmailAuthProvider.credential(user.email,currentPassword)
        if(newPassword===repeatPassword){
            reauthenticateWithCredential(user,credentials).then(res=>{
                updatePassword(user,newPassword).then(res=>{
                    logout();
                }).catch(err=>{
                    setBtn("Update")
                    setWarn({...warn,message:"Its not you its us, please try again!!",hide:false})
                })
            }).catch(err=>{
                setBtn("Update")
                setWarn({...warn,message:"Its not you its us, please try again!",hide:false})
            })
        }else{
            setBtn("Update")
            setWarn({...warn,message:"new pasword and the repeated password do not match",hide:false})
        }
    }

    return(
        <div >
            <h3>Security</h3>
            <div className="rounded shadow-lg">
                <p>Change your password</p>
                <form onSubmit={(e:any)=>handleSubmit(e)}>
                    <div className="alert alert-danger " hidden={warn.hide}>
                        <p>{warn.message}</p>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e)=>setCurrentPassword(e.target.value)} required min={6}/>
                        </div>
                        <div className="col-sm">
                            <input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} required min={6}/>
                        </div>
                        <div className="col-sm">
                            <input type="password" placeholder="Repeat New Password" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} required min={6}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-outline-success ">{btn}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}