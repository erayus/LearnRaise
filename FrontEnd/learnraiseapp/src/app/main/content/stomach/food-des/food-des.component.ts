import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Food} from "../../../../shared/food.model";
import {StomachService} from "../stomach.service";
import {DictionaryService} from '../../../../shared/dictionary.service';

declare var $: any;

@Component({
  selector: 'app-food-des',
  templateUrl: './food-des.component.html',
  styleUrls: ['./food-des.component.css']
})
export class FoodDesComponent implements OnInit, OnChanges{
  @Input() food: Food;
  meaningObj: any;
  typesArray: any[];

  constructor(private stomachServ: StomachService,
              private dictionaryServ: DictionaryService) { }
  ngOnInit() {
    this.meaningObj = this.food.meaning;
    this.typesArray = Object.keys(this.meaningObj);
    this.stomachServ.foodAddedEvent.subscribe(
      (food: Food) => {
        this.food = food
      }
    );
  }

  // Update the meaningObj and typesArray when the selectedFood change
  ngOnChanges() {
    this.meaningObj = this.food.meaning;
    this.typesArray = Object.keys(this.meaningObj);
  }
  pronounceWord(word: string) {
    $(".pronounce-btn").addClass("active");
    // Check if the mp3 Link has been retrieving before to avoid repeating api calls
    if (this.stomachServ.isFoodSoundExisting(word)) {
      const mp3Link = this.stomachServ.getFoodSound(word);
      const audio = new Audio(mp3Link);
      audio.play();
      $(".pronounce-btn").removeClass("active");
    } else {
      this.dictionaryServ.getWordPronunciation(word).subscribe(
        (mp3FileURL) => {
          const audio = new Audio(mp3FileURL);
          audio.play();

          // Construct the food obj to save the mp3 link to avoid repeating api calls
          const foodObj = {
            name: word,
            mp3Link: mp3FileURL
          };
          this.stomachServ.addFoodSound(foodObj);
          $(".pronounce-btn").removeClass("active");
        },
        (error) => {
          console.log("mp3File Error: ", error)
        }
      );
    }

  }



}
