// import axios from 'axios';
// import HttpError from '../models/http-error.js';

// const API_KEY = //API_KEY;

async function getCoordsForAddress(address) {
    return {
        lat: 40.7484474,
        lng: -73.9871516
    };
    //   try {
    //     const response = await axios.get(
    //       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    //         address
    //       )}&key=${API_KEY}`
    //     );

    //     const data = response.data;

    //     // Check if the results array is valid and contains at least one entry
    //     if (!data || data.status === "ZERO_RESULTS" || !data.results || data.results.length === 0) {
    //       const error = new HttpError(
    //         "Could not find location for the specified address.",
    //         422
    //       );
    //       throw error;
    //     }

    //     // Access the coordinates safely
    //     const coordinates = data.results[0]?.geometry?.location;

    //     if (!coordinates) {
    //       throw new HttpError("Could not extract coordinates from the response.", 500);
    //     }

    //     return coordinates;
    //   } catch (err) {
    //     throw new HttpError("An error occurred while fetching coordinates.", 500);
    //   }
}

export { getCoordsForAddress };
