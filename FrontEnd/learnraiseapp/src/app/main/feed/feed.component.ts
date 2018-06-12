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
  resultArray = [];
  foodsToStomach = [];
  foodResultName: string;
  constructor(private petServ: PetService,
              private mainServ: MainService,
              private stomachServ: StomachService,
              private router: Router,
              private dictionaryServ: DictionaryService,
              private route: ActivatedRoute,
              private serverServ: ServerService) { }

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
  onFeed(form: NgForm) {
    const foodName = form.value.foodName;
    const foodType = form.value.foodType;
    const foodDes = form.value.foodDes;
    const foodExample = form.value.foodExample;
    if (!this.stomachServ.checkSameFoods( new Food(foodName, foodType, foodDes, foodExample))) {
      alert('This food has already been added!')
    } else {
      this.closeFeedBox();
      this.mainServ.onFeedPet.next(new Food(foodName, foodType, foodDes, foodExample));
      this.router.navigate(['main','stomach'])
    }
  }
  toggleCookType() {
    if (this.state === 'manual') {
      this.state = 'auto'
    }else if (this.state === 'auto'){
      this.state = 'manual'
    } else {
      this.state = 'auto'
    }
    this.resultArray = [];
  }

  onLookUp(form: NgForm) {
    const foodNameLU = form.value.foodNameLU;
    if (foodNameLU.split('').indexOf(' ') !== -1){
      alert("Food's name cannot contain space")
    }else {
      this.state = 'result';
      this.dictionaryServ.lookUpFood(foodNameLU.toLowerCase()).subscribe(
        (response: any[]) => {
          if (response.length == 0) {
            alert('Oops I cannot find this word for you :(');
          } else {
            this.foodResultName = foodNameLU;
            for (const object of response) {
              if (object['senses'] !== null
                && object['senses'][0].hasOwnProperty('definition')
                && object.hasOwnProperty('part_of_speech')
                && object['headword'].toLowerCase() === foodNameLU.toLowerCase()) {
                const resultObj = {};
                resultObj['type'] = object["part_of_speech"];
                resultObj['description'] = object["senses"][0]["definition"];
                resultObj['example'] = 'no example found!';
                if (object["senses"][0].hasOwnProperty('examples')) {
                  resultObj['example'] = object['senses'][0]['examples'][0]['text'];
                } else if (object["senses"][0].hasOwnProperty('gramatical_examples')) {
                  resultObj['example'] = object['senses'][0]['gramatical_examples'][0]['examples'][0]['text'];
                }
                this.resultArray.push(resultObj);
              }
            }
          }
        }
      );
    }
    this.foodsToStomach = [];
  }
  selectFoodToStomach(index){
    //UI interaction
    let selectedFoodDiv = $('#wordLUResult').children()[index+1]; // plus 1 bcause index 0 of #wordLUResult is the header
    selectedFoodDiv.classList.toggle('selected');
    let selectedFood = this.resultArray[index];
    let isAdded = false;
    let foodAddedIndex: number;
    this.foodsToStomach.forEach((food, index) => {
      if (selectedFood.description === food.description){
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
  addSelectedFoodsToStomach(){
    let checkSameTypeFood = () => {
      for (let i = 0; i < this.foodsToStomach.length-1; i++){
        for (let j = i+1; j < this.foodsToStomach.length; j ++){
          if (this.foodsToStomach[i].type === this.foodsToStomach[j].type){
            return false;
          }
        }
      }
      return true;
    };
    let addFood = () => {
      let sameFoodDetected = false;
      this.foodsToStomach.forEach((food) => {
        if (!this.stomachServ.checkSameFoods(new Food(this.foodResultName, food.type, food.description, food.example))){ // same food detected
          sameFoodDetected = true;
          return
        }
      });
      if (sameFoodDetected){
        alert("There are foods that I have eaten")
      } else{
        this.foodsToStomach.forEach( (food) => {
          this.closeFeedBox();
          this.mainServ.onFeedPet.next(new Food(this.foodResultName, food.type, food.description, food.example));
          this.router.navigate(['main', 'stomach'])
        });
      }
    };

    if (this.foodsToStomach.length > 1 ){
      if (checkSameTypeFood()){
        addFood();
      }else {
        alert("Ooops I can't eat food that have the same types");
      }
    } else{
      addFood();
    }
  }
  closeFeedBox() {
    this.mainServ.onCloseFeedBox.next();
  }
}
