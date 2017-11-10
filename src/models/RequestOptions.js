// @flow

export class RequestOptions {
    uri: string;
    qs: any;
    json: boolean;

    constructor(uri: string, qs: any, json: boolean = true) {
        this.uri = uri;
        this.qs = qs;
        this.json = json;
    }
}