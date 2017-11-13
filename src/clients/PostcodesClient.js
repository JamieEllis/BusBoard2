// @flow

import request from 'request-promise-native';
import { Location } from "../models/Location";
import { RequestOptions } from "../models/RequestOptions";

export class PostcodesClient {

  async getLocation(postcode: string): Promise<Location> {
    const options = new RequestOptions(`https://api.postcodes.io/postcodes/${postcode}`);
    let response = await request(options);
    return new Location(response.result.latitude, response.result.longitude);
  }
}