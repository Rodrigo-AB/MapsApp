import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  // selector: 'app-alone-page', para esta parte no lo vamos a ocupar
  standalone: true,
  imports: [  CounterAloneComponent,  SideMenuComponent  ], //Por lo general, aqui va el Common Modulo el cual nos permite poner el ngif, ngfor etc.  //Aqui llamamos nuestro otro alone component
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {
  //! Parte IMPORTANTE de un standalone component es que puedan sobrevivir por si mismos, sin que los tengamos que declarar en el app.module, es un archivo que esta flotando en el proyectop de angular
  //! asi mimsmo, pordemos pensar que un stand alone componente es un componente que a su vez es un modulo

}
