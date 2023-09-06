export interface userData{
    name:string,
    address:string,
    email:string,
    numEmployees:number,
    Cert:string,
    Tax:string,
    phone:string,
    Description:string,
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
    Description:"",
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

export const listingsDataDefault:listingsData={
    name:"",
    description:"",
    category:"",
    userId:"",
    price:0,
    serviceLocation:"",
    image:"",
    call:"",
    whatsapp:"",
    email:""
}