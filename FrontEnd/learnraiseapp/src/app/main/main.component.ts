import { Component, OnDestroy, OnInit} from '@angular/core';
import {PetService} from "../shared/pet.service";
import {MainService} from "./main.service";
import {ServerService} from "../shared/server.service";
import {Subscription} from "rxjs/Subscription";
import {Food} from "../shared/food.model";
import {StomachService} from "./content/stomach/stomach.service";
import {GameService} from "../shared/game.service";
import {CanComponentDeactivate} from "./can-deactivate-guard.service";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../authentication/auth-service";
declare var $: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: []
})

export class MainComponent implements OnInit, OnDestroy, CanComponentDeactivate{
  isFeeding = false;
  closeModalBoxSub: Subscription;
  notificationSub: Subscription;
  foodAddedSub: Subscription;
  extraNavActivated = false;
  firstTimeInited = true;

  // exit: any = () => {
  //     this.petServ.saveLeaveTimeAndHungerTime();
  //     this.petServ.destroyPet()
  // };
  vis = (function(){
    var stateKey, eventKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
      if (stateKey in document) {
        eventKey = keys[stateKey];
        break;
      }
    }
    return function(c) {
      if (c) {document.addEventListener(eventKey, c)};
      return !document[stateKey];
    }
  })();
  constructor(private mainServ: MainService,
              private stomachServ: StomachService,
              private petServ: PetService,
              private gameServ: GameService,
              private serverServ: ServerService,
              private authServ: AuthService,
              ) {
  }
  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHander($event) {
  //   this.exit();
  // };

  ngOnInit() {
    //Wait for the ownerKey to be ready first
    this.serverServ.onOwnerKeyReady.subscribe(
      ()=> {
        // Initiate owner
        this.mainServ.initOwner();

        // Initiate pet
        this.mainServ.initPet();
        this.petServ.startGettingHungry();

        // Load food from the server to stomach
        this.mainServ.loadFoodsInStomach();
      }
    );

    const body = document.getElementsByTagName("BODY")[0];
    if (body.classList.contains('modal-open')) {
      body.classList.remove('modal-open');
      const shadowEl = document.getElementsByClassName('modal-backdrop');
      shadowEl[0].remove();
    }
    // Used to give notifications from any component within main
    this.notificationSub = this.mainServ.onNotify
      .subscribe(
        (message: string) => confirm(message)
      );

    this.closeModalBoxSub = this.mainServ.onCloseFeedBox.subscribe(
      () => {
        this.closeModalBox()
      }
    );

    // To be able to add food at any component within main
    this.foodAddedSub = this.mainServ.onFeedPet.subscribe(
      (food: Food) => {
        this.stomachServ.addFood(food);
        this.gameServ.onFoodAdded();
      }
    );

    /**
     *   Save Pet when the user minimize the window on mobile phone
     */
    this.vis(() => {
      if (!this.vis(() => {
        })) {
        this.petServ.saveLeaveTimeAndHungerTime();
      } else {
        // check if token has been expired and update hunger time
        this.serverServ.getTokenReady();
        this.petServ.checkHealthAndRetrievePet();
      }
    })
  }

  // $(document).on('keydown', 'ctrl+enter', () => {

  // });
  onFeed() {
    this.isFeeding = true;
  }

  onLogOut(){
    if (confirm('Are you sure you want to disconnect with your pet?')){
      this.authServ.logOut();
    }
  }
  closeModalBox() {
    $('.modal-backdrop').removeClass('modal-backdrop');
    this.isFeeding = false;
    this.extraNavActivated = false;
  }
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.serverServ.getTokenReady()) {
      return confirm('Are you sure you want to disconnect with your pet?');
    } else if (!this.serverServ.getTokenReady()) {
      return confirm('Your pet was playful, please connect again to see him/her');
    }
  }

  ngOnDestroy() {
    this.petServ.saveLeaveTimeAndHungerTime();
    this.mainServ.resetInitiation();
    this.foodAddedSub.unsubscribe();
    this.petServ.destroyPet();
    this.firstTimeInited = true;
  }
}
