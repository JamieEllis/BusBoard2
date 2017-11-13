// @flow

import moment from 'moment';

export class Bus {
  busId: string;
  number: string;
  destination: string;
  expectedArrival: moment;

  constructor(vehicleId: string, lineName: string, destinationName: string, expectedArrival: string) {
    this.busId = vehicleId;
    this.number = lineName;
    this.destination = destinationName;
    this.expectedArrival = moment(expectedArrival);
  }

  display() {
    console.log(`Bus ${this.busId} - ${this.number} to ${this.destination} due at ${this.expectedArrival}`);
  }
}