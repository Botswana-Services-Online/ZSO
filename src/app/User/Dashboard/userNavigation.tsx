import { alignIcon } from "@/app/components/cssStyles"
import { Dropdown,DropdownButton } from "react-bootstrap"

export const UserNavigation=(id:string)=>{
    return(
        <Dropdown>
            <DropdownButton className="border-success" drop="down-centered" variant="transparent"  title={<img className="imgGreen" src="https://voideawn.sirv.com/website/ellipsis-horizontal-circle-outline.svg" width="30"/>}>

                <Dropdown.Item href="/User/Dashboard/"><img className="imgGreen" width="20" src="https://voideawn.sirv.com/website/person-circle-outline.svg" alt=""/>&nbsp;Profile </Dropdown.Item>
                <Dropdown.Item href="/User/Dashboard/Subscription"><img className="imgGreen"  width="20" src="https://voideawn.sirv.com/website/cash.svg" alt=""/>&nbsp;Subscription</Dropdown.Item>
                <Dropdown.Item href="/User/Dashboard/Security"><img className="imgGreen" width="20" src="https://voideawn.sirv.com/website/lock-closed.svg" alt=""/>&nbsp;Security</Dropdown.Item>
                <Dropdown.Item onClick={()=>{navigator.clipboard.writeText(`https://zimbabweservices.com/profile?name=${id}`);alert("Link copied!")}}><img className="imgGreen" width="20" src="https://voideawn.sirv.com/website/copy-outline.svg" alt=""/>&nbsp;Copy Profile Link</Dropdown.Item>
                <Dropdown.Item><img className="imgGreen" width="20" src="https://voideawn.sirv.com/website/cloud-download.svg" alt=""/>&nbsp;Get Profile Flier</Dropdown.Item>
            </DropdownButton>
        </Dropdown>
     
    )
}