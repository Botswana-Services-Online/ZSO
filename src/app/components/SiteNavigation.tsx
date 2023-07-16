"use client"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, callOutline, locationOutline, mailOutline, personCircleOutline } from "ionicons/icons"
import { alignIcon } from './cssStyles';
import { useRouter } from 'next/navigation';
import { checkAcc } from './checkAcc';
import { useLayoutEffect,useState,useContext } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../api/firebase';
import { Dropdown } from 'react-bootstrap';
import { Authorized } from './contexts';
import Link from 'next/link';


export const NavBar = () => {
    const {access,setAccess} =useContext(Authorized)
    const route =  useRouter();
    const authUser = getAuth(app)
    const [imgFile,setImgFile] = useState<any>("")
    const [hide,setHide]=useState({
        hideReg:false,
        hideHas:true
    })
    
    useLayoutEffect(()=>{
        console.log(access)
       if(access.log){
        let data = authUser.currentUser
        setImgFile(data?.photoURL)
        console.log(data?.photoURL)
        setHide({...hide,hideReg:true,hideHas:false})  
        }else{
            setHide({...hide,hideReg:false,hideHas:true})
        }
    },[access])
    
    const logout=()=>{
        authUser.signOut().then(res=>{
            route.push("/")
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <Navbar data-bs-theme="dark" expand="lg" className="Bg p-2 position-fixed " fixed="top" >
            <Container fluid>
                <Navbar.Brand className='text-white' href="#">ZSO</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll text-white bg-light" color='light'/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 text-white"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className="text-decoration-none text-white m-2" href="/">Home</Link>
                        <Link href="/listings" className="text-decoration-none text-white m-2">Listings</Link>
                        <Link className="text-decoration-none text-white m-2" href="/pricing">Pricing</Link>
                        <Link className="text-decoration-none text-white m-2" href="/support">Blog</Link>
                        <Link className="text-decoration-none text-white m-2" href="/support">Support</Link>
                    </Nav>
                    <div className="d-flex flex-row flex-wrap justify-content-evenly ">
                        <div>
                          <Button onClick={()=>{localStorage.setItem("log","0"); route.push("/User/Auth/")}} className="rounded-pill   border-light text-white  d-flex align-items-center me-2 bg-transparent" ><IonIcon color='light' icon={addCircleOutline} /><span>Add Listing</span></Button>
                        </div>
                        <div hidden={hide.hideReg}>
                            <Button onClick={()=>{localStorage.setItem("log","1"); route.push("/User/Auth/")}} className='rounded-pill  text-white  border-light d-flex align-items-center bg-transparent ' ><IonIcon color="light" icon={personCircleOutline} /><span>Sign in</span></Button>
                        </div>
                        <div  hidden={hide.hideHas} className='me-5'>
                        <Dropdown className='container'>
                            <Dropdown.Toggle  className={`bg-transparent border-0 d-flex p-0 ${alignIcon}`}>
                            <img className="rounded-pill mt-1" src={imgFile} width={30} alt="user " onClick={()=>{localStorage.setItem("log","1"); }}/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className='Bg '>
                                <Dropdown.Item  className='text-white' onClick={()=>route.push("/User/Dashboard/")}>Dashboard</Dropdown.Item>
                                <Dropdown.Item  className='text-white' onClick={()=>logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export const FooterBar = () => {
    return (
       <footer className="Bg text-center text-white   d-flex  flex-wrap  justify-content-center p-3">
        <div className="row container ">
            <div className="col-sm text-center">
                <p><b>Support</b></p>
                <br/>
                <p className={alignIcon}><IonIcon icon={mailOutline}/>&nbsp;<a href="mailto:" className='text-white text-decoration-none '>support@zimservicesonline.co.zw</a></p>
                <p className={alignIcon}><IonIcon icon={callOutline}/>&nbsp;<a href="tel:" className='text-white text-decoration-none '>+263 78 898 4320</a></p>
               <p className={alignIcon}><IonIcon icon={locationOutline}/>&nbsp;Plot 22211 Phase 4 Gaborone</p>
                
            </div>
            <div className="col-sm">
                <p><b>Socials</b></p>
                <br />
                <p><a href="" className='text-white text-decoration-none ' target="_blank">Facebook</a></p>
                <p><a href="" className='text-white text-decoration-none' target="_blank">Instagram</a></p>
                <p><a href="" className='text-white text-decoration-none' target="_blank">LinkedIn</a></p>
                <p><a href="" className='text-white text-decoration-none' target="_blank">Whatsapp</a></p>
               <br/>
               <p>Love the site visit <a className='text-white' target="_blank" href='https://aurorasystems.co.zw'>Aurora</a></p>
            </div>
            <div className="col-sm">
                <p><b>© {new Date().getFullYear()} Zimbabwe Services Online</b></p>
                <br/>
                <p>Privacy and Security</p>
                <p>Terms and Conditions</p>
            </div>
        </div>
       </footer>
    )
}