import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { StorageMap } from '@ngx-pwa/local-storage';

// Services
import { VideoService } from '../../services/video.service';

// Components
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  // loader
  isLoadingResults = false;
  // video id
  videoId: string;

  // favorites
  isAddedToFav = false;
  favActiveText = 'Added to favorites';
  favInActiveText = 'Add to favorite list';
  favActiveIcon = 'favorite';
  favInActiveIcon = 'favorite_border';

  // dataObj for formating data shape
  dataObj: {};


  // Rating
  @Input() rating = 0;
  @Input() starCount = 5;
  @Input() color = 'accent';
  @Output() ratingUpdated = new EventEmitter();

  snackBarDuration = 2000;
  ratingArr = [];


  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.isLoadingResults = true;

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    // getting the video id from the route parameters map object
    this.route.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      // getting video details
      this.videoService.getVideoDetails(this.videoId).subscribe( detailsResp => {
        // converting Duration time from PT format to MM:SS
        const durationArr = detailsResp.items[0].contentDetails.duration
                                                          .toLowerCase()
                                                          .replace('pt', '')
                                                          .replace('m', ',')
                                                          .replace('s', '')
                                                          .split(',');
        let durationString = '';
        if ( durationArr.length > 1 ){
          durationString = `${ Number(durationArr[1]) < 9 ?
                           '0' + durationArr[1].toString() : durationArr[1].toString()}:${ Number(durationArr[0]) < 9 ?
                           '0' + durationArr[0].toString() : durationArr[0].toString()}`;
        }else{
          durationString = `00:${ Number(durationArr[0]) < 9 ?
                           '0' + durationArr[0].toString() : durationArr[0].toString()}`;
        }
        // filling the data object with data
        this.dataObj = {
          title: detailsResp.items[0].snippet.title,
          publishDate: detailsResp.items[0].snippet.publishedAt,
          duration: durationString,
          likeCount: detailsResp.items[0].statistics.likeCount,
          viewCount: detailsResp.items[0].statistics.viewCount,
          favoriteCount: detailsResp.items[0].statistics.favoriteCount,
          commentCount: detailsResp.items[0].statistics.commentCount,
          description: detailsResp.items[0].snippet.description,
          thumbnail: detailsResp.items[0].snippet.thumbnails.maxres ?
                     detailsResp.items[0].snippet.thumbnails.maxres.url : detailsResp.items[0].snippet.thumbnails.high.url,
        };
      });
    });
    // getting rating from local storage
    this.rating = localStorage.getItem(this.videoId + 'rate') ? Number(localStorage.getItem(this.videoId + 'rate')) : 0;
    // getting rating from local storage
    this.isAddedToFav = localStorage.getItem(this.videoId + 'fav') ? true : false;
    // stop the loader in the end
    setTimeout( () => {
      // Hide loader
      this.isLoadingResults = false;
    }, 2000);
  }

  // Set Rating
  onRating(rating: number): any {
    this.snackBar.open('You\'ve just rated this video ' + rating + ' Stars', '', {
      duration: this.snackBarDuration
    });
    this.rating = rating;
    localStorage.setItem(this.videoId + 'rate', this.rating.toString());
    return false;
  }
  // Rating UI behavior change on click a star
  showIcon(index: number): string {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  // add video to favorite list
  addToFav(event: Event): void {
    this.isAddedToFav = !this.isAddedToFav;
    (event.target as HTMLElement).setAttribute('data-fav', this.isAddedToFav.toString());
    if (!this.isAddedToFav){
      localStorage.removeItem(this.videoId + 'fav');
      this.snackBar.open('You\'ve removed this video from your favorite list', '', {
        duration: this.snackBarDuration
      });
    }else{
      localStorage.setItem(this.videoId + 'fav', this.videoId);
      this.snackBar.open('You\'ve added this video to your favorite list', '', {
        duration: this.snackBarDuration
      });
    }
  }


}
