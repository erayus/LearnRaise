import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  loading = true;
  constructor(private router: Router,
              private af: AngularFireAuth) { }

  ngOnInit() {
    this.authSubscription = this.af.authState.subscribe(user => {
      if (user && user.uid) {
        console.log('user is logged in');
        window.location.href = "/main/petinfo";
      } else {
        this.loading = false;
        console.log('user not logged in');
      }
    });
  }
  backToHome() {
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

}
