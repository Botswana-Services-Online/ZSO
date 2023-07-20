import { useContext } from "react"
import { nomBtn } from "./cssStyles"
import { userData } from "./schemes"
import { updateUser } from "./updateInfo"
import { Authorized } from "./contexts"
import { storage } from "../api/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"

export default function ViewDocs(props: { doc: Array<string> }) {
    const { access } = useContext(Authorized)
    const updateTax = (document: any) => {
        const imageRef = ref(storage, `Tax/${v4()}`)
        uploadBytes(imageRef, document).then(res => {
            getDownloadURL(res.ref).then(url => {
                const newData = { ...access, Tax: url }
                updateUser(newData).then(user => {
                    window.location.reload()
                })
            })
        })

    }
    const updateDoc = (document: any) => {
        const imageRef = ref(storage, `Doc/${v4()}`)
        uploadBytes(imageRef, document).then(res => {
            getDownloadURL(res.ref).then(url => {
                const newData = { ...access, Cert: url }
                updateUser(newData).then(user => {
                    window.location.reload()
                })
            })
        })

    }
    
    return (
        <div className="container">
            <div className="row">
                {
                    props.doc[0]?.length > 0 ?
                        props.doc?.map((item: string, index: number) => {
                            console.log(index)
                            const checkUpdate=(data:any)=>{
                                if(index===0){
                                    updateDoc(data)
                                }else{
                                    updateTax(data)
                                }
                            }
                            return (
                                <div className="col-sm text-center" key={index}>
                                    <div>
                                        <embed src={item} type="application/pdf" />
                                    </div>
                                    <div>
                                        <a href={item} target="_blank"><button className=" btn  text-success btn-transparent"><u>View</u></button></a>
                                        <label htmlFor={`${index}`} className="text-success pointer">
                                            <input accept="application/pdf" id={`${index}`} type="file" onChange={(e:any)=>{
                                                checkUpdate(e.target.files[0])
                                            }} style={{ display: "none" }} />
                                            <u >Update</u>
                                        </label>

                                    </div>
                                </div>
                            )
                        })
                        : <p>No documents</p>
                }
            </div>

        </div>
    )
}