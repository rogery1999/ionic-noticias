import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/noticias.interface';
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  api_key         : string = environment.api_key;
  api_url         : string = environment.api_url;
  headlinePage    : number = 0;
  categoriaActual : string = '';
  categoriaPage   : number = 0;

  get basicParams() : HttpParams {
    return new HttpParams()
            .set('country', 'us')
            .set('apiKey', this.api_key);
  }

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(): Observable<RespuestaTopHeadlines>{
    this.headlinePage++;
    // const params = this.basicParams.set('page', this.headlinePage.toString());
    // return this.http.get<RespuestaTopHeadlines>(`${ this.api_url }/top-headlines`, { params }).pipe( delay(3000) );
    return this.getJsonNoticias().pipe( delay(3000) );
  }

  getNoticiasPorCategoria( categoria: string ){
    this.controlEstadoCategoria( categoria );
    // const params = this.basicParams.set('category', categoria).set('page', this.categoriaPage.toString());
    // return this.http.get<RespuestaTopHeadlines>(`${ this.api_url }/top-headlines`, { params }).pipe( delay(1500) );
    return this.getJsonNoticias().pipe( delay(1500) );
  }

  controlEstadoCategoria( categoria: string ): void{
    if( this.categoriaActual === categoria  ){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
  }

  getJsonNoticias(): Observable<RespuestaTopHeadlines>{
    return this.http.get<RespuestaTopHeadlines>('assets/data/news/noticias.json');
  }

}
