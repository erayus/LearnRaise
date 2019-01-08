import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Food} from "../../../../shared/food.model";
import {StomachService} from "../stomach.service";

@Component({
  selector: 'app-food-des',
  templateUrl: './food-des.component.html',
  styleUrls: ['./food-des.component.css']
})
export class FoodDesComponent implements OnInit, OnChanges{
  @Input() food: Food;
  meaningObj: any;
  typesArray: any[];

  constructor(private stomachServ: StomachService) { }
  ngOnInit() {
    this.meaningObj = this.food.meaning;
    this.typesArray = Object.keys(this.meaningObj);
    this.stomachServ.foodAddedEvent.subscribe(
      (food: Food) => {
        this.food = food
      }
    );
  }

  //Update the meaningObj and typesArray when the selectedFood change
  ngOnChanges(){
    this.meaningObj = this.food.meaning;
    this.typesArray = Object.keys(this.meaningObj);
  }



}
