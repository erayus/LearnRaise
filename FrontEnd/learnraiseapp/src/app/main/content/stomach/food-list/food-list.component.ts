import {
  Component,
  OnInit
} from '@angular/core';

import {StomachService} from "../stomach.service";
import {ServerService} from '../../../../shared/server.service';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {MainService} from '../../../main.service';
import {Pet} from '../../../../shared/pet.model';
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
              private db: AngularFireDatabase,
              private mainServ: MainService) {

  }

  ngOnInit() {
    console.log(this.stomachServ.getFoodsInStomach().length === 0);
    if (this.stomachServ.getFoodsInStomach().length === 0 ){
      this.mainServ.onPetInited.subscribe(
        (pet: Pet) => {
          const userId = this.serverServ.getUserId();
          this.stomachRef$ = this.db.list(`stomachs/${userId}`);
          // Store foods from the database to a variable
          this.stomachRef$.valueChanges().subscribe(
            (foods) => this.foods = foods.reverse()
          );
        }
      );
    }else{
      this.foods = this.stomachServ.getFoodsInStomach();

      const userId = this.serverServ.getUserId();
      this.stomachRef$ = this.db.list(`stomachs/${userId}`);
      // Store foods from the database to a variable
      this.stomachRef$.valueChanges().subscribe(
        (foods) => this.foods = foods.reverse()
      );
    }


  }






}
