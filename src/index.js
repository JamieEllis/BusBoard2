// @flow

import express from 'express';
import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

const app = express();

app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/postcode/:postcode', async (request, response) => {

  try {
    let location = await postcodesClient.getLocation(request.params.postcode);
    let stops = await tflApiClient.getStopsForLocation(location, 500);
    let buses = await Promise.all(stops.map(stop => tflApiClient.getBusesForStop(stop)));
    let data = stops.map((stop, i) => {
      return {stop: stop, buses: buses[i]}
    });
    response.render('index', {data: data});
  }
  catch (error) {
    response.render('sadtimes', {errorStatusCode: error.statusCode});
  }

});


app.listen(3000, () => console.log('BusBoard listening on port 3000!'));

