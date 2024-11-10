const mongoose = require("mongoose");
const axios = require("axios");
const fs = require("fs");
const { join } = require("path");
const Event = require("../models/event");

const fetchAndSavePlacesByZip = async (zipCode) => {
  const apiKey = process.env.TOKEN; // Replace with your API key

  try {
    // Validate zipCode input
    if (!zipCode || typeof zipCode !== "string") {
      throw new Error(
        "Invalid zip code. Please provide a valid zip code as a string."
      );
    }

    // Construct a valid address using the zip code
    const formattedAddress = `${zipCode}, USA`;
    console.log(`Fetching location for Address: ${formattedAddress}`);

    // Step 1: Convert Zip Code to Latitude and Longitude using Geocoding API
    const geocodeResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: formattedAddress, // Constructed address
          key: apiKey, // API key
        },
      }
    );

    // Extract latitude and longitude from Geocoding API response
    const location = geocodeResponse.data.results[0]?.geometry?.location;
    if (!location) {
      throw new Error(`Invalid zip code or address: ${formattedAddress}`);
    }
    const { lat, lng } = location;

    console.log(`Location for Address ${formattedAddress}: ${lat}, ${lng}`);

    // Step 2: Fetch Places by Type using Nearby Search
    const types = [
      { label: "park", keyword: "park" },
      { label: "trail", keyword: "trail" },
      { label: "hiking", keyword: "hiking" },
    ];

    const allPlaces = [];

    for (const { label, keyword } of types) {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${lat},${lng}`, // Latitude and Longitude from Geocoding API
            radius: 5000, // Radius in meters
            keyword, // Keyword search for specific types
            key: apiKey,
          },
        }
      );

      // Extract the top 5 places for the current type
      const places = response.data.results.slice(0, 5).map((place) => ({
        name: place.name,
        address: place.vicinity || "Address not available",
        type: label,
      }));

      allPlaces.push(...places);
    }

    // Save to a JSON file
    // const filePath = "./services/places.json";
    // fs.writeFileSync(filePath, JSON.stringify(allPlaces, null, 2)); // Write JSON to file with 2-space indentation
    return allPlaces;
    // console.log(`Places saved to ${filePath}`);
  } catch (error) {
    console.error(
      "Error fetching or saving places:",
      error.response?.data || error.message
    );
  }
};

const populateDay = async (zipcode) => {
  let places = await fetchAndSavePlacesByZip(zipcode);
  //   createCasualEvent(date);
  //   createCompetitiveEvent(date);
  for (let i = 0; i < 5; i += 1) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);
    for (let j = 0; j < 3; j++) {
      const myEvent = places[j * 5 + i];
      if (!myEvent) continue;
      // Set time to 15:30:45 (3:30:45 PM)
      switch (j) {
        case 0:
          currentDate.setHours(8, 30, 0, 0);
          break;
        case 1:
          currentDate.setHours(15, 30, 0, 0);
          break;
        case 2:
          currentDate.setHours(18, 30, 0, 0);
          break;
      }
      const newEvent = await Event.create({
        location: myEvent.address,
        date: currentDate,
        ageRange: "Any",
      });
    }
  }
  //   createWaterEvent(date);
};

module.exports = {
  populateDay,
};

// Search for events with the keyword "hiking"
