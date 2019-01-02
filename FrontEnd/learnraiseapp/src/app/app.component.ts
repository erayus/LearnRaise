import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LearnRaise';

  ngOnInit() {
    // firebase.initializeApp({
    //   apiKey: "AIzaSyAmTvyAclUrOYY42j-FSXdJRVdg_dAGzBA",
    //   authDomain: "learnraise.firebaseapp.com",
    //   databaseURL: "https://learnraise.firebaseio.com"
    // });
    console.log("Checking");
  };
}
