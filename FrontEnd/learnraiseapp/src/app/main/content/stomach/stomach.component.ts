import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, Component, DoCheck, OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import {Food} from "../../../shared/food.model";
import {StomachService} from "./stomach.service";
import {Subscription} from "rxjs/Subscription";
import {PetService} from "../../../shared/pet.service";
import {MainService} from "../../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ServerService} from "../../../shared/server.service";
import {AuthService} from "../../../authentication/auth-service";
declare var $: any;
@Component({
  selector: 'app-stomach',
  templateUrl: './stomach.component.html',
  styleUrls: ['./stomach.component.css'],
  // providers: [StomachService]
})


export class StomachComponent implements OnInit, OnDestroy{
  ownerId: string;
  selectedFood: Food;
  editingFoodIndex: number;
  isEditing = false;
  isSelecting = false;
  displayDes = false;
  foodEditSub: Subscription;
  foodAddedSub: Subscription;
  closingEditModal: Subscription;
  constructor(private stomachServ: StomachService,
              private petServ: PetService,
              private mainServ: MainService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit() {
      window.onload = () => {
        this.router.navigate(['../petinfo'], {relativeTo: this.route});
      };

    // When a food is selected
    this.stomachServ.foodSelectedEvent.subscribe(
      (food: Food) => {
        this.selectedFood = food;
        this.displayDes = true;
        this.isSelecting = true;
      }
    );
    // When a food is being edited
    this.foodEditSub = this.stomachServ.foodEditEvent.subscribe(
      (foodIndex: number) => {
        this.isEditing = true;
        this.isSelecting = false;
        this.editingFoodIndex = foodIndex; // Used for selecting the right food to edit
      }
    );
    // if there is any change in the food array, close the description window
    this.stomachServ.foodsChangedEvent.subscribe(
      () => this.displayDes = false
    );
    this.closingEditModal = this.stomachServ.closeEditingModalBoxEvent.subscribe(
      () => {this.closeEditingModalBox(); this.displayDes = false}
    );
  }
  ngOnDestroy() {
    // this.stomachServ.saveFoodsToDatabase();
    this.foodEditSub.unsubscribe();
    this.closingEditModal.unsubscribe();
    this.displayDes = false; // stop displaying description
  }

  closeEditingModalBox() {
    const shadowEl = document.getElementsByClassName('modal-backdrop');
    shadowEl[0].remove();
    this.isEditing = false;
    this.isSelecting = false;
  }
}
