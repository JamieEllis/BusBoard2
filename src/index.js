// @flow

import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);
const postcodesClient = new PostcodesClient();

postcodesClient.getLatitudeAndLongtitude('NW51TL').then(console.log);

tflApiClient.getBusesForStop('490008660N')
  .then(buses => buses.forEach(bus => bus.display()));
