// @flow

import { TflApiClient } from "./clients/TflApiClient";
import { PostcodesClient } from "./clients/PostcodesClient";

const config = require('../config.json');

const postcodesClient = new PostcodesClient();
const tflApiClient = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

postcodesClient.getLocation('NW51TL')
  .then(location => tflApiClient.getStopsForLocation(location, 500))
  .then(console.log);
