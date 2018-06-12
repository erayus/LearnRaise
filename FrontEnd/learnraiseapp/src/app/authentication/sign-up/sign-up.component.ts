import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit, OnDestroy {
  errorSubscription: Subscription;
  errorMessage = 'none';
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.errorSubscription =  this.authService.onErrorSignUp.subscribe(
      (error: string) => this.errorMessage = error
    );
  }
  onSignUp(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password);
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
  changeToLogIn(){
    this.router.navigate(['authentication/login']);
  }
}
