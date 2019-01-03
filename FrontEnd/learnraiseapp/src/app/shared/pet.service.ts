
import {Subject} from "rxjs/Subject";
import {Pet} from "./pet.model";
import {Food} from "./food.model";
import {Injectable, OnInit} from "@angular/core";
import {ServerService} from "./server.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../authentication/auth-service";

@Injectable()
export class PetService {
  onLevelUp = new Subject();
  private petObj: Pet;
  private hungerInterval;
  private initedHungerInterval = false;
  //This event is triggered whenever there is any change
  onPetChanged = new Subject<Pet>();
  constructor(private serverServ: ServerService) {}


  createPetWithId(userId: string): Pet {
    // Create pet Object
    this.petObj = new Pet(userId,
                          '', // name
                          '', // species
                          '', // element
                          '', // story,
                          0, // weight, will be set when choosing pet
                          0, // height, will be set when choosing pet
                          [], // list of pictures
                          '',
                          1 , // level
                          [ 28800000, 28800000], // hunger time 8 hours
                          [0, 5], // experience
                          0,
                          0, // leave time,
                          3 // number of lives
                          );
    const petCopy = this.petObj;
    return petCopy;

  }
  initPet(pet: Pet) {
    this.petObj = pet;
  }


  installPet(name: string, species: string, element: string, story: string, weight: number, height: number, pictureURL: string[]){
    this.petObj.name = name;
    this.petObj.species = species;
    this.petObj.element = element;
    this.petObj.story = story;
    this.petObj.weight = weight;
    this.petObj.height = height;
    this.petObj.pictures = pictureURL;
    this.petObj.curPic = pictureURL[0];
    this.petObj.leaveTime = Date.now(); // Used to calculate hungerTime in initPet
    this.serverServ.updatePet(this.petObj)
  }
  setName(newName: string) {
    this.petObj.name = newName;
  }
  // Used when the user navigating around
  retrivePet() {
      return this.petObj;
  }

  /**
   * This method is called when the user logins to check if pet is still alive
   * If the pet is still alive, update pet with new health (hunger time) and
   * @returns {Pet}
   * If the pet is dead still has lives left
   * @return (Pet) and reduce noOfLives
   *
   */
  checkHealthAndRetrievePet() {
    console.log('Pet obj', this.petObj);
    if (this.petObj != null) {
      const lastHungerTime = this.petObj.hungerTime[0];
      const amountOfOfflineTime = Date.now() - this.petObj.leaveTime;
      this.petObj.hungerTime[0] = lastHungerTime - amountOfOfflineTime;
      // if pet dies and runs out of lives
      if (this.petObj.hungerTime[0] <= 0 && this.petObj.noOfLives === 1) {
        this.petObj.curPic = '';
        this.updatePet();
        if (confirm('Your alien pet left you, you now will be sent back to the home page!')) {
          window.location.href = '/authentication/login';
        }
        // if pet dies and still have lives
      } else if (this.petObj.hungerTime[0] <= 0 && this.petObj.noOfLives > 1 && this.petObj.curPic != '') {
        this.petObj.noOfLives -= 1;
        this.petObj.hungerTime[0] = this.petObj.hungerTime[1];
        alert(`Your pet was gone and recovered, number of lives left: ${this.petObj.noOfLives}`);
        this.startGettingHungry();
        this.updatePet();
        return this.petObj;
      } else {
        this.updatePet();
        return this.petObj;
      }
    }
  }
  getExpArray() {
    return this.petObj.experience;
  }

  gainExpAndPower() {
    this.petObj.experience[0] += 1;
    this.petObj.power += 1;
  }

  getCurrentLevel() {
    return this.petObj.level;
  }

  levelUp(nextLv, newExp, newHungerTime){
    this.petObj.level = nextLv;
    this.petObj.experience[0] = 1;
    this.petObj.experience[1] = newExp;
    this.petObj.height += 10;
    this.petObj.weight += 20;
    this.petObj.hungerTime[1] = newHungerTime;
    this.petObj.hungerTime[0] = this.petObj.hungerTime[1];
    this.petObj.power += 5;
    //update pet in the database
    this.updatePet();
  }
  evolve(stage: string) {
    switch (stage) {
      case 'teenager':
        this.petObj.curPic = this.petObj.pictures[1];
        this.petObj.power += 20;
        this.petObj.height += 20;
        this.petObj.weight += 50;
        break;
      case 'mature':
        this.petObj.curPic = this.petObj.pictures[2];
        this.petObj.power += 80;
        this.petObj.height += 30;
        this.petObj.weight += 50;
        break;
      case 'legendary':
        this.petObj.curPic = this.petObj.pictures[3];
        this.petObj.power += 150;
        this.petObj.height += 50;
        this.petObj.weight += 80;
        break;
    }
    this.petObj.hungerTime[0] = this.petObj.hungerTime[1];
    this.petObj.hungerTime[1] += 10800000;
    //update pet in the database
    this.updatePet();
  }

  getHungerTimeArray() {
    return this.petObj.hungerTime;
  }

  moreHungerTime() {
    let newHungerTime;
    const currentLevel = this.getCurrentLevel();
    // NewHungerTime is calculated based on pet's level
    newHungerTime = this.petObj.hungerTime[0] + currentLevel * 3600000;
    // When the added hours are more than needed to fill the bar
    if ( newHungerTime > this.petObj.hungerTime[1]) {
      const amountToFill =  this.petObj.hungerTime[1] - this.petObj.hungerTime[0]; //calculate the amount of time to fill the bar
      this.petObj.hungerTime[0] += amountToFill;
    }else {
      this.petObj.hungerTime[0] = newHungerTime;
    }
    //Notify other components that there is something changed in pet Obj (tool bar components)
    this.onPetChanged.next(this.petObj)
  }

  startGettingHungry() {
    // console.log('from startGettingHungry', this.initedHungerInterval);
    if (this.initedHungerInterval === false) {
      this.initedHungerInterval = true;
      this.hungerInterval = setInterval(() => {
        //If the pet is still alive
        if (this.petObj.hungerTime[0] > 0 ) {
          this.petObj.hungerTime[0] -= 60000;
          //Notify other components that there is something changed in pet Obj (tool bar components)
          this.onPetChanged.next(this.petObj);
        } else {
          clearInterval(this.hungerInterval);
          this.initedHungerInterval = false;
          this.checkHealthAndRetrievePet();
        }
      }, 60000);
    }
  }

  saveLeaveTimeAndHungerTime() {
    const leaveTimeData = Date.now();
    this.petObj.leaveTime = leaveTimeData;
    const currentHungerTime = this.petObj.hungerTime;
    this.serverServ.saveLeaveTimeAndHungerTime(this.petObj.userId, leaveTimeData, currentHungerTime);
  }
  destroyPet() {
    this.petObj = null;
  }

  updatePet() {
    this.petObj.leaveTime = Date.now();
    this.onPetChanged.next(this.petObj);
    this.serverServ.updatePet(this.petObj);
  }
}
