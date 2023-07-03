import { ProgressBar } from "react-bootstrap"
import { genBtn, genFrm, progressBar, vp } from "./components/cssStyles"
import { bgImg } from "./components/cssStyles"
import { loading } from "./components/cssStyles"
export default function Home() {
  return (
    <div className="container-fluid">
      <div className="vp m-5" style={bgImg("")}>
          <button className={genBtn}>Create Your Listing</button>
          <input className={genFrm} type="text" placeholder="Company Name" />
          <br />
          {loading}
          <br />
          <br/>
          {progressBar("10")}
      </div>
    </div>
  )
}
