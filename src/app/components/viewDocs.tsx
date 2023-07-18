import { nomBtn } from "./cssStyles"

export default function ViewDocs(props: { doc: Array<string> }) {
  
    return (
        <div className="container">
            <div className="row">
                {
                    props.doc[0]?.length > 0 ?
                        props.doc?.map((item: string, index: number) => {
                            return (
                                <div className="col-sm text-center" key={index}>
                                    <div>
                                    <embed src={item} type="application/pdf" />
                                    </div>
                                    <div>
                                    <a href={item} target="_blank"><button className=" btn fw-bold text-success btn-transparent"><u>View</u></button></a>
                                    <a href={item} target="_blank"><button className=" btn fw-bold text-success btn-transparent"><u>Update</u></button></a>
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