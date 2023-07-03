"use client"
import { ProgressBar } from "react-bootstrap"
import { genBtn, genFrm, vp } from "./components/cssStyles"
import { bgImg } from "./components/cssStyles"
import { searchCircleOutline,checkmarkDone } from "ionicons/icons"
import { IonIcon } from "@ionic/react"
import Marquee from "react-fast-marquee"

export default function Home() {
  return (
    <div className="container-fluid p-0 mt-5 ">
      {/* home page */}
      <div className={vp} style={bgImg("https://voideawn.sirv.com/website/home_one.jpg")}>
        <div className="input-group mb-3  container">
          <input type="text" className="form-control shadow-lg rounded-start-pill  p-3" placeholder="What are you looking for...." />
          <input type="text" className="form-control rounded-end-pill p-3 me-1" placeholder="Location" />
          <button className="btn Bg text-white rounded-pill d-flex align-items-center"><IonIcon size="large" icon={searchCircleOutline} /></button>
        </div>
      </div>
      {/* home two */}
      <div className={vp}>
        <div className="row container ">
          <div className="col-sm">
            <img src="https://voideawn.sirv.com/website/home_two.jpg" className="Sirv rounded"  alt="lady selling tomatoes" />
          </div>
          <div className="col-sm text-center d-flex flex-column justify-content-center align-items-center ">
            <h1 >
              Connecting Small Markets
            </h1>
            <p>
            Selling online is not just an increase in revenue, but a way to further connect with your audiences and expand your name. By growing your online presence, your business is no longer limited to a local customer base.
            </p>
            <button className={genBtn}>Create Your Free listing!</button>
          </div>
        </div>
      </div>
      <div>
        <Marquee>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Aurora</p>
            <hr />
            <p>IT Services and Management Systems</p>
            <span className="me-2">5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Bellprize PVT Limited</p>
            <hr />
            <p>Civil Engineering</p>
            <span className="me-2">4.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Crown Connect</p>
            <hr />
            <p>Finanacial Services Consultancy</p>
            <span className="me-2">4.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Pamba</p>
            <hr />
            <p>Food catering services</p>
            <span className="me-2">5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Shapiro Motors</p>
            <hr />
            <p>Car repairs and inspection!</p>
            <span className="me-2">4</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>

        </Marquee>
        <Marquee direction="right">
          <div className="rounded shadow p-3 m-3 marq">
            <p>Amai Dee's</p>
            <hr />
            <p>ZIM traditional food</p>
            <span className="me-2">3</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Montana grills</p>
            <hr />
            <p>Gochi gochi grills for the nation</p>
            <span className="me-2">2</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Steelmate</p>
            <hr />
            <p>One stop shop for all your steel needs</p>
            <span className="me-2">3.5</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Export Freight</p>
            <hr />
            <p>Shipping, transporting services</p>
            <span className="me-2">1</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>
          <div className="rounded shadow p-3 m-3 marq">
            <p>Shapiro Motors</p>
            <hr />
            <p>Car repairs and inspection!</p>
            <span className="me-2">4.7</span><img className="mb-1" src="https://voideawn.sirv.com/website/star.png"/>
          </div>

        </Marquee>
       
      </div>
      <div className={vp}>
          <div className="row container">
            <div className="col-sm">

            </div>
              <div className="col-sm">

              </div>
          </div>
      </div>
    </div>
  )
}
