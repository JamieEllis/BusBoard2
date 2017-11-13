// @flow

import moment from 'moment';

export class Bus {
  busId: string;
  number: string;
  destination: string;
  expectedArrival: moment;
}