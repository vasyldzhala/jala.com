import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable()
export class ScrollService {

  private rend: Renderer2;
  haveToScrollToApp = false;
  haveToFixNavbar = false;

  constructor(rendererFactory: RendererFactory2) {
    this.rend = rendererFactory.createRenderer(null, null);
  }

  preventWindowScrolling() {
    const body = document.querySelector('body');
    this.rend.setStyle(body, 'overflow-y', 'hidden');
  }

  allowWindowScrolling() {
    const body = document.querySelector('body');
    this.rend.setStyle(body, 'overflow-y', 'scroll');
  }

  fixNavbar() {
    this.haveToFixNavbar = true;
    // console.log('fixNavbar');
    const placeholder = document.querySelector('#main-navbar-placeholder');
    if ( placeholder.clientHeight === 0 ) {
      // console.log('fixNavbarDo!');
      const el = document.querySelector('#main-navbar');
      this.rend.addClass(el, 'navbar-fixed-top');
    }
  }

  unfixNavbar() {
    this.haveToFixNavbar = false;
    const placeholder = document.querySelector('#main-navbar-placeholder');
    if ( placeholder.clientHeight === 0 ) {
      const el = document.querySelector('#main-navbar');
      this.rend.removeClass(el, 'navbar-fixed-top');
    }
  }

  scrollToApp() {
    document.querySelector('#app')
      .scrollIntoView({block: 'start', behavior: 'smooth'});
  }

}
