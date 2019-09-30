import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import {Food} from "./food.model";
import {Pet} from "./pet.model";
import {Owner} from "./owner.model";
import {firebaseConfig, firebaseDevConfig} from "../../environments/firebase.config"
import {AngularFireDatabase} from "angularfire2/database";
import {Subject} from "rxjs";
import {AngularFireAuth} from "angularfire2/auth";
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';


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
  private firebaseCon =  environment.production ? firebaseConfig : firebaseDevConfig;
  private token: string;
  private userId: string;
  private tokenExpirationTime: number;
  onOwnerIdAndTokenReady = new Subject();
  constructor(private httpClient: HttpClient,
              private db: AngularFireDatabase,
              private afAuth: AngularFireAuth
              ) {
  }
  /**
   * Check if token is expired
   */
  isTokenExpired (user) {
    this.tokenExpirationTime = user.h.c;
    const currentTime = Date.now();
    console.log('Time now: ', currentTime)
    // check if the token has been expired
    console.log('token time: ', this.tokenExpirationTime)
    if (currentTime > this.tokenExpirationTime ) { // if expired
      return true // for canDeativative component
    } else {
      return false // for canDeactivative component
    }

  }

  deleteToken() {
    this.token = "";
  }

  /**
   * Called to get the ownerKey and Token before manipulating the data (add, update, delete)
   * @param {string} userId
   */
  setUpOwnerIdAndToken(user) {
    this.userId = user.uid;
    this.token = user.ra;
    // Wait for the other components a little bit to subscribe to the event before notify them (services are run before components)
    setTimeout(() => {
      this.onOwnerIdAndTokenReady.next();
    }, 0.5);


  }
  getUserId() {
    const returnId = this.userId;
    return returnId;
  }

  // OWNERS TABLE
  addOwner(userId, owner: Owner) {
    return this.httpClient.put<any>(`${this.firebaseCon.databaseURL}/owners/${userId}.json?auth=${this.token}`, owner)
  }
  updateOwner(owner: Owner) {
    return this.httpClient.put(`${this.firebaseCon.databaseURL}/owners/${this.userId}.json?auth=${this.token}`, owner);
  }
  getOwner() {
    return this.httpClient.get<Owner>(`${this.firebaseCon.databaseURL}/owners/${this.userId}.json?auth=${this.token}`)
  }
  getAllOwners() {
    return  this.db.list("owners").valueChanges();
  }


  // PETS TABLE
  getPet() {
    return this.httpClient.get<Pet>(`${this.firebaseCon.databaseURL}/pets/${this.userId}.json?auth=${this.token}`)
  }
  addPet(userId: string, pet: Pet) {
    return this.httpClient.put(`${this.firebaseCon.databaseURL}/pets/${userId}.json?auth=${this.token}`, pet)
  }
  updatePet( pet: Pet) {
    return this.httpClient.put(`${this.firebaseCon.databaseURL}/pets/${this.userId}.json?auth=${this.token}`, pet).subscribe();
  }
  saveLeaveTimeAndHungerTime(oId, leaveTime: number, currentHungerTime: number[]) {
    const xhr = new XMLHttpRequest();
    const leaveTimeData = JSON.stringify(leaveTime);
    xhr.open("PUT", `${this.firebaseCon.databaseURL}/pets/${this.userId}/leaveTime.json?auth=${this.token}`, false);
    xhr.send(leaveTimeData);
    const currentHungerTimeData = JSON.stringify(currentHungerTime);
    xhr.open("PUT", `${this.firebaseCon.databaseURL}/pets/${this.userId}/hungerTime.json?auth=${this.token}`, false);
    xhr.send(currentHungerTimeData);
    // this.deleteToken();
  }



  // STOMACHS TABLE
  /**
   * Used to add food when authenticating
   * @param ownerKey
   * @param {Food} newFood
   * @return {Observable<Response>}
   */
  addFood(userId, newFood: Food) {
    return this.httpClient.post(`${this.firebaseCon.databaseURL}/stomachs/${userId}.json?auth=${this.token}`, newFood)
  }
}
