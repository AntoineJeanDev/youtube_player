import { Component, OnInit } from '@angular/core';

// classes
import { Yvideo } from 'src/app/classes/yvideo';

// service
import { UrlFormService } from 'src/app/services/urlForm.service';
import { listener } from '@angular/core/src/render3';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private urlFormService: UrlFormService) { }

  ngOnInit() {
    this.getVideos();
  }

  videos: Yvideo[];
  bookmarks: Yvideo[];

  playHistoryVideo(yvideo: Yvideo): void {
    this.urlFormService.setVideo(yvideo);
  }

  getVideos(): void {
    this.urlFormService.getVideos()
      .subscribe(videos => this.videos = videos);
  }

  addBookmark(yvideo: Yvideo): void {
    this.urlFormService.setBookmark(yvideo,1)
    .subscribe(() => console.log('trying put request'));
  }

}
