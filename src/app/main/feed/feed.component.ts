import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {StomachService} from "../content/stomach/stomach.service";
import {PetService} from "../../shared/pet.service";
import {Food} from "../../shared/food.model";
import {MainService} from "../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ServerService} from "../../shared/server.service";
import {DictionaryService} from "../../shared/dictionary.service";
declare var $: any;
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewChecked {
  defaultFoodType: string;
  state = 'auto';
  typesArray = [];
  meaningObj: any;
  foodsToStomach = [];
  food: any;

  constructor(
              private mainServ: MainService,
              private stomachServ: StomachService,
              private router: Router,
              private dictionaryServ: DictionaryService,
             ) { }

  ngOnInit() {
    this.defaultFoodType = 'none';

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

  //Manual feed: When the user feed the pet using manual feature
  onFeed(form: NgForm) {
    // const foodName = form.value.foodName;
    // const foodType = form.value.foodType;
    // const foodDes = form.value.foodDes;
    // const foodExample = form.value.foodExample;
    // if (!this.stomachServ.isFoodEaten( new Food(food, this.food.meaning, this.food.phonetic))) {
    //   alert('This food has already been added!')
    // } else {
    //   this.closeFeedBox();
    //   this.mainServ.onFeedPet.next(new Food(foodName, foodType, foodDes, foodExample));
    //   this.router.navigate(['main','stomach'])
    // }
  }

  //Auto feed: When the user feed the pet using dictionary feature
  addSelectedFoodsToStomach(){
    let addFood = () => {
        this.mainServ.onFeedPet.next(this.food);
        this.closeFeedBox();
        // this.mainServ.onFeedPet.next(new Food(this.foodResultName, food.type, food.description, food.example));
        this.router.navigate(['main', 'stomach'])
    };
    addFood();
  }

  toggleCookType() {
    if (this.state === 'manual') {
      this.state = 'auto'
    }else if (this.state === 'auto'){
      this.state = 'manual'
    } else {
      this.state = 'auto'
    }
    this.typesArray = [];
  }

  onLookUp(form: NgForm) {
    const foodNameLU = form.value.foodNameLU;
    if (foodNameLU.split('').indexOf(' ') !== -1){
      alert("Food's name cannot contain space")
    } else if (this.stomachServ.isFoodEaten(foodNameLU.toLowerCase())){
      alert('I have eaten this food')
    } else {
      this.state = 'result';
      this.dictionaryServ.lookUpFood(foodNameLU.toLowerCase()).subscribe(
          (response: any) => {
            console.log(response);
            // switch to result box
            this.state = 'result';

            this.food = response;
            this.meaningObj = this.food.meaning;
            this.typesArray = Object.keys(this.meaningObj);

          },
        (error) => {
            alert("Oops I can't find this word for you. Please check the word again");
            this.state = 'auto'
        }
      )
    }
    this.foodsToStomach = [];
  }


  selectFoodToStomach(index){
    //UI interaction
    let selectedFoodDiv = $('#wordLUResult').children()[index+1]; // plus 1 bcause index 0 of #wordLUResult is the header
    selectedFoodDiv.classList.toggle('selected');
    let selectedFood = this.typesArray[index];
    let isAdded = false;
    let foodAddedIndex: number;
    //Check if this food has already been added to the stomach
    this.foodsToStomach.forEach((food, index) => {
      if (selectedFood.description === food.description){ //Use the description to check to be the most precise
        isAdded = true;
        foodAddedIndex = index;
      }
    });

    if (!isAdded){
      this.foodsToStomach.push(selectedFood);
    }else{
      this.foodsToStomach.splice(foodAddedIndex,1);
    }
  }


  closeFeedBox() {
    this.mainServ.onCloseFeedBox.next();
  }
}
