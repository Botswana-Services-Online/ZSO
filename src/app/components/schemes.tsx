export interface userData{
    name:string,
    address:string,
    email:string,
    numEmployees:number,
    Cert:string,
    Tax:string,
    phone:string,
    Description:string,
    serviceLocation:string,
    header:string,
    images:Array<string>,
    listings:Array<string>,
    log:boolean,
    id:string,
    registered:false,
    reviews:Array<{rating:number,message:string}>,
    industry:string,
    linkedin:string,
    twitter:string,
    facebook:string,
    website:string,
    registerAs:string,
    mobilePhone:string,
    telephone:string,
    hours:any,
    holiday:"Yes"|"No"
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
    serviceLocation:"Harare",
    header:"",
    images:[],
    listings:[],
    log:false,
    id:"",
    registered:false,
    reviews:[],
    industry:"",
    linkedin:"",
    twitter:"",
    facebook:"",
    website:"",
    mobilePhone:"",
    telephone:"",
    registerAs:"",
    hours:[],
    holiday:"Yes"
}
export interface listingsData{
    name:string,
    description:string,
    category:string,
    userId:string,
    price:number|string,
    serviceLocation:string,
    image:string,
    call:string,
    whatsapp:string,
    email:string,
    rating:number,
    review:{rating:number,message:string}[],
    company:string,
    type:string,
    
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
    email:"",
    rating:5,
    review:[],
    company:"",
    type:"listing"
}