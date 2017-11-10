// @flow

import express from 'express';
import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

const app = express();

app.get('/busBoard', (request, response) => {

  postcodesClient.getLocation(request.query.postcode)
    .then(location => tflApiClient.getStopsForLocation(location, 500))
    .then(stops => Promise.all(stops.map(stop => Promise.all([stop, tflApiClient.getBusesForStop(stop)]))))
    .then(busesAndStops => response.send(busesAndStops.map(stopAndBuses => {return {stop: stopAndBuses[0], buses: stopAndBuses[1]}})));

});

app.listen(3000, () => console.log('BusBoard listening on port 3000!'));