import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {

  map?:Map;
  @Input() lngLat?: [number,number];
  @ViewChild('map') divMap?:ElementRef 

  ngAfterViewInit(){
    if ( !this.divMap?.nativeElement ) throw "Map Div not found";
    if ( !this.lngLat ) throw "LngLat can't be null"

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID, asociamos el div donde lo queremos mostrar
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, 
      zoom: 15, // starting zoom
      interactive:false //No poder hacer scrool ni nada, se queda fijo
      });

    new Marker().setLngLat( this.lngLat ).addTo( this.map );
  }

}
