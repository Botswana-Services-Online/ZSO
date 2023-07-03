"use client"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IonIcon } from '@ionic/react';
import { addCircleOutline, personCircleOutline } from "ionicons/icons"



export const NavBar = () => {
    return (
        <Navbar expand="lg" className="Bg p-2 position-fixed " fixed="top" >
            <Container fluid>
                <Navbar.Brand className='text-white' href="#">ZSO</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 text-white"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link className="text-white" href="#action1">Home</Nav.Link>
                        <Nav.Link className="text-white" href="#action1">Listings</Nav.Link>
                        <Nav.Link className="text-white" href="#action1">Pricing</Nav.Link>
                        <Nav.Link className="text-white" href="#action1">Blog</Nav.Link>
                        <Nav.Link className="text-white" href="#action1">Support</Nav.Link>
                    </Nav>
                    <div className="d-flex flex-row flex-wrap justify-content-evenly ">
                        <div>
                            <Button className="rounded-pill   border-light text-white  d-flex align-items-center me-2 bg-transparent" ><IonIcon color='light' icon={addCircleOutline} /><span>Add Listing</span></Button>
                        </div>
                        <div>
                            <Button className='rounded-pill  text-white  border-light d-flex align-items-center bg-transparent ' ><IonIcon color="light" icon={personCircleOutline} /><span>Sign in</span></Button>
                        </div>

                    </div>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export const FooterBar = () => {
    return (
        <div></div>
    )
}