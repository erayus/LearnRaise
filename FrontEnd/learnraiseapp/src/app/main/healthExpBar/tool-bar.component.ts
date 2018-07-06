import {Component, OnInit, AfterViewChecked, OnDestroy} from '@angular/core';
import {AuthService} from "../../authentication/auth-service";
import {PetService} from "../../shared/pet.service";
import {MainService} from "../main.service";
import {StomachService} from "../content/stomach/stomach.service";
import {Pet} from "../../shared/pet.model";
import {Subscription} from "rxjs";

declare var $: any;
@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit, AfterViewChecked, OnDestroy {

  petInitedSub: Subscription;
  onLevelUpSub: Subscription;
  petObj: Pet;
  onFeedPetSub: Subscription;
  changesInDatabaseSub: Subscription;
  startGettingHungry;
  hungerInited = false;
  isLevelUp = false;
  estimation:number;
  hungerInterval;

  petPromise = new Promise((resolve, reject) =>{
    // if this is just after logging in, waiting for the main serve to initiate pet
    if (!this.petService.retrivePet()) {
      this.mainServ.onPetInited.subscribe(
        (pet: Pet) => {
          resolve(pet)
        })
    } else { //if this is after registration and there is pet object already
      resolve(this.petService.retrivePet());
    }
  });

  constructor(private petService: PetService,
              private mainServ: MainService,
              private stomachServ: StomachService) {
    this.startGettingHungry = () => {
      if (!this.hungerInited) {
        this.hungerInited = true;
        this.hungerInterval = setInterval(() => {
          this.petObj = this.petService.retrivePet();
          this.estimation = Math.ceil(this.petObj.hungerTime[0]/ 3600000);
        }, 60000);
      }
    }
  }
  ngOnInit() {
    this.petPromise.then((pet: Pet) => {
      this.petObj = pet;
      this.estimation = Math.ceil(this.petObj.hungerTime[0] / 3600000);
      this.startGettingHungry();
    });
    // When there is change in the database
    this.changesInDatabaseSub = this.petService.onGettingUpdatedPet.subscribe(
      (upToDatePet) => {
        this.petObj = upToDatePet;
      }
    );
    //when the the pet is fed
    // this.onFeedPetSub = this.mainServ.onFeedPet.subscribe(
    //   () => {
    //     //if pet just level up, dont push any exp to the array
    //     if(!this.isLevelUp) {
    //       //only push to hungerArray when number of current time < number of total time
    //       if (this.petObj.hungerTime[0] <= this.petObj.hungerTime[1]) {
    //         let newHungerTime = this.petObj.hungerTime[0] + 3600000;
    //         if (newHungerTime > this.petObj.hungerTime[1]){ //if the
    //           console.log('yess');
    //           let amountToFill =  this.petObj.hungerTime[1] - this.petObj.hungerTime[0]; //calculate the amount of time to fill the bar
    //           this.petObj.hungerTime[0] += amountToFill;
    //         }else {
    //           // console.log('noo');
    //           // this.petObj.hungerTime[0] += 360;
    //         }
    //       }
    //       //else reset isLevelUp so that the exp can be push to the array next time food is added
    //     } else {
    //       this.isLevelUp = false;
    //     }
    //     this.startGettingHungry();
    //   }
    // );
    this.onLevelUpSub = this.petService.onLevelUp.subscribe(
      () => {
        this.isLevelUp = true;
        this.petObj = this.petService.retrivePet();
        this.estimation = Math.ceil(this.petObj.hungerTime[0]/ 3600000); //update the hunger estimation
      }
    )
  }

  ngAfterViewChecked(){
    if(this.petObj) {
      let expWidth = this.petObj.experience[0] / this.petObj.experience[1] *100;
      $('.exp-item').css('width', `${expWidth}%`);
      let hungerWidth = this.petObj.hungerTime[0] / this.petObj.hungerTime[1] * 100;
      $('.hunger-item').css('width', `${hungerWidth}%`);
    }
  }


  ngOnDestroy() {
    if (this.petInitedSub) {
      this.petInitedSub.unsubscribe();
    }
    if(this.onFeedPetSub){
      this.onFeedPetSub.unsubscribe();
    }
    if (this.changesInDatabaseSub){
      this.changesInDatabaseSub.unsubscribe();
    }
  }

}
