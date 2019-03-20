import {AfterContentChecked, AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {StomachService} from '../stomach/stomach.service';
import {GameService} from '../../../shared/game.service';
import {AdventureService} from './adventure.service';
import {MainService} from '../../main.service';
import {Food} from '../../../shared/food.model';
import {Subscription} from 'rxjs/Rx';
import {Router} from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit, AfterViewChecked, OnDestroy {
  isSpeechRecogIsAvailable: boolean;
  gameStatus = 'none';
  gameSelected = '';
  numberOfFoodsInStomach: number;
  onGameCompletedSub: Subscription;
  foodNameList: string[];
  foodsInStomach: Food[];
  constructor(private stomachServ: StomachService,
              private gameServ: GameService,
              private adventureServ: AdventureService,
              private mainServ: MainService,
              private router: Router){}

  ngOnInit() {
    // Go back to pet info for correct food loading
    window.onload =  () => {
      this.router.navigate(['/main'])
    };

    // Subscribe to changes in the stomach
    this.stomachServ.getFoodsObserver().subscribe(
      (foods: Food[]) => {
        this.foodsInStomach = foods.reverse();
        this.foodNameList = this.adventureServ.getShuffledFoodNameList(this.foodsInStomach);
        this.numberOfFoodsInStomach = this.foodNameList.length;
      }
    );

    this.checkIfSpeechRecognitionIsAvailable();

    this.onGameCompletedSub = this.adventureServ.onGameCompleted.subscribe(
      () => this.gameStatus = 'completed'
    );
  }

  checkIfSpeechRecognitionIsAvailable() {
    if ("webkitSpeechRecognition" in window) {
      this.isSpeechRecogIsAvailable = true;
    } else{
      this.isSpeechRecogIsAvailable = false;
    }
  }

  ngAfterViewChecked() {
    //Enable tool tips
    $('[data-toggle="tooltip"]').tooltip();
    $('.requirement-icon').click( function () {
      $(this).tooltip();
    })
  }


  selectGame(game: string) {
    this.gameSelected = game;
  }

  startGame() {
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

  ngOnDestroy() {
    this.onGameCompletedSub.unsubscribe();
  }

}
