import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class GeoIpService {
    private http;
    constructor(http: HttpClient);
    get(): Observable<any>;
}
