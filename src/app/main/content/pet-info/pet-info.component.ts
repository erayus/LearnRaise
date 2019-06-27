import {Component, OnDestroy, OnInit, AfterViewChecked, HostListener} from '@angular/core';
import {Pet} from "../../../shared/pet.model";
import {PetService} from "../../../shared/pet.service";
import {MainService} from "../../main.service";
import {Subscription} from "rxjs";
import {StomachService} from "../stomach/stomach.service";
import {OwnerService} from "../../../shared/owner.service";
declare var $: any;

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css']
})
export class PetInfoComponent implements OnInit, AfterViewChecked, OnDestroy{
  viewInfo = false;
  viewStatus = false;
  petInitedSub: Subscription;
  changesInDatabaseSub: Subscription;
  petObj: Pet;
  onFeedPetSub: Subscription;

  petPromise = new Promise((resolve, reject) =>{
    // if this is just after logging in, waiting for the main serve to initiate pet
    if (!this.petService.retrivePet()) {
      this.mainServ.onPetInited.subscribe(
        (pet: Pet) => {
          resolve(pet)
        })
    } else { // if this is just user navigating around
        resolve(this.petService.retrivePet());
    }
  });
  // ownerPromise = new Promise((resolve, reject) =>{
  //   // if this is just after logging in, waiting for the main serve to initiate pet
  //   if (!this.ownerServ.retrieveOwner()) {
  //     this.mainServ.onOwnerInited.subscribe(
  //       (owner: Owner) => {
  //         resolve(owner)
  //       })
  //   } else { // if this is just user navigating around
  //     resolve(this.ownerServ.retrieveOwner());
  //   }
  // });

  constructor(private petService: PetService,
              private mainServ: MainService,
              private stomachServ: StomachService,
              private ownerServ: OwnerService) {
  }
  ngOnInit() {
    this.petPromise.then((pet: Pet) => {
      this.petObj = pet;
    });

    // When there is change in the database
    this.changesInDatabaseSub = this.petService.onPetChanged.subscribe(
      (upToDatePet) => {
        this.petObj = upToDatePet;
      }
    )
  }
  ngAfterViewChecked() {
  }

  toggleBox(boxName: string) {
    if(boxName === 'info') {
      this.viewInfo = true;
    }else {
      this.viewStatus = true;
    }
  }
  closeModalBox(){
    const shadowEl = document.getElementsByClassName('modal-backdrop');
    shadowEl[0].remove();
    this.viewInfo = false;
    this.viewStatus = false;
  }
  ngOnDestroy() {
    if (this.petInitedSub) {
      this.petInitedSub.unsubscribe();
    }
    if (this.onFeedPetSub){
      this.onFeedPetSub.unsubscribe();
    }
    if (this.changesInDatabaseSub){
      this.changesInDatabaseSub.unsubscribe();
    }
  }

}
