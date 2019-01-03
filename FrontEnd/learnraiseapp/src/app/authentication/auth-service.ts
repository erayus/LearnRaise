// import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import {ServerService} from "../shared/server.service";
import {PetService} from "../shared/pet.service";
import {Food} from "../shared/food.model";
import {OwnerService} from "../shared/owner.service";
import {AngularFireAuth} from "angularfire2/auth"
import {LocalStorageManager} from "../shared/localStorageManager.service";
import {Owner} from "../shared/owner.model";

@Injectable()
export class AuthService {
  private loggedIn = false;
  onErrorSignIn = new Subject<string>();
  onErrorSignUp = new Subject<string>();
  constructor (private router: Router,
               private ownerServ: OwnerService,
               private petServ: PetService,
               private serverServ: ServerService,
               private afAuth: AngularFireAuth,
               ) {
  }

  signupUser (email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(
        (response) => {
          // Set up token  Server Service (IMPORTANCE: should be put here before creating owner and pet)
          this.serverServ.setUpOwnerIdAndToken();
          const user = response;
          // Initiate owner in OwnerService and create Owner table in the database
          const ownerData = this.ownerServ.createOwnerWithIdAndEmail(user.uid, user.email);
          //Add owner first and then use owner's key to add pet and stomach
          this.serverServ.addOwner(user.uid, ownerData).subscribe(
            (response) =>{
              // Initiate petObj in PetService and create Pet table
              const petData = this.petServ.createPetWithId(user.uid);
              // Add pet to the database using user Id
              this.serverServ.addPet( user.uid, petData).subscribe();
              // Add example food to stomach in the database using user Id
              const exampleFood = new Food('example', 'noun', 'This is an example', 'This is an example of an example');
              this.serverServ.addFood(user.uid,exampleFood).subscribe(
                console.log
              );
              // Give access to the next routes
              this.loggedIn = true;
              // Navigate to petquizz
              this.router.navigate(['/adoption', 'story'])
            },
          (error)=>{ console.log(error)}
          );

        }
    ).catch(
          (error) => this.onErrorSignUp.next(error.message)
      )
  };
  signinUser (email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        response => {
          // Give access to next routes
          this.loggedIn = true;
          //Set up TokenAndUserId
          // Navigate to main component

          this.router.navigate(['/main']);
        }
      )
      .catch(
        error => this.onErrorSignIn.next(error.message)
    )
  }
  // loginGoogle(provider) {
  //   this.afAuth.auth.signInWithPopup(provider).then(
  //     (userInfo) => {
  //       this.router.navigate(['/adoption', 'story']);
  //       console.log(userInfo);
  //     });
  // }
  logOut() {
    this.petServ.saveLeaveTimeAndHungerTime();
    this.petServ.destroyPet();
    this.ownerServ.destroyOwner();
    window.location.href = '/';
    this.afAuth.auth.signOut();
    this.loggedIn = false;
  }
  isAuthenticated() {
    return this.loggedIn;
  }


}
