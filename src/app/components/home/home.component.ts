import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { VideoService } from '../../services/video.service';
import { VideoItem } from '../../interfaces/video-item.interface';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  displayedColumns: string[] = [ 'thumbnail', 'title', 'details', 'favorite'];
  allDataArr: VideoItem[] = new Array();
  pageDataArr: VideoItem[] = new Array();
  vidIdArr: string[] = new Array();
  pagesTokensArr: string[] = new Array();
  dataSource: MatTableDataSource<VideoItem>;

  resultsLength: number;
  resultsPerPage: number;
  nextToken = '';
  prevToken = '';
  // For loader
  isLoadingResults = false;

  // favorites
  isAddedToFav = false;
  favActiveText = 'Added to favorites';
  favInActiveText = 'Add to favorite list';
  favActiveIcon = 'favorite';
  favInActiveIcon = 'favorite_border';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private videoService: VideoService
  ) {}


  ngOnInit(): void {

    this.isLoadingResults = true;
    // Load first page
    this.getList();
    if ( this.dataSource ) {
      this.dataSource.paginator = this.paginator;
    }
    setTimeout( () => {
      // Hide loader
      this.isLoadingResults = false;
    }, 2000);
  }


  // Getting List through videos service
  getList(pageToken?): void {

    // Channel ID
    const channelId = 'UCxIctqcL7--ch_L9r2sM9Gw';

    // Subscribing to video servcice to getVideos related to that channel
    this.videoService.getVideos(channelId, pageToken).subscribe( searchResp => {
      // console.log(searchResp);
      this.pageDataArr = new Array();

      // Getting pages info if ONLY First Page in pagination
      if (!pageToken){
        this.resultsLength = searchResp.pageInfo.totalResults;
        this.resultsPerPage = searchResp.pageInfo.resultsPerPage;
      } else {
        if ( !this.pagesTokensArr.includes(pageToken) && pageToken ){
          this.pagesTokensArr.push(pageToken);
        }
      }

      // Looping over search response items
      for ( const item of searchResp.items ) {
        const videoObj = {
          title: item.snippet.title.toString()
                                   .replace(/&quot;/g, '"')
                                   .replace(/&amp;/, '&')
                                   .replace(/&#39;/, '\''),
          thumbnail: item.snippet.thumbnails.default.url.toString(),
          details: item.id.videoId.toString(),
          favorite: this.checkLocalStorage(item.id.videoId.toString())
        };

        if (this.allDataArr) {
          if ( !this.vidIdArr.includes(videoObj.details) ) {
            this.vidIdArr.push(videoObj.details);
            this.allDataArr.push(videoObj);
            this.pageDataArr.push(videoObj);
          }else{
            if ( this.pagesTokensArr.includes(pageToken) ){
              this.pageDataArr.push(videoObj);
            }else{
              continue;
            }
          }
        }

      }

      // console.log('Total items: ' + this.resultsLength);
      // console.log('Results per page: ' + this.resultsPerPage);
      // console.log('Actual Number of items in current page: ' , searchResp.items);
      // console.log('Page Data array: ' , this.pageDataArr);
      // console.log('All Data array: ' , this.allDataArr);

      // Update next and prev token if Exists in every page
      if (searchResp.nextPageToken){
        this.nextToken = searchResp.nextPageToken;
      }
      if (searchResp.prevPageToken){
        this.prevToken = searchResp.prevPageToken;
      }
      // console.log('Next page Token: ' + this.nextToken);
      // console.log('Prev page Token: ' + this.prevToken);
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(this.pageDataArr);
      // Linking paginator and sorting to datatable
      if ( this.dataSource ) {
        this.dataSource.sort = this.sort;
      }
    });
    // console.log(this.pagesTokensArr);

  }

  // UTILITY METHODS
  // Used in "this.pageDataArr" setting up in favorite property to make dataSource
  checkLocalStorage(videoId: string): boolean {
    for (const item of this.pageDataArr) {
      const localStorageItem = localStorage.getItem(`${videoId}fav`);
      if ( localStorageItem !== null){
        return true;
      }else{
        return false;
      }
    }
  }

  // Filtering datatable Event handler
  applyFilter(event: Event): void {
    // Getting filter element value
    const filterValue = (event.target as HTMLInputElement).value;
    // Start filtering
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filteredData = this.allDataArr;
    // Always go to the first page while filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Handling pagination event
  loadNextPrevPage(e): void {
    if (e.previousPageIndex < e.pageIndex){
      // alert('going forward');
      this.getList(this.nextToken);
    }
    if (e.previousPageIndex > e.pageIndex){
      // alert('going back');
      this.getList(this.prevToken);
    }
  }

  // Add video to favorite list (from the videos list)
  addToFav(event: Event, videoId: string): void {
    (event.target as HTMLElement).setAttribute('data-fav', this.checkLocalStorage(videoId).toString());
    if (this.checkLocalStorage(videoId)){
      localStorage.removeItem(videoId + 'fav');
    }else{
      localStorage.setItem(videoId + 'fav', videoId);
    }
  }
}
