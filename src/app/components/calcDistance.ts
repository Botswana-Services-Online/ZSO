import { Client } from "@googlemaps/google-maps-services-js"

const key = "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno"

// get users address from string
const GetLocation = (address:string)=>{
    const client = new Client({})
    return client.geocode({
        params: {
            address: address,
            key
        }
    })
}

// get distance between placess
const searchFor = (add: string, currentLocation: { lat: number, lng: number }) => {
  
    const client = new Client({})
  
    GetLocation(add).then(res=>{
        console.log("convert address to geo codes")
        console.table(res.data.results[0].geometry.location)
        const lat = res.data.results[0].geometry.location.lat
        const lng = res.data.results[0].geometry.location.lng

        // get distance between current location and given location
        const distance = client.distancematrix({
            params: {
                origins: [`${currentLocation.lat},${currentLocation.lng}`],
                destinations: [`${lat},${lng}`],
                key
            }
        }).then(res=>{
          console.table(res.data.rows[0].elements)
        }).catch(err=>console.log(err))
    }).catch(err=>{
        console.log(err)
    })
  
}

searchFor("52 malta rd braeside, harare,zimbabwe", { lat: -17.8225152, lng: 31.0509568 })

