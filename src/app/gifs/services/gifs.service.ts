import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.intaface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "Qim62OOCROdMccRjcgiyOemT70asojdt";
  private servicioURL: string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe(resp => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })
  }

}

/*
  Otra forma de tener un localstorage
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }
  Forma basica de hacer una peticion a una url
    fetch(`${this.servicioURL}/search`, {params})
      .then( resp => {
      resp.json().then(data => {
        console.log(data);
      })
    })
*/
