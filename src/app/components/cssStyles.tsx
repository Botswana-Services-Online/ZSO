export const vp = "page d-flex flex-row flex-wrap justify-content-center align-items-center"
export const genFrm = "rounded-pill form-control shadow-lg formGeneral mt-5"
export const genBtn = "btn buttonGeneral rounded-pill shadow-lg"
export const loading = <div className="spinner-border text-success" role="status">
  <span className="visually-hidden">Loading...</span>
</div>


export const bgImg = (img: string) => {
  return {
    padding:"0px",
    margin:"0px",
    backgroundPosition:"center",
    backgroundImage: `url(${img})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
}