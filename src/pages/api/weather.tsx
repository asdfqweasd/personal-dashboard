import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, lat, lon, part } = req.body;
  const apiKey = process.env.OPENWEATHERMAP_API_KEY; // OpenWeatherMap API key
  const geocodingApiKey = process.env.GEOCODING_API_KEY; // API key for geocoding service
  try {
    let coordinates = { lat, lon };
    if (address) {
      const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=1&appid=${geocodingApiKey}`;

      const geocodeResponse = await fetch(geocodeUrl);
      const locations = await geocodeResponse.json();
      if (locations.length === 0) {
        res.status(404).json({ error: "Location not found" });
        return;
      }
      coordinates = { lat: locations[0].lat, lon: locations[0].lon };
    } else if (!lat || !lon) {
      // No address
      res
        .status(400)
        .json({ error: "Address or latitude and longitude required" });
      return;
    }

    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
