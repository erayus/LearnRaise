import {Component, OnDestroy, OnInit} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {LocalStorageManager} from "../shared/localStorageManager.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  authSubscription: Subscription;
  constructor(private lsManager: LocalStorageManager,
              private router: Router,
              private af: AngularFireAuth) { }

  ngOnInit() {
    this.authSubscription = this.af.authState.subscribe(user => {
      if (user && user.uid) {
        console.log('user is logged in');
        window.location.href = "/main/petinfo"
      } else {
        console.log('user not logged in');
      }
    });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
