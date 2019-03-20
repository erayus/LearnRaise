import {AfterViewChecked, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StomachService} from "../stomach.service";
import {Subscription} from "rxjs";
import {Food} from "../../../../shared/food.model";
import {NgForm} from "@angular/forms";

declare var $: any;
@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit, AfterViewChecked {
  @Input() editingFoodIndex;
  @ViewChild('f') editForm: NgForm;
  // editingFoodItem: any;
  constructor( private stomachServ: StomachService) { }

  ngOnInit() {
    // this.editingFoodItem = this.stomachServ.getFoodByIndex(this.editingFoodIndex);
    // setTimeout( () => {
    //   this.editForm.setValue({
    //     foodName: this.editingFoodItem.name,
    //     foodType: this.editingFoodItem.type,
    //     foodDes: this.editingFoodItem.description,
    //     foodExample: this.editingFoodItem.example})
    // }, 10 );
  }
  ngAfterViewChecked() {
    $(document)
      .one('focus.autoExpand', 'textarea.autoExpand', function(){
        const savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
      })
      .on('input.autoExpand', 'textarea.autoExpand', function(){
        let minRows = this.getAttribute('data-min-rows') | 0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 25);
        this.rows = minRows + rows;
      });
  }

  closeEditBox() {
    this.stomachServ.closeEditingModalBoxEvent.next();
  }
  onEdit( form: NgForm) {
  //   const newFood = new Food(
  //     form.value.foodName,
  //     form.value.foodType,
  //     form.value.foodDes,
  //     form.value.foodExample
  //   );
  //   if (!this.stomachServ.isFoodEaten(newFood) ) {
  //     alert('This food has already been exist!')
  //   }else {
  //     this.stomachServ.updateFood(this.editingFoodIndex, newFood);
  //     this.closeEditBox();
  //   }
  }

}
