// @flow

import { TflApiClient } from "./clients/TflApiClient";

const tflApplicationId = '4b6a727f';
const tflApplicationKey = '8baaa3c91579775990bc14bb2cb389ab';

const client = new TflApiClient(tflApplicationId, tflApplicationKey);

client.getBusesForStop('490008660N')
  .then(buses => buses.forEach(bus => bus.display()));
