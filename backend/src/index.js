// @flow

import express from 'express';
import cors from 'cors';
import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

const app = express();

app.use(cors());

app.get('/postcode/', generateResponse);
app.get('/postcode/:postcode', generateResponse);

async function generateResponse(request, response) {
  try {
    let location = await postcodesClient.getLocation(request.params.postcode.replace(/ /g,'').toUpperCase());
    let stops = await tflApiClient.getStopsForLocation(location, 500);
    let buses = await Promise.all(stops.map(stop => tflApiClient.getBusesForStop(stop)));
    response.send(stops.map((stop, i) => { return {stop: stop, buses: buses[i]}}));
  }
  catch (err) {
    response.send([]);
  }
}

app.listen(3001, () => console.log('BusBoard listening on port 3001!'));
