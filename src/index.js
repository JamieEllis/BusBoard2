// @flow

import { TflApiClient } from "./clients/TflApiClient";

const config = require('../config.json');

const client = new TflApiClient(config.tflCredentials.applicationId, config.tflCredentials.applicationKey);

client.getBusesForStop('490008660N')
  .then(buses => buses.forEach(bus => bus.display()));
