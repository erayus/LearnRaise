import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../auth-service";
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogInComponent implements OnInit, OnDestroy {

  @ViewChild('fIn') form: NgForm;
  errorSignInSubscription: Subscription;
  errorSignUpSubscription: Subscription;
  errorMessage = 'none';
  // isSigningIn = true;
  // googleProvider: any;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    // // this.googleProvider =  new firebase.auth.GoogleAuthProvider;
    // this.errorSignInSubscription =  this.authService.onErrorSignIn.subscribe(
    //   (error: string) => this.errorMessage = error
    // );
    // this.errorSignUpSubscription =  this.authService.onErrorSignUp.subscribe(
    //   (error: string) => this.errorMessage = error
    // );
  }
  ngOnDestroy() {

  }
  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password).then(
      response => {
        // Give access to next routes
        // this.loggedIn = true;
        // Set up TokenAndUserId
        // Navigate to main component
        this.router.navigate(['/main']);
      }
    )
      .catch(
        error => this.errorMessage = error.message
  );
  }
  // onLogInGoogle() {
  //   document.body.classList.remove('modal-open');
  //   const shadowEl = document.getElementsByClassName('modal-backdrop');
  //   shadowEl[0].remove();
  //   this.authService.loginGoogle(this.googleProvider);
  // }
  changeToSignUp() {
    this.router.navigate(["/authentication/signup"])
  }
}

