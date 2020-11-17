import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private API_KEY = 'AIzaSyADgbCb_B6DWQ0X5uZmmN-DeRJ4bk7aafc';

  constructor( private http: HttpClient )  {
  }


  getVideos(channelId, pageToken?, pageSize = 15, orderBy = 'title'): Observable<any> {
    let endpoint = '';
    if (pageToken){
      endpoint = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${channelId}&part=snippet&maxResults=${pageSize}&type=video&order=${orderBy}&pageToken=${pageToken}`;
    }else{
      endpoint = `https://www.googleapis.com/youtube/v3/search?key=${this.API_KEY}&channelId=${channelId}&part=snippet&maxResults=${pageSize}&type=video&order=${orderBy}`;
    }
    return this.http.get(endpoint);
  }
  getVideoDetails(videoId): Observable<any> {
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?key=${this.API_KEY}&id=${videoId}&part=id,snippet,contentDetails,player,statistics`;
    return this.http.get(endpoint);
  }

}
