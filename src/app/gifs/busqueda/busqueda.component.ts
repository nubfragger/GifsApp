import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar() {
    const v = this.txtBuscar.nativeElement.value;
    if (v.trim().length !== 0) {
      this.GifsService.buscarGifs(v);
    } else return;
    this.txtBuscar.nativeElement.value = '';
  }

  constructor(private GifsService: GifsService) {}
}
