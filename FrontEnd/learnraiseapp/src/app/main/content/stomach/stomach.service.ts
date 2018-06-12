import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {Food} from "../../../shared/food.model";
import {Subject} from "rxjs/Subject";
import {ServerService} from "../../../shared/server.service";
import {PetService} from "../../../shared/pet.service";
import {MainService} from "../../main.service";
import {AuthService} from "../../../authentication/auth-service";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {map} from "rxjs/operators";
import {forEach} from "@angular/router/src/utils/collection";


@Injectable()
export class StomachService {
  private foodsInStomach = [];
  private ownerId;
  private stomachRef$: AngularFireList<any>;;
  private keys;
  // foodsReadyToLoad = new Subject();
  foodSelectedEvent = new EventEmitter<Food>();
  foodAddedEvent = new Subject<Food>();
  foodEditEvent = new Subject<number>();
  closeEditingModalBoxEvent = new Subject();
  foodsChangedEvent = new Subject<Food[]>();

  constructor(private serverServ: ServerService,
              private db: AngularFireDatabase) {

  };
  //invoked by mainServ, to get foods from the server and store in foodsInStomach
  loadFoodFromServer( oId: string) {
         const ownerKey = this.serverServ.getOwnerKey();
         this.stomachRef$ = this.db.list(`stomachs/${ownerKey}`);
         this.stomachRef$.valueChanges().subscribe(
           (foods) => this.foodsInStomach = foods.reverse()
         );
         //Generate a list of keys
         this.stomachRef$.snapshotChanges().map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ).subscribe(
           (dataArray) => {
               let keys = [];
               for(let i = 0; i < dataArray.length; i ++){
                 keys.unshift(dataArray[i].key);
               }
               this.keys = keys;
           });
  }
  beUpToDate(id: string) {
    this.serverServ.getFoods().subscribe(
      (upToDateFoods: Food[]) => {
        this.foodsInStomach = upToDateFoods;
      }
    )
  }
  checkSameFoods(newFood: Food) {
    for (const food of this.foodsInStomach){
      if ( newFood.name.toLowerCase() === food.name.toLowerCase() && newFood.type === food.type) {
        return false
      }
    }
    return true;
  }

  getFoods() {
    if (this.foodsInStomach === null) { // prevent the list going null after refreshing the page
      this.foodsInStomach = [];
    }
    return this.foodsInStomach.slice();
  }

  getFoodByIndex(index: number) {
    return this.foodsInStomach[index];
  }
  addFood(food: Food) {
    // this.foodsInStomach.unshift(food);
    this.stomachRef$.push(food);
    this.foodAddedEvent.next(food); // pass to foodList
  }
  updateFood(index: number, newFood: Food) {
    // this.foodsInStomach[index] = newFood;
    this.foodsChangedEvent.next(this.foodsInStomach.slice()); // pass to foodList
    // this.serverServ.saveFoods(this.ownerId, this.foodsInStomach);
    this.stomachRef$.set(this.keys[index], newFood);
  }
  deleteFoodWithNameAndType(name: string, type: string) {
    // Looking for index if deleting food in the foodsInStomach
    const index = this.foodsInStomach.findIndex((foodInStomach) => {
      return foodInStomach.name === name && foodInStomach.type === type;
    });
    // this.foodsInStomach.splice(index, 1);
    this.stomachRef$.remove(this.keys[index]);
    this.foodsChangedEvent.next(this.foodsInStomach.slice()); // pass to foodList
  }
}
