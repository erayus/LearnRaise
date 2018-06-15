import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {LocalStorageManager} from "../shared/localStorageManager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private lsManager: LocalStorageManager) { }

  ngOnInit() {
  //   //Check if the user has signed out last time visiting page
  //     if (this.lsManager.getUserInfo()) { // If not signed out
  //       //Get user info from LS
  //       const userInfo = this.lsManager.getUserInfo();
  //       const currentTime = Date.now();
  //
  //       // and if token not expired
  //       if (currentTime < userInfo.stsTokenManager.expirationTime) {
  //         window.location.href = '/main/petinfo';
  //       }
  //     }
  }
}
