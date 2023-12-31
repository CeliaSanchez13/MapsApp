import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
(mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2VsaWFzdWxsaXZhbiIsImEiOiJjbG5pcGthaXIxYXJqMm1ydWlqa3g2MGNzIn0.4TxWIoGOUVI_ecgPDG81uw';

import { MapsRoutingModule } from './maps-routing.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { MiniMapComponent } from './components/mini-map/mini-map.component';


@NgModule({
  declarations: [
   
  
    SideMenuComponent,
           MapsLayoutComponent,
           FullScreenPageComponent,
           MarkersPageComponent,
           PropertiesPageComponent,
           ZoomRangePageComponent,
           MiniMapComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
