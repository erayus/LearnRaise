import {Component, OnDestroy, OnInit} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  loading =  true;
  authSubscription: Subscription;
  constructor( private router: Router,
              private af: AngularFireAuth) { }

  ngOnInit() {
    this.authSubscription = this.af.authState.subscribe(user => {
      if (user && user.uid) {
        window.location.href = "/main/petinfo"
      } else {
        this.loading = false;
      }
    });
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
