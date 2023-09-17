"use client"
import { genBtn, mp, vp } from "./components/cssStyles"
import { bgImg } from "./components/cssStyles"
import Marquee from "react-fast-marquee"
import { Fade } from "react-awesome-reveal"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { checkmarkDoneCircleOutline } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import Link from "next/link"

export default function Home() {

  const nav = useRouter()
  const [value,setValue] = useState<string>("")

  const handleSubmit=(e:FormEvent)=>{
    e.preventDefault()
    nav.push(`/listings?name=${value}`)
  }
  
  return (
    <div className={mp}>
      {/* home page */}
      <div className={vp} style={bgImg("https://voideawn.sirv.com/website/home_one.jpg")}>
      <form onSubmit={(e)=>handleSubmit(e)} className="w-100">
        <div className="input-group mb-3  container">
          
          <input type="text" className="form-control shadow-lg rounded-pill  p-3 me-1" placeholder="looking for...." onChange={(e)=>setValue(e.target.value)}/>
         
          <button type="submit" className="btn Bg text-white rounded-pill d-flex align-items-center"><img className="imgWhite" src="https://voideawn.sirv.com/website/search-circle-outline.svg" width="30" /></button>
         
        </div>
        </form>
      </div>
      <br/>
      {/* home two */}
      <Fade direction="down">
      <div className={vp}>
       
        <div className="row container ">
          <div className="col-sm mb-3">
            <img loading="eager" src="https://voideawn.sirv.com/website/home_two.jpg" className=" img-fluid rounded shadow-lg" alt="lady selling tomatoes" />
          
          </div>
          <div className="col-sm text-center d-flex flex-column justify-content-center align-items-center ">
            <h1 >
              Connecting Small Markets
            </h1>
            <p>
              Selling online is not just an increase in revenue, but a way to further connect with your audiences and expand your name. By growing your online presence, your business is no longer limited to a local customer base.
            </p>
            <Link href="/User/Auth"><button className={genBtn}>Create Your Free listing!</button></Link>
          </div>
        </div>
        
      </div>
      </Fade>
      <Fade>
          <div className="m-5">
              <div className="row text-center">
                <h1>Verified Badges</h1>
                <br />
                <div className="col-sm">
                
                  <IonIcon color="warning" size="large" icon={checkmarkDoneCircleOutline}/>
                  <p>Premium</p>
                </div>
                <div className="col-sm">
                  <IonIcon color="success" size="large" icon={checkmarkDoneCircleOutline}/>
                  <p>Standard</p>
                </div>
                <div className="col-sm">
                  <IonIcon color="medium" size="large" icon={checkmarkDoneCircleOutline}/>
                  <p>Free</p>
                </div>
              </div>
          </div>
      </Fade>
      <div>
        <Marquee>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Aurora </p><img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>

            <hr />
            <p>IT Services and Management Systems</p>
            <span className="me-2">5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Bellprize PVT Limited</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Civil Engineering</p>
            <span className="me-2">4.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Crown Connect</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Finanacial Services Consultancy</p>
            <span className="me-2">4.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Pamba</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Food catering services</p>
            <span className="me-2">5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Shapiro Motors</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Car repairs and inspection!</p>
            <span className="me-2">4</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>

        </Marquee>
        <Marquee direction="right">
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Amai Dees</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>ZIM traditional food</p>
            <span className="me-2">3</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Montana grills</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Gochi gochi grills for the nation</p>
            <span className="me-2">2</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Steelmate</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>One stop shop for all your steel needs</p>
            <span className="me-2">3.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Export Freight</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Shipping, transporting services</p>
            <span className="me-2">1</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <div className="d-flex justify-content-between ">
              <p>Shapiro Motors</p>
              <img className="imgGreen text-end" src="https://voideawn.sirv.com/website/checkmark-done-outline.svg" width="25" />
            </div>
            <hr />
            <p>Car repairs and inspection!</p>
            <span className="me-2">4.7</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png" />
          </div>

        </Marquee>

      </div>
      <div className={vp}>
        <div className="row container">
          <div className="col-sm">
            <h1>AI Neural Search</h1>
            <p>No need to use search filters. Search for the location and price all on a single prompt!!</p>
          </div>
          <div className="col-sm">
            <img src="" className="img-fluid"/>
          </div>
        </div>

      </div>
      <Fade direction="down">
      <div className={vp}>
        <div className="row container">
          <div className="col-sm d-flex flex-column text-center justify-content-center align-items-center mb-3">
            <h1>Benefits of Listing on ZSO</h1>
            <ul>
              <li>Low operating costs</li>
              <li>Potential for high scalability</li>
              <li>Large client and consumer base</li>
              <li>Quality customer support</li>
              <li>Marketing is made easy</li>
            </ul>
            <Link href="/User/Auth"><button className={genBtn}>Get your Free Listing</button></Link>
          </div>
          <div className="col-sm">
            <img className="Sirv rounded shadow-lg img-fluid" src="https://voideawn.sirv.com/website/home_three.jpg" alt="man painted with the Zimbabwean flag" />
          </div>
        </div>
      </div>
      </Fade>
    </div>
  )
}
