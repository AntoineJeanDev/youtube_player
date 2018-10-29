import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription, of, Observable } from 'rxjs';

// class
import { Yvideo } from 'src/app/classes/yvideo';

// service
import { UrlFormService } from 'src/app/services/urlForm.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private urlFormService: UrlFormService) { }

  ngOnInit() {
    // with subject
    this.urlSubscription = this.urlFormService.urlSubject.subscribe(
      (yvideo: Yvideo) => {
        
      }
    );
    this.urlFormService.emitUrlSubject();
    if (window.localStorage) {
      console.log('localstorage supported');
    }

    this.getLSLength();
   }

  urlSubscription: Subscription;
  yvideo: Yvideo = {
    id: '',
    bookmarked: 0,
    nid: null,
  }
  videos: Yvideo[];
  lSLength: number;

  setUrl() {
    this.yvideo.id = this.urlForm.get('id').value;
  };

  urlForm = new FormGroup({
    id : new FormControl('' , Validators.required),
  });
  
  onSubmit() {
    this.setUrl();
    this.urlFormService.setVideo(this.yvideo);
    this.bookmarkVideo(this.yvideo.id,this.yvideo.bookmarked);
  }

  bookmarkVideo(id: string, bookmarked: number): void {
    id = id.trim();

    if (!id) { return; }
    this.urlFormService.addVideo({id, bookmarked} as Yvideo)
      .subscribe(yvideo => {
        /*this.urlFormService.videos.push(yvideo)*/;
      });
  }

  getLSLength(): void {
    this.urlFormService.getLocalStorageL()
    .subscribe(n => this.lSLength = n);
  }

}
