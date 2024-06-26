import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private _router!: Subscription;

  constructor( private router: Router ) {
  }

    ngOnInit() {
      this._router = this.router.events.pipe(
        filter(e => e instanceof NavigationEnd)
      ).subscribe((event) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
    }
}
