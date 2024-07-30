import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

import { Router } from "@angular/router";
import { Youtube } from "../model/youtube";
import { YoutubeServiceService } from "../youtube-service.service";

@Component({
  selector: 'app-add-videos',
  templateUrl: './add-videos.component.html',
  styleUrl: './add-videos.component.css'
})
export class AddVideosComponent  implements OnInit {
  videoForm!: FormGroup;
  @Output() addVideos = new EventEmitter<Youtube>();

  constructor(private fb: FormBuilder,
              private youtubeService:YoutubeServiceService, 
              private router:Router ) {}

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      youtubeId: ["", [Validators.required,this.uniqueValidator]],
      videoName: ["", [Validators.required, ]],
      title: ["", [Validators.required]],
      videoType: ["", [Validators.required]],
      dateOfPost: ["", [Validators.required,this.dateValidator]],
      videosRating: ["", [Validators.required]],
    });
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
    return null;
  }

  uniqueValidator (control: AbstractControl): ValidationErrors | null  {
    const youtubeId = control.value;
    let value=JSON.parse(localStorage.getItem('youtube') || '{}');
    if(Array.isArray(value)){
      const youtubeIds = value.map((id:any) => id.youtubeId);
    // Simulate a list of existing student IDs (replace with your own data source)
     if (youtubeId.includes(youtubeId)) {
       return { unique: true }; // Validation failed because the ID is not unique
     } 
    }
      return null; // Validation passed, ID is unique    
  }

  // Function to submit the form
  onSubmit() {
    if (this.videoForm.valid) {
      // Form is valid, you can submit it
      this.youtubeService.addVideos(this.videoForm.value).subscribe((res) => {
        this.router.navigateByUrl('video-list')
      });
     
    } else {
 
    }
  }

}

