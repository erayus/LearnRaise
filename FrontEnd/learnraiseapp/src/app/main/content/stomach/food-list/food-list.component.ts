import {
  Component,
  OnInit
} from '@angular/core';

import {StomachService} from "../stomach.service";
import {ServerService} from '../../../../shared/server.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
declare let $: any;

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
  filterFood = "";
  private stomachRef$: AngularFireList<any>;

  constructor(private stomachServ: StomachService,
              private serverServ: ServerService,
              private db: AngularFireDatabase) {

  }

  ngOnInit() {
    const userId = this.serverServ.getUserId();

    this.stomachRef$ = this.db.list(`stomachs/${userId}`);
    // Store foods from the database to a variable
    this.stomachRef$.valueChanges().subscribe(
      (foods) => this.foods = foods.reverse()
    );
  }






}
