import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from "@angular/core";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {AuthService} from "../auth-service";
import {Router} from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertifyService } from "app/shared/alertify.service";
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
  loading = true;
  authSubscription: Subscription;
  // isSigningIn = true;
  // googleProvider: any;
  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit() {
    // this.authSubscription = this.af.authState.subscribe(user => {
    //   if (user && user.uid) {
    //     console.log('user is logged in');
    //     window.location.href = "/main/petinfo";
    //   } else {
    //     this.loading = false;
    //     console.log('user not logged in');
    //   }
    // });
    // // this.googleProvider =  new firebase.auth.GoogleAuthProvider;
    // this.errorSignInSubscription =  this.authService.onErrorSignIn.subscribe(
    //   (error: string) => this.errorMessage = error
    // );
    // this.errorSignUpSubscription =  this.authService.onErrorSignUp.subscribe(
    //   (error: string) => this.errorMessage = error
    // );
  }
  ngOnDestroy() {
    // this.authSubscription.unsubscribe();
  }
  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.alertify.success("Verifying...");
    this.authService.signinUser(email, password).then(
      response => {
        // Give access to next routes
        // this.loggedIn = true;
        // Set up TokenAndUserId
        // Navigate to main component
        this.alertify.success("Verified! Connecting to your pet")
       this.router.navigate(['/main']);
      }
    )
      .catch(
        error => this.errorMessage = error.message
  );
  }
  changeToSignUp() {
    this.router.navigate(["/authentication/signup"])
  }
}

