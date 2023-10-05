import algolia from "algoliasearch"
import { Client } from "@googlemaps/google-maps-services-js"

const searchFor = (value:string,currentLocation:{lat:number,lng:number})=>{
    const key = "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno"
    const client = new Client({})

    //search for value in the city
    let results:any[] = []
    const searchAll = algolia("WVEPWJXG9S","70781c8d8f715f97a5a55cb90ba3eccd") 
    const listingIndex = searchAll.initIndex("listings")

    listingIndex.search(value).then(res=>{
        results = res.hits
    })

   

    if(results.length>0){

        results.forEach((result:any)=>{
            //get current geo location of given string
            client.geocode({
                params:{
                    address:result.address,
                    key
                }
            }).then(res=>{
                const lat = res.data.results[0].geometry.location.lat
                const lng = res.data.results[0].geometry.location.lng

                //get distance between current location and given location
                const distance =client.distancematrix({
                    params:{
                        origins:[`${currentLocation.lat},${currentLocation.lng}`],
                        destinations:[`${lat},${lng}`],
                        key
                    }
                })
                result.distance = distance
            })
        })
        return results.sort((a,b)=>a.distance-b.distance)
    }else{
        return results
    }
        

   
}

