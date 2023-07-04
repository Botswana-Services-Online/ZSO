"use client"
import { Card } from "react-bootstrap";
import { genBtn, mp, vp } from "../components/cssStyles";

export default function Pricing(){
    return(
        <div className={mp}>
            <div className="mt-5">.</div>
            <h1 className="text-center mt-5">Pricing</h1>
            <div className={vp}>
                <div className="row container ">
                    <div className="col-sm mb-4">
                        <Card className="shadow-lg rounded">
                            <Card.Img className="Sirv " width={300} src="https://voideawn.sirv.com/website/price_one.jpg"/>
                              
                            <Card.Header className="Bg text-white">
                                <h3>Free</h3>
                            </Card.Header>
                            <Card.Body>
                            <ul>
                                    <li>1 Listing</li>
                                    <li>Featured</li>
                                    <li>Monthly Ad Push</li>
                                    <li>Verified</li>
                                    <li>Valid for 30 days</li>
                                    <li>Basic Email Support</li>
                                </ul>
                                <h1 className="text-center">$0</h1>
                            <button className={genBtn}>Register for Free</button>
                            </Card.Body>
                           
                        </Card>
                         
                          
                    </div>
                    <div className="col-sm mb-4">
                    <Card className="shadow-lg rounded">
                            <Card.Img className="Sirv"  width={300} src="https://voideawn.sirv.com/website/price_two.jpg"/>
                              
                            <Card.Header className="Bg text-white d-flex flex-row justify-content-between ">

                                <h3>Standard</h3>
                
                            </Card.Header>
                            <Card.Body>
                            <ul>
                                    <li>10 Listings</li>
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
                            </Card.Body>
                        
                        </Card>
                    </div>
                    <div className="col-sm mb-4">
                    <Card className="rounded shadow-lg ">
                            <Card.Img className="Sirv"   src="https://voideawn.sirv.com/website/price.jpg"/>
                            <Card.Header className="Bg text-white">
                                <h3>Premium</h3>
                            </Card.Header>
                            <Card.Body>
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

                            </Card.Body>
                           
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}