import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit{

  zoom:number = 10;
  map?:Map;

  @ViewChild('map') divMap?:ElementRef 

  ngAfterViewInit(): void {
    //Cuando ya tenemos las referencias HTML es cuando se va a ejecutar este codigo
    console.log(this.divMap);
    if ( !this.divMap )throw 'El elemento HTML no fue encontrado';//Si no existe, retornamos nada

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID, asociamos el div donde lo queremos mostrar
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

    this.mapListeners();  
  }

  mapListeners(){
    if(!this.map) throw 'Mapa no inicializado';
    //Listado de Listeners
    //Eventos, cada vez que el evento cambio, en este caso el zoom... esto se ejecutará
    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom(); // Le ponemos ! para que sea como null y no UNDEFINED
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return ;

      this.map!.zoomTo(18); // Si es mayor...
    });
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged( value: string){
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom );
  }
      
}
