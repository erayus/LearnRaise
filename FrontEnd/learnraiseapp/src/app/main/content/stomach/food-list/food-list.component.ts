import {
  AfterContentChecked,   Component, OnDestroy,
  OnInit
} from '@angular/core';
import {Food} from "../../../../shared/food.model";
import {PetService} from "../../../../shared/pet.service";
import {StomachService} from "../stomach.service";
import {subscriptionLogsToBeFn} from "rxjs/testing/TestScheduler";
import {Subscription} from "rxjs/Subscription";
import {AngularFireDatabase} from "angularfire2/database";
import {ServerService} from "../../../../shared/server.service";

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit  {
  foods = [];
  filterFood = '';

  constructor(private stomachServ: StomachService,
              private db: AngularFireDatabase,
              private serverServ: ServerService) {
    const ownerKey = this.serverServ.getOwnerKey();
    this.db.list(`stomachs/${ownerKey}`).valueChanges().subscribe(
      (foods) => {this.foods = foods.reverse()}
    );
  }

  ngOnInit() {

  }




}
