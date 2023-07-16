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
    log:boolean
}

export const userDataDefault={
    name:"",
    address:"",
    email:"",
    numEmployees:"",
    Cert:"",
    Tax:"",
    phone:"",
    description:"",
    header:"",
    images:[],
    listings:[],
    log:false
}