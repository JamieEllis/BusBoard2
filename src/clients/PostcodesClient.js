// @flow

import request from 'request-promise-native';
import { Location } from "../models/Location";

export class PostcodesClient {

  getLocation(postcode: string): Promise<Location> {
    return request(`https://api.postcodes.io/postcodes/${postcode}`)
      .then(JSON.parse)
      .then(parsed => new Location(parsed.result.latitude, parsed.result.longitude))
      .catch(err => console.log('Something went wrong!', err));
  }
}