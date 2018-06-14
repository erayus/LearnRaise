import {
  Component,
  OnInit
} from '@angular/core';

import {StomachService} from "../stomach.service";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
/**
 * This class is only used to reflect the data to the view
 */
export class FoodListComponent implements OnInit  {
  foods = [];
  filterFood = '';

  constructor(private stomachServ: StomachService) {
  }

  ngOnInit() {
    //Subscribe to any changes in the database and update the view
    this.stomachServ.getFoodsObserver().subscribe(
      (foodsFromDatabase) => this.foods = foodsFromDatabase.reverse()
    )
  }




}
