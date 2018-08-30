import { Injectable } from '@angular/core';
import {PRIMARY_OUTLET, Router} from '@angular/router';

@Injectable()
export class RoutingService {

  constructor(private router: Router) { }

  getRouterLink() {
    const urlSeg = this.router.parseUrl(this.router.url).root.children[PRIMARY_OUTLET].segments;
    return ['/', ...urlSeg.map(item => item.path)];
  }
}
