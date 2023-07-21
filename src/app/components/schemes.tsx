export interface userData{
    name:string,
    address:string,
    email:string,
    numEmployees:number,
    Cert:string,
    Tax:string,
    phone:string,
    description:string,
    header:string,
    images:Array<string>,
    listings:Array<string>,
    log:boolean,
    id:string,
    registered:false
}

export const userDataDefault:userData={
    name:"",
    address:"",
    email:"",
    numEmployees:0,
    Cert:"",
    Tax:"",
    phone:"",
    description:"",
    header:"",
    images:[],
    listings:[],
    log:false,
    id:"",
    registered:false
}
export interface listingsData{
    name:string,
    description:string,
    category:string,
    userId:string,
    price:number,
    serviceLocation:string,
    image:string,
    call:string,
    whatsapp:string,
    email:string
}