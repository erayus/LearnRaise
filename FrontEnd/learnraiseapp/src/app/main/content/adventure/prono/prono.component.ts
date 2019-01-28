import {Component, Input, OnInit} from '@angular/core';
import {Food} from '../../../../shared/food.model';
import {StomachService} from '../../stomach/stomach.service';
import {AdventureService} from '../adventure.service';
declare var $: any;
declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-prono',
  templateUrl: './prono.component.html',
  styleUrls: ['./prono.component.css']
})
export class PronoComponent implements OnInit {
  @Input() foodNameList: string[];
  countdownTime = 3;
  detectedFood: string;
  testingFood: any;
  correctScore = 0;
  inCorrectScore = 0;
  foodPointer = 0;
  countdownInterval;

  constructor(private stomachServ: StomachService,
              private adventureServ: AdventureService
              ) { }

  ngOnInit() {

    this.adventureServ.onGameStarted.subscribe(
      ()=>{
        $('#game-info').hide();
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream)=> {
            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
            console.log('You let me use your mic!');
            const recognition = new SpeechRecognition();
            //Configure the recognition
            recognition.continuous = false; //After getting a result, recognition will stop
            recognition.lang = 'en-US';
            recognition.interimResults = false; //Just show the result at the end of the speech
            recognition.maxAlternatives = 1;  //Just show the most confident result

            let $countDownArea = $('#countdown');
            $countDownArea.show();

            this.countdownInterval = setInterval(() => {
              if (this.countdownTime > 0) {
                this.countdownTime -= 1;
                console.log('wewr')
              } else {

                //Hide the countdnwn screen
                $countDownArea.hide();
                //Start the game
                this.startProno( this.foodNameList, recognition)
              }
            }, 1000);

            $('#gameModal').on('hidden.bs.modal', (e) => {
              recognition.stop();
              console.log('stopped');
              this.countdownTime = 3;
              clearInterval(this.countdownInterval);
              $('#gameResult-area').hide();
              $('#closeGame-btn').hide();
            });
          })
          .catch((err) => {
            // console.log('No mic for you!');
            // alert("Sorry the app needs to use your microphone to assess your pronunciation")
            // this.adventureServ.onGameCompleted.next();
            // $('#gameModal').modal('hide');
          });
      }
    );

  }

  startProno(foodNameList, recognition){
    clearInterval(this.countdownInterval);

    $('#game-interface').show();
    //Set current testing food
    this.testingFood = foodNameList[this.foodPointer];
    $('#testing-food').text(this.testingFood);

    //Start listening to the user
    recognition.start();

    //When speech detected
    recognition.onresult = (event) => {
      // console.log("Event: ", event);
      let last = event.results.length - 1;
      //Get the result of speech recognition and make sure there is no space in it for exact testing
      this.detectedFood = event.results[last][0].transcript.replace(/ /g,'');
      console.log(this.detectedFood);
      $('#detected-food').text(this.detectedFood);
      //If it's correct
      if (this.detectedFood.toLowerCase() === this.testingFood.toLowerCase()){
        //If this is not the last word in the last
        if (this.foodPointer != foodNameList.length - 1){
          succeed();

          //Wait for the animation to finish
          setTimeout(()=>{
            //Set detected food to empty string
            $('#detected-food').text('');
            //Hide correct icon and show recording icon
            recognition.start();
            $('#recording-area').show();
            $('#ticking-area').hide();


            //Move the pointer to the next food in the list
            this.foodPointer += 1;
            this.testingFood = foodNameList[this.foodPointer];

            //Display the next food on the interface
            $('#testing-food').text(this.testingFood);


          }, 2000);
          // if this is the last word in the list
        }else{
          succeed();

          //Wait for the animation to finish
          setTimeout(()=>{
            //Set detected food to empty string
            $('#detected-food').text('');
            //End the game and show the result
            this.endProno(recognition);
          }, 2000);
        }
        //If it's wrong
      }else{
        //Hide recording icon and show ticking icon
        $('#recording-area').hide();
        $('#incorrect-area').show();

        setTimeout(() => {
          recognition.start();
          $('#detected-food').text(''); //Set detected food to empty string
          $('#recording-area').show();
          $('#incorrect-area').hide();
          this.inCorrectScore += 1;
          $('#incorrect-score').text(this.inCorrectScore)
        }, 1000);
      }
    };
    recognition.onnomatch = function() {
      console.log('no match');
    };

    let succeed = () =>{
      //Hide recording icon and show correct icon
      $('#recording-area').hide();
      $('#ticking-area').show();
      //Increase correct score and display it on the interface
      this.correctScore += 1;
      $('#correct-score').text(this.correctScore);
    }
  }

  endProno = (recognition) => {
    // Stop recording
    recognition.stop();
    //Hide stop-button and show close-button
    $('#stopGame-btn').hide();
    $('#closeGame-btn').show();
    //Hide game-interface and show game-result area
    $('#game-interface').hide();
    $('#gameResult-area').show();

    let earningPoints = this.correctScore;
    let losingPoints = this.inCorrectScore*2;
    let totalPoints = earningPoints - losingPoints;
    $('#earning-points').text(earningPoints);
    $('#losing-points').text(losingPoints);
    $('#total-points').text(totalPoints);


    this.adventureServ.onGameCompleted.next();
  };

}
