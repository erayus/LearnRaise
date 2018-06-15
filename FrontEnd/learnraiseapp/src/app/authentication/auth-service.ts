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
          this.serverServ.getTokenReady();
          this.serverServ.setUpOwnerKey();
          const user = response;
          // Initiate owner in OwnerService and create Owner table in the database
          const ownerData = this.ownerServ.createOwnerWithIdAndEmail(user.uid, user.email);
          let ownerKey = null;
          //Add owner first and then use owner's key to add pet and stomach
          this.serverServ.addOwner(ownerData).subscribe(
            (response) =>{
              ownerKey = response.name;
              // Initiate petObj in PetService and create Pet table
              const petData = this.petServ.createPetWithId(user.uid);
              // Add pet to the database using ownerKey
              this.serverServ.addPet( ownerKey, petData).subscribe();
              // Add example food to stomach in the database using ownerKey
              const exampleFood = new Food('example', 'noun', 'This is an example', 'This is an example of an example');
              this.serverServ.addFood(ownerKey,exampleFood).subscribe(
                console.log
              );
              // Give access to the next routes
              this.loggedIn = true;
              // Navigate to petquizz
              this.router.navigate(['/adoption', 'petquizz', 'page1'])

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
          // this.setUpToken();
          // Navigate to main component
          // this.router.navigate(['/main']);
          window.location.href = "/main";
        }
      )
      .catch(
        error => this.onErrorSignIn.next(error.message)
    )
  }
  // loginGoogle(provider) {
  //   this.afAuth.auth.signInWithPopup(provider).then(
  //     (userInfo) => {
  //       this.router.navigate(['/adoption', 'petquizz', 'page1']);
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
  // getToken() {
  //   firebase.auth().currentUser.getIdToken()
  //     .then(
  //       (token: string) => this.token = token
  //     );
  //   console.log(this.token);
  //   return this.token;
  // }
  isAuthenticated() {
    return this.loggedIn;
  }


}
