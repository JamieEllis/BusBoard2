// @flow

import request from 'request-promise-native';
import { Location } from "../models/Location";
import { RequestOptions } from "../models/RequestOptions";

export class PostcodesClient {

  getLocation(postcode: string): Promise<Location> {
    const options = new RequestOptions(`https://api.postcodes.io/postcodes/${postcode}`);
    return request(options)
      .then(parsed => new Location(parsed.result.latitude, parsed.result.longitude))
      .catch(err => console.log('Something went wrong!', err));
  }
}