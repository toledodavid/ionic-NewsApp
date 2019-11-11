import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines(){
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=13543b43dd0f4d819b36fdda8d4cb071`);
  }

}
