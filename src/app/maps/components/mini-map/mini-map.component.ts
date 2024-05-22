import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

import  { LngLat, Map, Marker } from 'mapbox-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements  AfterViewInit {

  @Input()  lngLat?:  [ number, number  ];
  @ViewChild('map') divMap?:  ElementRef;


  public  zoom: number  = 13;
  // public  map?: Map;
  // public  currentLngLat :  LngLat  = new LngLat(-99.12873869142356, 19.322504201582362);


  ngAfterViewInit() {

    if  ( !this.divMap )  throw 'El elemento HTML no fue encontrado.'
    if  ( !this.lngLat )  throw 'LngLat no puede ser null.'


    //Mapa
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive:  false,  //esto va a restriginr que se pueda modificar el minimap
    });

    //Marker
    new Marker()
        .setLngLat( this.lngLat )
        .addTo( map );


  }

}
