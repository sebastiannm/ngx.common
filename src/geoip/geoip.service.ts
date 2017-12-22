import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { publishReplay, refCount } from 'rxjs/operators'


@Injectable()
export class GeoIpService {

  constructor(private http: HttpClient) {}

  get() {
    const url: string = 'https://api.sebastianmoreno.se/api/geoip';
    return this.http.get(url)
      .pipe(
        publishReplay(1),
        refCount()
      )
  }
}
