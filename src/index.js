// @flow

import express from 'express';
import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

const app = express();

app.get('/busBoard', (request, response) =>
  postcodesClient.getLocation(request.query.postcode)
    .then(location => tflApiClient.getStopsForLocation(location, 500))
    .then(stops => response.send(stops))
    .catch(console.log)
);

app.listen(3000, () => console.log('BusBoard listening on port 3000!'));