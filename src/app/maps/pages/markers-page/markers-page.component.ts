import { Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

interface MarkerAndColor{
  color:string,
  marker:Marker
}

interface PlainMarker{
  color:string;
  lngLat:number[]
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent {

  map?:Map;
  currentLngLat: LngLat = new LngLat(-3.69427651766361, 40.41932938269116); // starting position [lng, lat]
  markers:MarkerAndColor[] = [];
  
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
    
      this.readFromLocalStorage();
      /* Crear un marcador personalizado

    const markerHTML = document.createElement('div');
    markerHTML.innerHTML='Echandote de menitos bb'

    const marker = new Marker({
      color: 'green',
      element: markerHTML
    }).setLngLat( this.currentLngLat).addTo ( this.map );
    */
  }

  //Metodos
  createMarker(){
    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16)); //Color aleatorio
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat,color);
  }

  addMarker(lngLat:LngLat, color:string){
    if( !this.map ) return ;

    const marker = new Marker({
      color: color,
      draggable:true, //Que se pueda mover el marcador
    }).setLngLat( lngLat).addTo( this.map );
    this.markers.push( { color,marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage());
  }

  deleteMarker( index:number ){
    this.markers[index].marker.remove(); //Eliminar del mapa
    this.markers.splice( index, 1 )
  }

  flyTo( marker:Marker){
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map( ({color,marker}) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });
    console.log(plainMarkers);
    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));
  }

  readFromLocalStorage(){
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]'; //Si no existe/viene vacio, le asignamos un array []
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString ); //! Inseguro

    console.log(plainMarkers);

    plainMarkers.forEach( ({ color, lngLat}) => {
      const [lng, lat] = lngLat; //Destructurar el arreglo lng = lngLat[0] lat = lngLat[1]
      const coords = new LngLat(lng,lat);

      this.addMarker(coords, color);
    })
  }

}
