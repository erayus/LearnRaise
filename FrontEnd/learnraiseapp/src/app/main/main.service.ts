import {Subject} from "rxjs/Subject";
import {Food} from "../shared/food.model";
import {Injectable} from "@angular/core";
import {ServerService} from "../shared/server.service";
import {PetService} from "../shared/pet.service";
import {OwnerService} from "../shared/owner.service";

@Injectable()
export class MainService {
  onCloseFeedBox = new Subject();
  onPetInited = new Subject();
  onOwnerInited = new Subject();
  onFeedPet = new Subject<Food>();
  onNotify = new Subject<string>();
  isInited = false;
  constructor(private serverServ: ServerService,
              private ownerService: OwnerService,
              private petService: PetService,
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
          if (owner.isRegComplete) {
            this.ownerService.initOwner(owner);
            this.onOwnerInited.next(this.ownerService.retrieveOwner());//pass to petinfo and main component
          } else {
            window.location.href = `/adoption/petquizz/page1`;
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
          this.petService.initPet(pet);
          // console.log('Pet initiated');
          this.onPetInited.next(this.petService.checkHealthAndRetrievePet()); // pass to petinfo to update bars
        },
        (error) => console.log(error)
      );
  }

  resetInitiation() {
    this.isInited = false;
  }



}
