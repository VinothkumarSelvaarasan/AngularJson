import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Youtube } from '../model/youtube';
import { YoutubeServiceService } from '../youtube-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-video-details',
  templateUrl: './view-video-details.component.html',
  styleUrl: './view-video-details.component.css'
})
export class ViewVideoDetailsComponent implements OnInit {
  videos$: Observable<Youtube[]> = of([]);
  constructor(private youtubeService: YoutubeServiceService,
    private route: ActivatedRoute){
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
     this.getVideo(id);
    });
  }
  getVideo(id: any) {
    this.videos$ = this.youtubeService.getVideo(id);
  }
}

