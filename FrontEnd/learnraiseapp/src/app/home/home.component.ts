import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {LocalStorageManager} from "../shared/localStorageManager.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isUserSignedIn = false;
  constructor(private lsManager: LocalStorageManager,
              private router: Router,
              private af: AngularFireAuth) { }

  ngOnInit() {
    this.af.authState.subscribe(user =>{
      console.log("Auth: ", user);
      if (user && user.uid) {
        console.log('user is logged in');
        this.isUserSignedIn = true;
        window.location.href = "/main/petinfo"
      } else {
        console.log('user not logged in');
      }
    });

  }
}
