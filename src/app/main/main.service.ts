import {Food} from "../shared/food.model";
import {Injectable} from "@angular/core";
import {ServerService} from "../shared/server.service";
import {PetService} from "../shared/pet.service";
import {OwnerService} from "../shared/owner.service";
import {StomachService} from "./content/stomach/stomach.service";
import {AuthService} from '../authentication/auth-service';
import {Subject} from "rxjs/Rx";

@Injectable()
export class MainService {
  onCloseFeedBox = new Subject();
  onPetInited = new Subject();
  onOwnerInited = new Subject();
  onFeedPet = new Subject<any>();
  onNotify = new Subject<string>();
  isInited = false;
  constructor(private serverServ: ServerService,
              private ownerService: OwnerService,
              private petService: PetService,
              private stomachServ: StomachService,
              private authServ: AuthService
              ) {
  }

  /**
   *   Get owner from the server and initiate owner object, used in main component ts
   */
  initOwner(){
    // // //retrieve token from the local storage in serverService
    // this.serverServ.getTokenReady();
    this.serverServ.getOwner()
      .subscribe(
        (owner) => {
          if (owner != null) {
            if (owner.isRegComplete) {
              this.ownerService.initOwner(owner);
              this.onOwnerInited.next(this.ownerService.retrieveOwner());//pass to petinfo and main component
            } else {
              window.location.href = `/adoption/story`;
            }
          } else {
           window.location.href = "/authentication/login"
          }
        },
        (error) => console.log(error)
      );
  }

  /**
   *   Get petinfo from the server and initiate Pet object, used in main component ts
   */
  initPet() {
    this.serverServ.getPet()
      .subscribe(
        (pet) => {
          if (pet != null){
            this.petService.initPet(pet);
            // console.log('Pet object: ', pet);
            this.onPetInited.next(this.petService.checkHealthAndRetrievePet()); // pass to petinfo to update bars
          } else {
            this.authServ.logOut();
          }
        },
        (error) => {
          alert('No pet in the database');
          this.authServ.logOut();
          console.log(error)
        }
      );
  }

  /**
   * Load foods from in stomach service
   */
  loadFoodsInStomach() {
    this.stomachServ.loadFoodsFromDatabase();
  }

  resetInitiation() {
    this.isInited = false;
  }



}
