import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageManager} from "../shared/localStorageManager.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  backToHome() {
    this.router.navigate(['']);
  }

}
