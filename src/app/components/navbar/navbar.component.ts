import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isCollapsed = true;
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  isLoggedIn = false

  constructor(
    private _Router: Router,
    public location: Location
  ) { }

  ngOnInit() {

    this._Router.events.subscribe((event) => {
      this.isCollapsed = true;
      console.log('hello')
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    if (localStorage.getItem('token')) {
      this.isLoggedIn = true
    }

  }

  onLogout() {
    this.isLoggedIn = false
    localStorage.clear()
    this._Router.navigate(['/'])
  }

  onClose() {
    this.isCollapsed = true
  }

}
