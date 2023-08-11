"use client"
import { Card } from "react-bootstrap";
import { genBtn, mp, vp } from "../components/cssStyles";
import {Fade} from "react-awesome-reveal"
export default function Pricing(){
    return(
        <div className={mp}>
            <div className="mt-5">.</div>
            <h1 className="text-center mt-5">Pricing</h1>
            <div className={vp}>
                <div className="row container ">
                    <div className="col-sm mb-4">
                        <Fade >
                        <Card className="shadow-lg rounded">
                            <Card.Img className="Sirv " width={300} src="https://voideawn.sirv.com/website/price_one.jpg"/>
                              
                            <Card.Header className="Bg text-white">
                                <h3 className="text-center">Free</h3>
                            </Card.Header>
                            <Card.Body>
                                <Fade cascade={true} className="container text-center">
                            <ul>
                                    <li>1 Listing</li>
                                    <li>Featured</li>
                                    <li>Monthly Ad Push</li>
                                    <li>No verification badge</li>
                                    <li>Valid for 30 days</li>
                                    <li>Basic Email Support</li>
                                </ul>
                                <h1 className="text-center">$0</h1>
                            <button className={genBtn}>Register for Free</button>
                            </Fade>
                            </Card.Body>
                           
                        </Card>
                        </Fade>
                         
                          
                    </div>
                    <div className="col-sm mb-4">
                        <Fade>
                    <Card className="shadow-lg rounded">
                            <Card.Img className="Sirv"  width={300} src="https://voideawn.sirv.com/website/price_two.jpg"/>
                              
                            <Card.Header className="Bg text-white  ">

                                <h3 className="text-center ">Standard</h3>
                
                            </Card.Header>
                            <Card.Body>
                                <Fade cascade={true} className="container text-center">

                                
                            <ul >
                                    <li >10 Listings</li>
                                    <li>Featured on Facebook</li>
                                    <li>Weekly Ad push</li>
                                    <li>Verified badge</li>
                                    <li>Valid for 30 days</li>
                                    <li>24/7  Email Support</li>
                                </ul>
                                <h1 className="text-center">
                                    $5
                                </h1>
                            <button className={genBtn}>1 Week Free trial</button>

                            </Fade>
                            </Card.Body>
                        
                        </Card>
                        </Fade>
                    </div>
                    <div className="col-sm mb-4">
                        <Fade>

                       
                    <Card className="rounded shadow-lg ">
                            <Card.Img className="Sirv"   src="https://voideawn.sirv.com/website/price.jpg"/>
                            <Card.Header className="Bg">
                                <h3 className="text-center text-white" >Premium</h3>
                            </Card.Header>
                            <Card.Body>
                                <Fade cascade={true} className="container text-center">
                                <ul>
                                    <li>Unlimited Listings</li>
                                    <li>Featured on all social platforms</li>
                                    <li>Daily Ad push</li>
                                    <li>Verified Premium badge</li>
                                    <li>Valid for 1 year</li>
                                    <li>24/7 Email & Call Support</li>
                                </ul>
                                <h1 className="text-center">
                                    $10
                                </h1>
                                <button className={genBtn}>1 Week Free trial</button>
                                </Fade>
                            </Card.Body>
                           
                        </Card>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    )
}