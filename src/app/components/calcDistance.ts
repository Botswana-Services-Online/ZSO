import { Client } from "@googlemaps/google-maps-services-js"
import { Loader } from "@googlemaps/js-api-loader";
interface geometry{
    lat:number,
    lng:number
}
const key = "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno"

const client  = new Client({})

// get users address from string
export const GetLocation = (address:string)=>{
    return client.geocode({
        params: {
            address: address,
            key
        }
    })
}

export const GetDistance=(from:geometry,to:geometry)=>{

    return client.distancematrix({
        params:{
            origins:[`${from.lat}`,`${from.lng}`],
            destinations:[`${to.lat}`,`${to.lng}`],
            key
        }
    })
}


// export const gd = ()=>{
//     const c = new Loader({
//         apiKey:key
//     })

//     c.importLibrary("geocoding").then(({Geocoding})=>{
//         new Geocoding().geocode({
//             address:"52 malta rd braeside"
//         }).then((res:any)=>{
//             console.log(res.data.results[0].geometry.location)
//         })
//     })
// }



