import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Youtube } from './model/youtube';

@Injectable({
  providedIn: 'root'
})
export class YoutubeServiceService {
  
  private url = "http://localhost:3000/youtube"; 

  constructor(private http: HttpClient) {}

  getVideos(): Observable<any> {
    return this.http.get(this.url);
  }

  getVideo(id: any): Observable<any[]> {
  //  return this.http.get(`${this.url}/${id}`).pipe(
    return this.http.get(this.url+`/${id}`).pipe(
  
      map((data: any) => {
        // If the response is an array, return it as is
        if (Array.isArray(data)) {
          return data;
        } else {
          // If the response is a single object, wrap it in an array
          return [data];
        } 
      })
    );
  }

  addVideos(youtubeData: Youtube): Observable<any> {
    return this.http.post(this.url, youtubeData);
  }
}











