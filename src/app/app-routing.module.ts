import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewVideosComponent } from './view-videos/view-videos.component';
import { AddVideosComponent } from './add-videos/add-videos.component';
import { ViewVideoDetailsComponent } from './view-video-details/view-video-details.component';

const routes: Routes = [  
  { path: 'video-list', component: ViewVideosComponent },
  { path: 'video-details/:id', component: ViewVideoDetailsComponent },
  { path: 'video-form', component: AddVideosComponent },
  { path: '', redirectTo: '/video-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
