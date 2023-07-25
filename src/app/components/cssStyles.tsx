export const mp = "container-fluid p-0 mt-5"
export const vp = "page d-flex flex-row flex-wrap justify-content-center align-items-center"
export const genFrm = "rounded-pill form-control shadow-lg formGeneral m-1"
export const genBtn = "btn buttonGeneral rounded-pill shadow-lg"
export const nomBtn = " btn text-white Bg rounded-pill shadow-lg"
export const loading = <div className="spinner-border text-success" role="status">
  <span className="visually-hidden"></span>
</div>
export const outlineBtn = "btn btn-outline-success rounded-pill bg-white"
export const alignIcon="d-flex align-items-center justify-content-center" 


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