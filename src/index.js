// @flow

import express from 'express';
import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

const app = express();

app.set('view engine', 'pug');

app.get('/busBoard', async (request, response) => {

  let location = await postcodesClient.getLocation(request.query.postcode);
  let stops = await tflApiClient.getStopsForLocation(location, 500);
  let buses = await Promise.all(stops.map(stop => tflApiClient.getBusesForStop(stop)));
  response.send(stops.map((stop, i) => { return {stop: stop, buses: buses[i]}}));

});

app.get('/postcode/:postcode', async (request, response) => {

  let location = await postcodesClient.getLocation(request.params.postcode);
  let stops = await tflApiClient.getStopsForLocation(location, 500);
  let buses = await Promise.all(stops.map(stop => tflApiClient.getBusesForStop(stop)));
  let data = stops.map((stop, i) => { return {stop: stop, buses: buses[i]}});

  response.render('index', {data: data});
});


app.listen(3000, () => console.log('BusBoard listening on port 3000!'));

