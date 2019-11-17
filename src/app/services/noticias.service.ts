import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RespuestaTopHeadlines} from '../interfaces/interfaces';
import { environment } from '../../environments/environment';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
    this.headlinesPage++;

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headlinesPage}`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=13543b43dd0f4d819b36fdda8d4cb071`);
  }

  getTopHeadlinesCategoria(categoria: string){
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);
    //this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=13543b43dd0f4d819b36fdda8d4cb071`);
  }

}
