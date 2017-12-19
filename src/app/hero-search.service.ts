import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Hero} from './hero';

@Injectable()
export class HeroSearchService {

  constructor(private http: Http) {
  }

  // 一个可观察对象是一个事件流，可以用数组型操作符来处理它
  search(term: string): Observable<Hero[]> {
    return this.http
      .get(`api/heroes/?name=${term}`)
      .map(response => response.json() as Hero[]);
  }
}
