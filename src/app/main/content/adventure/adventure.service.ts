import { Injectable } from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";
import {Food} from "../../../shared/food.model";

@Injectable({
  providedIn: "root"
})
export class AdventureService {
  onGameStarted = new Subject();
  onGameCompleted = new Subject();
  constructor() {
  }

  getShuffledFoodNameList(foods: Food[]) {
    const shuffleFoodNameList = this.retrieveAndShuffleFoodNameList(foods);
    return shuffleFoodNameList;
  }

  retrieveAndShuffleFoodNameList(foods: Food[]) {
    // Get the list of food in the stomach
    const foodNameList = foods.map((food: Food) => {
      return food.word
    });
    // Shuffle the list
    for (let i = foodNameList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [foodNameList[i], foodNameList[j]] = [foodNameList[j], foodNameList[i]];
    }
    return foodNameList
  }




}
