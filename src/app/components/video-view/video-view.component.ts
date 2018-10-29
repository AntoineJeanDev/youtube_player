import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';

// class
import { Yvideo } from 'src/app/classes/yvideo';

// service
import { UrlFormService } from 'src/app/services/urlForm.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit {
  
  // constructor
  constructor(private urlFormService: UrlFormService) { }
  
  // on init
  ngOnInit() {
    // with subject
    this.urlSubscription = this.urlFormService.urlSubject.subscribe(
      (yvideo: Yvideo) => {
        this.play(yvideo);
      }
      );
      this.urlFormService.emitUrlSubject();
    }
    
    // properties
    urlSubscription: Subscription;
    temp = '';
    repl = 'https://www.youtube.com/watch?v=';
    url: string = '';
    player: YT.Player;
    showPlayer: boolean = false;
    yvideo: Yvideo = {
      id: '',
      bookmarked: 0,
      nid: null,
    };
    
    // play video
    play(yvideo: Yvideo) {
      this.yvideo = yvideo;
      if (this.yvideo.id == '') {
        this.showPlayer = false;
      } else {
        this.showPlayer = true;
        this.temp = this.checkVideoUrl(this.yvideo.id.trim());
        this.player.loadVideoById(this.temp);
        this.player.playVideo();
      }
      
    }
    
    checkVideoUrl(url: string): string {
      return url.replace(this.repl, '').trim();
    }
    
    // youtube player functions
    savePlayer(player) {
      this.player = player;
      this.player.playVideo();
      //console.log('player instance', player);
    }
    /////////
    onStateChange(event) {
      //console.log('player state', event.data);
    }
    
  }
  