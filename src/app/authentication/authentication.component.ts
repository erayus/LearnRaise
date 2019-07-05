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
             ) { }

  ngOnInit() {

  }
  backToHome() {
    this.router.navigate(['/']);
  }
  ngOnDestroy(): void {
    // this.authSubscription.unsubscribe()
  }

}
