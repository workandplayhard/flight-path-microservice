# Flight Path Microservice API

- Flight Path Microservice API(#Flight Path Microservice API)
  - [Description](#description)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Server](#running-the-server)
  - [API Documentation](#api-documentation)

## Description

This microservice API helps to determine and track a person's flight path by sorting through their flight records. Given an unordered list of flight segments, the API reconstructs the continuous flight path from the starting airport to the final destination.

## Features

- Accepts an unordered list of flight segments defined by source and destination airport codes.
- Reconstructs the continuous flight path from the starting airport to the final destination.
- Exposes a RESTful API endpoint at /calculate.
- Built using Node.js and Express.
- Detailed API documentation and usage examples.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager, comes with Node.js)

### Installation

   1. Clone the Repository

      ```
      git clone https://github.com/workandplayhard/flight-path-microservice.git
      cd flight-path-microservice
      ```

   2. Install Dependencies
   
      ```
      npm install
      ```

### Running the Server
   Start the server by running:

   ```
   node app.js
   ```

   The server will start listening on port `8080`.

## API Documentation

- Endpoint
   `POST` /calculate
- Request Format
   - `Content-Type`: application/json
   - `Body`

      ```
         {
            "flights": [["SOURCE", "DESTINATION"], ...]
         }
      ```

         - flights: An array of flight segments.
            - Each segment is an array of two airport codes [source, destination].
            - Airport codes are strings.

- Response Format
   - `Success (HTTP Status 200):`

      ```
         {
            "path": ["START_AIRPORT", "MIDDLE_AIRPORT", "END_AIRPORT"]
         }
      ```
   - `Error:`
      - `Invalid Input (HTTP Status 400):`

         ```
            {
               "path": ["START_AIRPORT", "MIDDLE_AIRPORT", "END_AIRPORT"]
            }
         ```

- Examples
   - Example 1
      - Request:

         ```
            curl -X POST http://localhost:8080/calculate \
               -H "Content-Type: application/json" \
               -d '{"flights": [["SFO", "EWR"]]}'
         ```

         CMD

         ```
            curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d "{\"flights\": [[\"SFO\", \"EWR\"]]}"
         ```

      - Response:

         ```
            {
               "path": ["SFO", "EWR"]
            }
         ```

   - Example 2
      - Request:

         ```
            curl -X POST http://localhost:8080/calculate \
               -H "Content-Type: application/json" \
               -d '{"flights": [["ATL", "EWR"], ["SFO", "ATL"]]}'
         ```

      - Response:

         ```
            {
               "path": ["SFO", "EWR"]
            }
         ```

         CMD
         
         ```
            curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d "{\"flights\": [[\"ATL\", \"EWR\"], [\"SFO\", \"ATL\"]]}"
         ```

   - Example 3
      - Request:

         ```
            curl -X POST http://localhost:8080/calculate \
               -H "Content-Type: application/json" \
               -d '{
                  "flights": [
                     ["IND", "EWR"],
                     ["SFO", "ATL"],
                     ["GSO", "IND"],
                     ["ATL", "GSO"]
                  ]
               }'
         ```

         CMD

         ```
            curl -X POST http://localhost:8080/calculate -H "Content-Type: application/json" -d "{\"flights\": [[\"IND\", \"EWR\"], [\"SFO\", \"ATL\"], [\"GSO\", \"IND\"], [\"ATL\", \"GSO\"]]}"
         ```

      - Response:

         ```
            {
               "path": ["SFO", "EWR"]
            }
         ```