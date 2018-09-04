import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BatabaseService {

  constructor(private http: Http) {}

  baseUrl = 'http://localhost:80/jala.com/src/app/db/';
  images = [];
  albums = [];
  portfolio = [];
  categories = [];
  isDataLoaded = false;
  dbRequest$: Observable<any>;

  getDataBase() {
    this.dbRequest$ = Observable.zip(this.getImages(), this.getAlbums(), this.getCategories());
    this.dbRequest$
      .subscribe(
        (data) => {
          [this.images, this.albums, this.categories] = data;
          this.isDataLoaded = true;
          // this.portfolio = this.albums.slice(1, 7);
          this.portfolio = this.categories.slice(1, 7);
        },
        (error) => {
          alert(error);
        }
      );
   }

  getImages() {
    return this.httpReq('readimages.php');
  }

  getAlbums() {
    return this.httpReq('readalbums.php');
  }

  getCategories() {
    return this.httpReq('readcategories.php');
  }

  httpReq(url, reqData = null) {
    let reqUrl = this.baseUrl + url;
    if (!(reqData === null)) {
      reqUrl = reqUrl + '?jsonData=' + JSON.stringify(reqData);
    }
    return this.http.get(reqUrl)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(`Server error! Details: ${error}`);
      });
  }


}
