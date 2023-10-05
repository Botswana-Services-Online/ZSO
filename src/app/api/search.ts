import algoliasearch from 'algoliasearch';
import axios from 'axios';

// Initialize Algolia
const client = algoliasearch('YOUR_ALGOLIA_APP_ID', 'YOUR_ALGOLIA_API_KEY');
const index = client.initIndex('YOUR_ALGOLIA_INDEX_NAME');

// Function to get user's location (latitude and longitude) from an address string
async function getUserLocation(address: string): Promise<{lat: number, lng: number}> {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_API_KEY`);
    return response.data.results[0].geometry.location;
}

// Function to search for nearby food shops using Google Places API
async function searchNearbyFoodShops(location: {lat: number, lng: number}) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=1500&type=restaurant&key=YOUR_GOOGLE_API_KEY`);
    return response.data.results;
}

// Function to search for food shops in Algolia
async function searchAlgolia(foodShops: any[]) {
    const objectIDs = foodShops.map(shop => shop.place_id);
    const results = await index.getObjects(objectIDs);
    return results.results;
}

// Main function to get user location, find nearby food shops, and look them up in Algolia
export async function findFoodShops(address: string) {
    const location = await getUserLocation(address);
    const foodShops = await searchNearbyFoodShops(location);
    const algoliaResults = await searchAlgolia(foodShops);
    console.log(algoliaResults);
}


