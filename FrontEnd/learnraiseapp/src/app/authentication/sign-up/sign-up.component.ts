import {Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth-service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {ServerService} from "../../shared/server.service";
import {OwnerService} from "../../shared/owner.service";
import {PetService} from "../../shared/pet.service";
import {allResolved} from "q";
import {_catch} from "rxjs-compat/operator/catch";
declare var $: any;
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
              private router: Router,
              private serverServ: ServerService,
              private ownerServ: OwnerService,
              private petServ: PetService) { }

  ngOnInit() {
    // this.errorSubscription =  this.authService.onErrorSignUp.subscribe(
    //   (error: string) => this.errorMessage = error
    // );
  }
  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signupUser(email, password).then(
      (response) => {
            // Set up token  Server Service (IMPORTANCE: should be put here before creating owner and pet)
            const user = response.user;
            console.log("user ID after signing up", user.uid);
            this.serverServ.setUpOwnerIdAndToken(user);
            // Initiate owner in OwnerService and create Owner table in the database
            const ownerData = this.ownerServ.createOwnerWithIdAndEmail(user.uid, user.email);
            // Add owner first and then use owner's key to add pet and stomach
            this.serverServ.addOwner(user.uid, ownerData).subscribe(
              (response) => {
                // Initiate petObj in PetService and create Pet table
                const petData = this.petServ.createPetWithId(user.uid);
                console.log("Pet", petData);
                // Add pet to the database using user Id
                this.serverServ.addPet(user.uid, petData).subscribe(() => {
                  // this.loggedIn = true;
                  // Navigate to petquizz
                  window.location.href = "/adoption/story";
                });
              },
              (error) => {console.log(error)}
            );
          }
        ).catch(
          error => {
            this.errorMessage = error.message;
          }
     )
  }

  ngOnDestroy() {
    // this.errorSubscription.unsubscribe();
  }
  changeToLogIn() {
    this.router.navigate(['authentication/login']);
  }
}
