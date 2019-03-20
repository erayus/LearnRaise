import {Component, OnInit, HostListener, OnDestroy} from "@angular/core";
import {AuthService} from "../authentication/auth-service";
import {Router, ActivatedRoute} from "@angular/router";
import {PetService} from "../shared/pet.service";
import {OwnerService} from "../shared/owner.service";
import {ServerService} from "../shared/server.service";
import {Owner} from "../shared/owner.model";
import {Pet} from "../shared/pet.model";
import {AngularFireAuth} from "angularfire2/auth"
import {Subscription} from "rxjs/Rx";


@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit, OnDestroy {
  authSub: Subscription;
  tokenSub: Subscription;

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander($event) {
    // this.exit();
  };
  @HostListener('window:load', ['$event'])
  loadHander($event) {
    this.refresh();
  };

  // exit: any = () => {
  //   this.petServ.saveLeaveTimeAndHungerTime();
  //   this.petServ.destroyPet();
  //   this.ownerServ.saveOwnerToDatabase();
  // };

  constructor(private petServ: PetService,
              private ownerServ: OwnerService,
              private serverServ: ServerService,
              private af: AngularFireAuth) {
  }
  refresh = () => {
    this.authSub = this.af.authState.subscribe(user =>{
      console.log("Auth: ", user);
      if (user && user.uid) {
        console.log('user is logged in');
        this.serverServ.setUpOwnerIdAndToken(user);
      } else {
        window.location.href = '/authentication/login';
        console.log('user not logged in');
      }
    });
    this.tokenSub = this.serverServ.onOwnerIdAndTokenReady.subscribe(
      () => {
        this.serverServ.getOwner()
          .subscribe(
            (owner: Owner) => {
              console.log("Owner: ", owner);
              this.ownerServ.initOwner(owner);
            },
            (error) => {console.log(error)}
          );
        this.serverServ.getPet()
          .subscribe(
            (pet: Pet) => {
              if (pet != null) {
                console.log("Pet: ", pet);
                this.petServ.initPet(pet);
              } else {
                alert('Pet not found in the system')
              }
            },
            (error) => {console.log(error)
          }
          )
      },
      (error) => {console.log("Fail setting up owner key", error)}
    );
  };
  ngOnInit() {
  }
  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.tokenSub.unsubscribe();
  }
}


