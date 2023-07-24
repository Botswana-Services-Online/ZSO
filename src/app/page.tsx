"use client"
import { genBtn, mp, vp } from "./components/cssStyles"
import { bgImg } from "./components/cssStyles"
import Marquee from "react-fast-marquee"
import { Fade } from "react-awesome-reveal"

export default function Home() {
  
  return (
    <div className={mp}>
      {/* home page */}
      <div className={vp} style={bgImg("https://voideawn.sirv.com/website/home_one.jpg")}>
        <div className="input-group mb-3  container">
          <input type="text" className="form-control shadow-lg rounded-start-pill  p-3" placeholder="looking for...." />
          <input type="text" className="form-control shadow-lg rounded-end-pill p-3 me-1" placeholder="Location" />
          <button className="btn Bg text-white rounded-pill d-flex align-items-center"><img className="imgWhite" src="https://voideawn.sirv.com/website/search-circle-outline.svg" width="30" /></button>
        </div>
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
            <button className={genBtn}>Create Your Free listing!</button>
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
            <button className={genBtn}>Get your Free Listing</button>
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
