import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, BaseRequestOptions } from '@angular/http';

@Injectable()
export class RequestOptionsService extends BaseRequestOptions {
    constructor() {
        super();
        this.headers.set('Content-Type', 'application/json');
    }
}