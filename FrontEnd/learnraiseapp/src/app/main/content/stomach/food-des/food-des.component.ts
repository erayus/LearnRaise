import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Food} from "../../../../shared/food.model";
import {StomachService} from "../stomach.service";

@Component({
  selector: 'app-food-des',
  templateUrl: './food-des.component.html',
  styleUrls: ['./food-des.component.css']
})
export class FoodDesComponent implements OnInit{
  @Input() food: Food;

  constructor(private stomachServ: StomachService) { }
  ngOnInit() {
    this.stomachServ.foodAddedEvent.subscribe(
      (food: Food) => this.food = food
    );
  }



}
