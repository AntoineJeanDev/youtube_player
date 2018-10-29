import { Component, OnInit } from '@angular/core';

// classes
import { Yvideo } from 'src/app/classes/yvideo';

// service
import { UrlFormService } from 'src/app/services/urlForm.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor(private urlFormService: UrlFormService) { }

  ngOnInit() {
    this.getBookmarks();
  }

  bookmarks: Yvideo[];
  videos: Yvideo[];

  getBookmarks(): void {
    this.urlFormService.getBookmarks()
      .subscribe(yvideo => this.bookmarks = yvideo);
  }

  deleteBookmark(yvideo: Yvideo): void {
    this.urlFormService.setBookmark(yvideo,0)
    .subscribe(() => console.log('trying put request'));
  }

}
