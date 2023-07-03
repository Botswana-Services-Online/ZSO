export const vp = "page"
export const genFrm = "rounded-pill form-control shadow-lg formGeneral mt-5"
export const genBtn = "btn buttonGeneral rounded-pill shadow-lg"
export const loading = <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>

export const progressBar = (percentage:string) => {
  return (
    <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
      <div className="progress-bar progressBg" style={{ width: "15%" }}></div>
    </div>
  )
}

export const bgImg = (img: string) => {
  return {
    backgroundImage: img,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}