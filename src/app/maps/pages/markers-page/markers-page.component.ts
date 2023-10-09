import { Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  map?:Map;
  currentLngLat: LngLat = new LngLat(-3.2057935727373206, 40.28490808546138); // starting position [lng, lat]
  
  @ViewChild('map') divMap?:ElementRef 

  ngAfterViewInit(): void {
    //Cuando ya tenemos las referencias HTML es cuando se va a ejecutar este codigo
    if ( !this.divMap )throw 'El elemento HTML no fue encontrado';//Si no existe, retornamos nada

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID, asociamos el div donde lo queremos mostrar
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, 
      zoom: 13, // starting zoom
      });
    
      /* Crear un marcador personalizado

    const markerHTML = document.createElement('div');
    markerHTML.innerHTML='Echandote de menitos bb'

    const marker = new Marker({
      color: 'green',
      element: markerHTML
    }).setLngLat( this.currentLngLat).addTo ( this.map );
    */


  }

}
