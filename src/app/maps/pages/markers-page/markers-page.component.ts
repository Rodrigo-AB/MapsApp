import { Component, ElementRef, ViewChild } from '@angular/core';

import  { LngLat, Map, Marker } from 'mapbox-gl';

// En la aplicacion real tendremos  que crear un archivo de interface por cada una de las que estamos metiendo aqui
interface MarkerAndColor  {
  color:  string;
  marker: Marker
}

interface PlainMarker {
  color:  string;
  lngLat: number[];
}


@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {

  @ViewChild('map') divMap?:  ElementRef;

  public  makers: MarkerAndColor[]  = [];

  public  zoom: number  = 13;
  public  map?: Map;
  public  currentLngLat :  LngLat  = new LngLat(-99.12873869142356, 19.322504201582362);

  ngAfterViewInit(): void {

    if  ( !this.divMap )  throw 'El elemento HTML no fue encontrado.'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();

    // const makerHtml = document.createElement('div');
    // makerHtml.innerHTML = 'UIN'

    // const maker = new Marker({
    //     color:  'red',
    //     element:  makerHtml
    // })
    //         .setLngLat( this.currentLngLat )
    //         .addTo( this.map );

  }

  createMaker() {
    if  ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat  = this.map.getCenter();

    this.addMarker( lngLat, color );
  }

  addMarker(  lngLat: LngLat, color:  string  ) {
    if  ( !this.map ) return;

    const marker  = new Marker({
      color:  color,
      draggable:  true
    })
      .setLngLat( lngLat )
      .addTo( this.map );

    this.makers.push({
      color:  color,
      marker: marker,
    })

    this.saveToLocalStorage();

    marker.on('dragend',  ()  =>  this.saveToLocalStorage() );  //con esta funcion lo que estamos haciendo es guardar la ultima posicion de nuestro marcador y retomarlo una vez que la pagina se recarga

  }

  deleteMarker( index:number  ){
    this.makers[index].marker.remove();
    this.makers.splice( index,  1 );
  }

  flyTo(  marker: Marker  ){
    this.map?.flyTo({
      zoom: 18,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage(){
    // console.log(  this.makers  );
    const plainMarkers: PlainMarker[] = this.makers.map(  ({  color,  marker  })  =>  {
      return  {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers',  JSON.stringify( plainMarkers ));

  }

  readFromLocalStorage(){
    const plainMarkersString  = localStorage.getItem('plainMarkers')  ??  '[]';
    const plainMarkers: PlainMarker[]  = JSON.parse( plainMarkersString );  //! OJO!

    // console.log(  plainMarkers  );

    plainMarkers.forEach( ({  color,  lngLat  })  => {
      const [ lng,  lat ] = lngLat;
      const coords  = new LngLat( lng,  lat);

      this.addMarker( coords, color );
    })

  }

}

