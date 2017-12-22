import { Http } from '@angular/http';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';
import 'rxjs/observable/of';
export declare class GeoIpService {
    private http;
    constructor(http: Http);
    get(): any;
}
