// @flow

import request from 'request-promise-native';
import { Bus } from "../models/Bus";
import { Stop } from "../models/Stop"
import { Location } from "../models/Location";
import { RequestOptions } from "../models/RequestOptions";

export class TflApiClient {
  _applicationId: string;
  _applicationKey: string;
  _baseUrl: string;

  constructor(applicationId: string, applicationKey: string) {
    this._applicationId = applicationId;
    this._applicationKey = applicationKey;
    this._baseUrl = 'https://api.tfl.gov.uk/StopPoint/';
  }

  getBusesForStop(stop: Stop): Promise<Array<Bus>> {
    const options = new RequestOptions(
      this._baseUrl + `${stop.id}/arrivals`,
      {
        app_id: this._applicationId,
        app_key: this._applicationKey
      }
    );
    return request(options)
      .then(parsed => parsed.map(bus =>
        new Bus(bus.vehicleId, bus.lineName, bus.destinationName, bus.expectedArrival)
      ))
      .catch(err => console.log('Something went wrong!', err));
  }

  getStopsForLocation(location: Location, radius: number, numberOfStops: number = 2): any {
    const options = new RequestOptions(
      this._baseUrl,
      {
        app_id: this._applicationId,
        app_key: this._applicationKey,
        lat: location.latitude.toString(),
        lon: location.longitude.toString(),
        stoptypes: 'NaptanPublicBusCoachTram',
        radius: radius.toString()
      }
    );
    return request(options)
      .then(parsed => parsed.stopPoints
        .sort((a, b) => a.distance - b.distance)
        .slice(0, numberOfStops)
        .map(stop => new Stop(stop.naptanId, stop.commonName)));
  }
}