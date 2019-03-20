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
export class ToolBarComponent implements OnInit, OnDestroy {

  petObj: Pet;

  petInitedSub: Subscription;
  onFeedPetSub: Subscription;
  changesInDatabaseSub: Subscription;
  estimation:number;

  petPromise = new Promise((resolve, reject) =>{
    // if this is just after logging in, waiting for the main serve to initiate pet
    if (!this.petService.retrivePet()) {
      this.mainServ.onPetInited.subscribe(
        (pet: Pet) => {
          resolve(pet)
        })
    } else { //if this is after story and there is pet object already
      resolve(this.petService.retrivePet());
    }
  });

  constructor(private petService: PetService,
              private mainServ: MainService,
              private stomachServ: StomachService) {
  }
  ngOnInit() {
    // Subscribe to petPromise to wait for the petObj to be ready
    this.petPromise.then((pet: Pet) => {
      this.petObj = pet;
      this.estimation = Math.ceil(this.petObj.hungerTime[0] / 3600000);
      this.updateBarsUI()
    });
    // When there is any change in the petObj (health decrease in every minute, health increase when food is added)
    this.changesInDatabaseSub = this.petService.onPetChanged.subscribe(
      (upToDatePet) => {
        this.petObj = upToDatePet;
        this.estimation = Math.ceil(this.petObj.hungerTime[0] / 3600000);
        this.updateBarsUI()
      }
    );

  }

  updateBarsUI(){
    if(this.petObj) {
      let expWidth = this.petObj.experience[0] / this.petObj.experience[1] *100;
      $('.exp-item').css('width', `${expWidth}%`);
      let healthWidth = this.petObj.hungerTime[0] / this.petObj.hungerTime[1] * 100;
      $('.hunger-item').css('width', `${healthWidth}%`);
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
