//import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, toArray } from 'rxjs';
import { Youtube } from '../model/youtube';
import { YoutubeServiceService } from '../youtube-service.service';

@Component({
  selector: 'app-view-videos',
  templateUrl: './view-videos.component.html',
  styleUrl: './view-videos.component.css'
})

export class ViewVideosComponent implements OnInit {
  filteredVideos$: Observable<Youtube[]> = of([]);
  video1$: Observable<Youtube[]> = of([]);
  addNewVideos: boolean = false;
  constructor(private youtubeService:YoutubeServiceService) { }
  ngOnInit(): void {
    this.getVideos();
  }
  getVideos() {
    this.video1$ = this.youtubeService.getVideos();
    console.log("Data1 that is video1 $ Value",this.video1$);
     this.filteredVideos$ = this.video1$;
     this.filteredVideos$.pipe(toArray());
     let insuranceArray;
     this.filteredVideos$.subscribe(insu => {
     insuranceArray = insu;
     if (insuranceArray) {
      const Array = JSON.stringify(insuranceArray);
      localStorage.setItem('employeeArray', Array);
     console.log("Data ",localStorage.getItem('employeeArray'));
    }
  // Now you have your array of values

 });
  }

  searchVideo(event: any) {
    const searchTerm = event.target.value.trim();
    if (!searchTerm) {
      this.filteredVideos$ = this.video1$;
      return;
    }
    this.filteredVideos$ = this.video1$.pipe(
      map((vid) => {
        return vid.filter(
          (vid) =>
            vid.youtubeId.toString().includes(searchTerm)
        );
      })
    );
  }

}
