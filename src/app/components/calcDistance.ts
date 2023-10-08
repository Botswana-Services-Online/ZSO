import axios from "axios";

interface cordType{
    lat:number,
    lng:number
}
const key = "AIzaSyB0N0WMrm6uUTJYlibyXdbGs7EXFnc6Yno"

export const convertToGeometry = async (address: string) => {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key
        }
      });
    return response.data
}

export  const getDistance=async(origin:cordType, destination:cordType)=> {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`,{
    params:{
      units:'imperial',
      origins:origin,
      destinations:destination,
      key:key
    }
  });

  return response.data;
}






