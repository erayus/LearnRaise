import {AfterContentChecked, AfterViewChecked, Component, OnInit} from '@angular/core';
import {StomachService} from '../stomach/stomach.service';
import {GameService} from '../../../shared/game.service';
import {AdventureService} from './adventure.service';
import {MainService} from '../../main.service';
import {Food} from '../../../shared/food.model';
declare var $: any;

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit, AfterViewChecked {
  gameStatus = 'none';
  gameSelected = '';
  numberOfFoodsInStomach: number;
  foodNameList: string[];
  constructor(private stomachServ: StomachService,
              private gameServ: GameService,
              private adventureServ: AdventureService,
              private mainServ: MainService){}

  ngOnInit() {

    this.adventureServ.onGameCompleted.subscribe(
      ()=> this.gameStatus = 'completed'
    );
    console.log('what', this.stomachServ.getFoodsInStomach().length);
    if (this.stomachServ.getFoodsInStomach().length > 0 ){
      let foodsInStomach = this.stomachServ.getFoodsInStomach();
      console.log(foodsInStomach);
      this.foodNameList = this.retrieveAndShuffleFoodNameList(foodsInStomach);
      this.numberOfFoodsInStomach = this.foodNameList.length;
    }else {
      this.stomachServ.onFoodsLoaded.subscribe(
        (foods: Food[]) => {
          this.foodNameList = this.retrieveAndShuffleFoodNameList(foods);
          console.log(this.foodNameList);
          this.numberOfFoodsInStomach = this.foodNameList.length;
        }
      );
    }
  }
  ngAfterViewChecked(){
    //Enable tool tips
    $('[data-toggle="tooltip"]').tooltip();
    $('.requirement-icon').click( function () {
      $(this).tooltip();
    })
  }

  retrieveAndShuffleFoodNameList(foods: Food[]){
    //Get the list of food in the stomach
    let foodNameList = foods.map((food: Food) => {
      return food.word
    });
    //Shuffle the list
    for (let i = foodNameList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [foodNameList[i], foodNameList[j]] = [foodNameList[j], foodNameList[i]];
    }
    return foodNameList
  }

  selectGame(game: string){
    this.gameSelected = game;
  }

  startGame(){
    this.gameStatus = 'inProgress';
    this.adventureServ.onGameStarted.next();
  }

  stopGame() {
    //If the game is in progress
    if (this.gameStatus === 'inProgress') {
      if (confirm('Are you sure you want to close this game?')) {
        this.gameStatus = 'none';
        this.gameSelected = '';
        $('#gameModal').modal('hide');
      }
    }else {
      this.gameStatus = 'none';
      this.gameSelected = '';
      $('#gameModal').modal('hide');
    }
  }
}
