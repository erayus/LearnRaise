import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {Food} from "../../../shared/food.model";
import {Subject} from "rxjs/Subject";
import {ServerService} from "../../../shared/server.service";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {forEach} from '@angular/router/src/utils/collection';


@Injectable()
export class StomachService {
  private foodsInStomach = [];
  private stomachRef$: AngularFireList<any>;
  private keys: string[];
  private foodSoundList = [];

  foodSelectedEvent = new EventEmitter<Food>();
  foodAddedEvent = new Subject<Food>();
  foodEditEvent = new Subject<number>();
  closeEditingModalBoxEvent = new Subject();
  foodChangedEvent = new Subject();

  constructor(private serverServ: ServerService,
              private db: AngularFireDatabase) {
  };

  /**
   *   Invoked by mainServ
   *   To get foods from the database and store in foodsInStomach
   */
  loadFoodsFromDatabase() {
         const userId = this.serverServ.getUserId();

         this.stomachRef$ = this.db.list(`stomachs/${userId}`);
         // Store foods from the database to a variable
         this.stomachRef$.valueChanges().subscribe(
           (foods) => this.foodsInStomach = foods.reverse()
         );

         // Generate a list of keys
         this.stomachRef$.snapshotChanges().map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ).subscribe(
           (dataArray) => {
               const keys = [];
               for (let i = 0; i < dataArray.length; i ++){
                 keys.unshift(dataArray[i].key);
               }
               this.keys = keys;
           });
  }

  /**
   * An observable of the foods table for the views (i.e food-list component) to subscribe to.
   * @return {Observable<any>}
   */
  getFoodsObserver(): Observable<any> {
    // Only return the observable when the reference is initiated in LoadFoodFromServer()
    if (this.stomachRef$ !== undefined) {
      return this.stomachRef$.valueChanges();
    }
  }

  /**
   * Check if the food has already existed in the stomach
   * @param {Food} newFood
   * @return {boolean}
   */
  isFoodEaten(newFoodName: string) {
    console.log('Checking food', this.foodsInStomach);
    let flag = false;
    if (this.foodsInStomach.length > 0){
      for (const food of this.foodsInStomach){
        if ( newFoodName === food.word.toLowerCase() ) {
          flag = true;
        }
      }
    }
    return flag
  }

  getFoodsInStomach() {
    const foodsCopy = this.foodsInStomach;
    return foodsCopy;
  }
  getFoodByIndex(index: number) {
    return this.foodsInStomach[index];
  }

  addFood(food) {
    // Notify stomach component to display its description
    this.foodAddedEvent.next(food);
    // Add food to the database
    this.stomachRef$.push(food);
  }

  updateFood(index: number, newFood: Food) {
    // Notify stomach component to close description box
    this.foodChangedEvent.next(newFood);
    // Update food in the database
    this.stomachRef$.update(this.keys[index], newFood);
  }

  deleteFoodWithIndex(index: number) {
    // Looking for index if deleting food in the foodsInStomach
    this.stomachRef$.remove(this.keys[index]);

    // Notify stomach component to update description box (must pass with empty parameter)
    this.foodChangedEvent.next();
  }
  // Add food obj ({foodName: '<mp3Link>'}) to food sound list to avoid making repeated api calls (call from food description component)
  addFoodSound( foodObj: any ) {
    this.foodSoundList.push(foodObj)
  }

  // Check if the food sound exists
  isFoodSoundExisting(foodName: string) {
    let result = false;
    for ( const food of this.foodSoundList)  {
      if ( food.name === foodName) {
        result = true;
      }
    }
    return result
  }

  getFoodSound(foodName: string) {
    let result;
    for ( const food of this.foodSoundList)  {
      if ( food.name === foodName) {
        result = food.mp3Link;
      }
    }
    return result
  }

}
