import {AfterViewChecked, Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {StomachService} from "../../stomach.service";
import {Subscription} from "rxjs";
import { AlertifyService } from 'app/shared/alertify.service';

declare var $: any;
@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, OnDestroy {
  @Input() food;
  @Input() foodIndex;
  isCooked = true;
  typesArray: string[];
  checkIfIsCookedSub: Subscription;
  constructor(private stomachServ: StomachService,
              private alertify: AlertifyService) { }

  //If there is any change on any food item, ngOnInit will be called on all food item
  ngOnInit() {
    // this.checkIfIsCooked();

    this.typesArray = Object.keys(this.food.meaning);

    //show icons when mouse enter
    $('.food-item').mouseenter(function() {
      $(this).children('.icons').show("slow");
    }).mouseleave(function() {
      $(this).children('.icons').hide("slow");
    });


  }

  /**
   * Triggered every time there is any change in any food item
   * To check if the food is cooked or not (word has enough info to be blue or red)
   */
  checkIfIsCooked() {
    if ( this.food.type === 'none' || !this.food.description ) {
      this.isCooked = false;
    } else {
      this.isCooked = true;
    }
  }

  onSelect() {
    this.stomachServ.foodSelectedEvent.emit(this.food);
  }

  edit() {
    this.stomachServ.foodEditEvent.next( this.foodIndex ); // Pass to stomach.ts
  }

  delete() {
    this.alertify.confirm("Are you sure you want to delete this food?", () => {
      this.stomachServ.deleteFoodWithIndex(this.foodIndex);
    })
  }

  ngOnDestroy() {
  //   this.checkIfIsCookedSub.unsubscribe();
  }
}
