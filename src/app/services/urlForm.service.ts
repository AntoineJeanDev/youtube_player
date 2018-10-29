import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// class
import { Yvideo } from 'src/app/classes/yvideo';

// local storage service
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class UrlFormService {
  constructor(
    private http: HttpClient,
    protected localStorage: LocalStorage
    ) { }

  // properties
  private apiUrl2 = 'http://localhost:8080/silex/youtube-player-silex/web/index.php';
  private apiUrl = 'http://localhost:8000/index.php';
  private httpOptions = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
  private httpOptions2 = {headers: {'Content-Type': 'application/json'}};
  ////// delivery
  urlSubject = new Subject<Yvideo>();
  private yvideo: Yvideo = {
    id: '',
    bookmarked: 0,
    nid: null,
  }
  videos: Yvideo[];
  bookmarks: Yvideo[];
  lSS: number;
  lSLength: number;


  //
  localStorageCheck(): number {
    if (window.localStorage)
      if (localStorage.length > 0) {
        console.log('Storage is not empty');
        this.lSS = window.localStorage.length;
        return this.lSS;  
      }
    console.log('storage empty');
    return this.lSS;  
  }

  // get all videos
  getVideos(): Observable<Yvideo[]> {
    return this.http.get<Yvideo[]>(this.apiUrl + "/api/videos", this.httpOptions)
      .pipe(
      catchError(this.handleError('getVideos', []))
      );
  }

  // get all bookmarks
  getBookmarks(): Observable<Yvideo[]> {
    return this.http.get<Yvideo[]>(this.apiUrl + "/api/bookmarks", this.httpOptions)
      .pipe(
      catchError(this.handleError('getBookmarks', []))
      );
  }

  // history a video
  addVideo(yvideo: Yvideo): Observable<Yvideo> {
    let body = `id=${yvideo.id}&bookmarked=${yvideo.bookmarked}`;
    return this.http.post<Yvideo>(this.apiUrl + "/api/videos", body, this.httpOptions)
    .pipe(
      tap((yvideo: Yvideo) => console.log(`added post`)),
      catchError(this.handleError<Yvideo>('addVideo'))
    );
  }

  // set a bookmark 1/0
  setBookmark(yvideo: Yvideo, v: number): Observable<any>{
    let body = `v=${v}`;
    console.log(yvideo);
    console.log('body:'+ body);
    return this.http.put(this.apiUrl + '/api/bookmarks/' + yvideo.nid, body, this.httpOptions)
    .pipe(
      tap(_ => console.log(`updated hero id=${yvideo.id}`)),
      catchError(this.handleError<any>('setBookmark'))
    );
  }

  // emi next
  emitUrlSubject() {
    this.urlSubject.next(this.yvideo);
  }

  // to get object from search-bar component
  setVideo (yvideo: Yvideo) {
    this.yvideo = yvideo;
    localStorage.setItem(yvideo.id, JSON.stringify(yvideo));
    this.getLocalStorageL();
    this.emitUrlSubject();
  }

  // return Yvideo Object as an observable
  getYvideo(): Observable<Yvideo> {
    return of(this.yvideo);
  }

  getLocalStorageL(): Observable<number> {
    this.lSLength = localStorage.length;
    return of(this.lSLength);
  }

  ////// DEBUG FUNCTIONS
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}