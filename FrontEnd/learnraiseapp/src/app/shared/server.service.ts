import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Food} from "./food.model";
import {Pet} from "./pet.model";
import {Owner} from "./owner.model";
import {firebaseConfig} from "../../environments/firebase.config"
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {LocalStorageManager} from "./localStorageManager.service";
import {map} from "rxjs/operators";
import {AuthService} from "../authentication/auth-service";
import {Subject} from "rxjs/Subject";
import {AngularFireAuth} from "angularfire2/auth";
import {HttpClient} from "@angular/common/http";


/**
 * This class contains codes to deal with the firebase such as:
 * <ul>
 *  Retrieve token to used to make request to the database
 *  Delete token
 *  Manipulating Pet, Owner and Stomach Table
 * </ul>
 */
@Injectable()
export class ServerService {
  private token: string;
  private userId: string;
  private ownerKey: string;
  onSavedImportantData = new Subject();
  onOwnerKeyAndTokenReady = new Subject();
  constructor(private httpClient: HttpClient,
              private lsManager: LocalStorageManager,
              private db: AngularFireDatabase,
              private afAuth: AngularFireAuth
              ) {
    //Set up user id and token whenever there is a refresh
    // this.setUpOwnerKeyAndToken();
  }
  /**
   * Retrieve Token from local storage and store it a variable so that it can be used later to make request to the server
   */
  getTokenReady () {
    //@source https://stackoverflow.com/questions/39035594/firebase-retrieve-the-user-data-stored-in-local-storage-as-firebaseauthuser
    const currentTime = Date.now();
    if (this.lsManager.getUserInfo()) {
      const user = this.lsManager.getUserInfo();
      // check if the token has been expired
      if (currentTime > user.stsTokenManager.expirationTime) { // if expired
        window.location.href = '/authentication/login';
        return false // for canDeativative component
      } else {
        this.token = user.stsTokenManager.accessToken;
        return true // for canDeactivative component
      }
    }
  }

  deleteToken() {
    this.token = "";
  }

  /**
   * Called to get the ownerKey and Token before manipulating the data (add, update, delete)
   * @param {string} userId
   */
  setUpOwnerKeyAndToken() {
    // If there is user info in the local storage
    if (this.lsManager.getUserInfo()) {
      this.getTokenReady();
      //Get user id from the Local Storage
      const user = this.lsManager.getUserInfo();
      this.userId = user.uid;
      // User user id to set ownerKey
      this.db.list('owners').snapshotChanges().map(changes =>
          changes.map(c => ({key: c.payload.key, ...c.payload.val()})
          )
        ).subscribe(
          (owners) => {
            for (let owner of owners) {
              if (owner.oId === this.userId) {
                this.ownerKey = owner.key;
                this.onOwnerKeyAndTokenReady.next();
                break;
              }
            }
          }
        );
    }
  }
  getUserId() {
    const returnId = this.userId;
    return returnId;
  }
  getOwnerKey(){
    const copyKey = this.ownerKey;
    if (this.ownerKey){
      return copyKey;
    }
  }

  // OWNERS TABLE
  addOwner(owner: Owner) {
    return this.httpClient.post<any>(`${firebaseConfig.databaseURL}/owners.json?auth=${this.token}`, owner)
  }
  updateOwner(owner: Owner) {
    return this.httpClient.put(`${firebaseConfig.databaseURL}/owners/${this.ownerKey}.json?auth=${this.token}`, owner);
  }
  getOwner() {
    return this.httpClient.get<Owner>(`${firebaseConfig.databaseURL}/owners/${this.ownerKey}.json?auth=${this.token}`)
  }

  getAllOwners() {
    return  this.db.list("owners").valueChanges();
  }


  // PETS TABLE
  addPet(userKey: string, pet: Pet) {
    return this.httpClient.put(`${firebaseConfig.databaseURL}/pets/${userKey}.json?auth=${this.token}`, pet)
  }
  updatePet( pet: Pet) {
    return this.httpClient.put(`${firebaseConfig.databaseURL}/pets/${this.ownerKey}.json?auth=${this.token}`, pet).subscribe();
  }
  saveLeaveTimeAndHungerTime(oId, leaveTime: number, currentHungerTime: number[]) {
    const xhr = new XMLHttpRequest();
    const leaveTimeData = JSON.stringify(leaveTime);
    xhr.open("PUT",`${firebaseConfig.databaseURL}/pets/${this.ownerKey}/leaveTime.json?auth=${this.token}`, false);
    xhr.send(leaveTimeData);
    const currentHungerTimeData = JSON.stringify(currentHungerTime);
    xhr.open("PUT",`${firebaseConfig.databaseURL}/pets/${this.ownerKey}/hungerTime.json?auth=${this.token}`, false);
    xhr.send(currentHungerTimeData);

    this.deleteToken();
  }

  getPet() {
    return this.httpClient.get<Pet>(`${firebaseConfig.databaseURL}/pets/${this.ownerKey}.json?auth=${this.token}`)
  }


  // STOMACHS TABLE
  saveFoods(ownerKey, newFoods: Food[]) {
    return this.httpClient.put(`${firebaseConfig.databaseURL}/stomachs/${ownerKey}.json?auth=${this.token}`, newFoods).subscribe();
  }
  updateFood(foodKey : string, newFood : Food){
    return this.httpClient.put(`${firebaseConfig.databaseURL}/stomachs/${this.ownerKey}/${foodKey}.json?auth=${this.token}`, newFood);
  }

  /**
   * Used to add food when authenticating
   * @param ownerKey
   * @param {Food} newFood
   * @return {Observable<Response>}
   */
  addFood(ownerKey, newFood: Food){
    return this.httpClient.post(`${firebaseConfig.databaseURL}/stomachs/${ownerKey}.json?auth=${this.token}`, newFood)
  }
  getFoods() {
     return this.db.list(`stomachs/${this.ownerKey}`).valueChanges();
  }


}
