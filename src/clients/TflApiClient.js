// @flow

import request from 'request-promise-native';
import { Bus } from "../models/Bus";

export class TflApiClient {
  applicationId: string;
  applicationKey: string;

  constructor(applicationId: string, applicationKey: string) {
    this.applicationId = applicationId;
    this.applicationKey = applicationKey;
  }

  getBusesForStop(stopId: string): Promise<Array<Bus>> {
    return request(`https://api.tfl.gov.uk/StopPoint/${stopId}/arrivals`)
      .then(body => JSON.parse(body))
      .then(parsed => parsed.map(bus =>
        new Bus(bus.vehicleId, bus.lineName, bus.destinationName, bus.expectedArrival)
      ))
      .catch(err => console.log('Something went wrong!', err));
  }

}