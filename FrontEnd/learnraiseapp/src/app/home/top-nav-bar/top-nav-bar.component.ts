import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../authentication/auth-service";
import {Subscription} from "rxjs";
import * as firebase from 'firebase';
import {Router} from "@angular/router";

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.css']
})
export class TopNavBarComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {


  }
  ngOnDestroy() {
  }


  onToSignIn() {
    this.router.navigate(['/authentication/login'])
  }

}
