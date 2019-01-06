import { NgModule } from '@angular/core'
import { GeoIpService } from './geoip.service'

@NgModule({
  imports: [],
  exports: [GeoIpService],
  declarations: [GeoIpService],
  providers: [GeoIpService]
})
export class GeoIpModule {}
