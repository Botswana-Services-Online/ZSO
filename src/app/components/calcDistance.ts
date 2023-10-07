import { Client } from "@googlemaps/google-maps-services-js"

const key = "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno"


interface geometry{
    lat:number,
    lng:number
}
// get users address from string
export const GetLocation = (address:string)=>{
    const client = new Client({})
    return client.geocode({
        params: {
            address: address,
            key
        }
    })
}

export const GetDistance=(from:geometry,to:geometry)=>{
    const client = new Client({})

    return client.distancematrix({
        params:{
            origins:[`${from.lat}`,`${from.lng}`],
            destinations:[`${to.lat}`,`${to.lng}`],
            key
        }
    })
}



