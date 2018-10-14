import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { refCount, publishReplay } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class GeoIpService {
  constructor(private http: HttpClient) {}

  public get(): Observable<any> {
    const url: string = 'https://ecommerce.sebastianmoreno.se/api/geoip'
    return this.http.get(url).pipe(
      publishReplay(1),
      refCount()
    )
  }
}
