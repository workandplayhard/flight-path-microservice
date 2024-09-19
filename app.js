const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/calculate', (req, res) => {
  const flights = req.body.flights;

  // Validate input
  if (!Array.isArray(flights)) {
    return res.status(400).json({ error: 'Flights data must be an array.' });
  }

  for (const flight of flights) {
    if (
      !Array.isArray(flight) ||
      flight.length !== 2 ||
      typeof flight[0] !== 'string' ||
      typeof flight[1] !== 'string'
    ) {
      return res.status(400).json({ error: 'Each flight must be an array of two airport codes.' });
    }
  }

  // Implement sorting logic
  const flightMap = {};
  const sources = new Set();
  const destinations = new Set();

  flights.forEach(([source, destination]) => {
    flightMap[source] = destination;
    sources.add(source);
    destinations.add(destination);
  });

  // Find the starting airport
  let start = null;
  for (const source of sources) {
    if (!destinations.has(source)) {
      start = source;
      break;
    }
  }

  if (!start) {
    return res.status(400).json({ error: 'Invalid flight data: Could not find a starting airport.' });
  }

  // Construct the flight path
  const flightPath = [start];
  while (flightMap[start]) {
    const nextDestination = flightMap[start];
    flightPath.push(nextDestination);
    start = nextDestination;
  }

  // Validate the path length
  if (flightPath.length !== flights.length + 1) {
    return res.status(400).json({ error: 'Invalid flight data: Flights do not form a continuous path.' });
  }

	// Send the response
	const totalFlightPath = [flightPath[0], flightPath[flightPath.length - 1]];
	return res.json({ path: totalFlightPath });
});