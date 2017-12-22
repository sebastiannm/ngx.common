import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';
import 'rxjs/observable/of';


@Injectable()
export class GeoIpService {

  constructor(private http: HttpClient) {}

  get() {
    const url: string = 'https://api.sebastianmoreno.se/api/geoip';
    return this.http.get(url)
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }
}
