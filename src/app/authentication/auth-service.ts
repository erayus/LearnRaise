// import * as firebase from 'firebase';
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs";
import {ServerService} from "../shared/server.service";
import {PetService} from "../shared/pet.service";
import {Food} from "../shared/food.model";
import {OwnerService} from "../shared/owner.service";
import {AngularFireAuth} from "angularfire2/auth"
import {LocalStorageManager} from "../shared/localStorageManager.service";
import {Owner} from "../shared/owner.model";
import * as firebase from 'firebase/app'

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
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  };

  signinUser (email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
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
    this.serverServ.deleteToken();
    setTimeout(() => {
      this.afAuth.auth.signOut();
      this.loggedIn = false;
      window.location.href = "/authentication/login";
    }, 2000);
  }


  isAuthenticated() {
    return this.loggedIn;
  }


}
