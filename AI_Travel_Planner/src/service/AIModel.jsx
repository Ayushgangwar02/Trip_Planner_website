import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 32,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const AI_PROMPT = `
Generate a comprehensive travel plan for {destination} for {noOfDays} days for {traveler} with a {budget} budget.

Please provide the response in the following JSON format:

{
  "hotels": [
    {
      "hotelName": "Hotel Name",
      "hotelAddress": "Full Address",
      "price": "$100-200 per night",
      "hotelImageUrl": "https://example.com/image.jpg",
      "geoCoordinates": {"lat": 0.0, "lng": 0.0},
      "rating": 4.5,
      "description": "Hotel description"
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "placeName": "Place Name",
          "placeDetails": "Description of the place",
          "placeImageUrl": "https://example.com/image.jpg",
          "geoCoordinates": {"lat": 0.0, "lng": 0.0},
          "ticketPricing": "$10-20",
          "rating": 4.0,
          "timeToTravel": "2-3 hours",
          "bestTimeToVisit": "Morning 9-11 AM"
        }
      ]
    }
  ]
}

Provide realistic recommendations with actual places, hotels, and approximate pricing for {destination}.
`;

export const generateTravelPlan = async (formData) => {
  const prompt = `
    Generate Travel Plan for Location: ${formData.destination}, 
    for ${formData.noOfDays} Days for ${formData.traveler} with a ${formData.budget} budget.
    
    Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for ${formData.noOfDays} days with each day plan with best time to visit in JSON format.
  `;

  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating travel plan:', error);
    throw error;
  }
};
