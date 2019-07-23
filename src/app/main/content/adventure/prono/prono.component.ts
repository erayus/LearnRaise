import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Food} from '../../../../shared/food.model';
import {StomachService} from '../../stomach/stomach.service';
import {AdventureService} from '../adventure.service';
import {Subscription} from 'rxjs/Rx';
declare var $: any;
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-prono',
  templateUrl: './prono.component.html',
  styleUrls: ['./prono.component.css']
})
export class PronoComponent implements OnInit, OnDestroy{
  @Input() foodNameList: string[];
  gameStatus = "";
  onGameStartedSub: Subscription;
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

    this.onGameStartedSub = this.adventureServ.onGameStarted.subscribe(
      () => {
        $('#game-info').hide();
        // If the user allows us to use the mic
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            const recognition = new webkitSpeechRecognition();
            // Configure the recognition
            recognition.lang = 'en-US';
            recognition.interimResults = false; // Just show the result at the end of the speech
            recognition.maxAlternatives = 1;  // Just show the most confident result

            const $countDownArea = $('#countdown');
            $countDownArea.show();

            this.countdownInterval = setInterval(() => {
              if (this.countdownTime > 0) {
                this.countdownTime -= 1;
              } else {
                // Hide the countdnwn screen
                $countDownArea.hide();
                // Start the game
                this.startProno( this.foodNameList, recognition)
              }
            }, 1000);

            $('#gameModal').on('hidden.bs.modal', (e) => {
              this.gameStatus = 'ended';
              recognition.abort();
              this.countdownTime = 3;
              clearInterval(this.countdownInterval);
              $('#gameResult-area').hide();
              $('#closeGame-btn').hide();
            });
          })
          .catch((err) => {
            alert("Sorry the app needs to use your microphone to assess your pronunciation")
          });
      }
    );

  }

  startProno(foodNameList, recognition){
    clearInterval(this.countdownInterval);

    $('#game-interface').show();
    // Set current testing food
    this.testingFood = foodNameList[this.foodPointer];
    $('#testing-food').text(this.testingFood);

    //Start listening to the user
    recognition.start();

    recognition.onspeechend = function() {
      console.log('[On Speech end]');
      $('#recording-icon').css('animation-name', 'none');
      $('#recognition-status').text(" ");
    };

    recognition.onstart = function(event) {
      $('#recording-icon').css('animation-name', 'pulse');
      $('#recognition-status').text('Listening');
    };

    recognition.onend = (event) => {
      console.log('On ended event', event);
      $('#recognition-icon').css('animation-name', 'none');
      $('#recognition-status').text("");
    };

    recognition.onerror = function(event) {
      $('#recording-icon').css('animation-name', 'none');
      console.log('error', event.error);
    };


    $('#recording-icon').click(() => {
      recognition.start();
    });



    // When speech detected
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      // Get the result of speech recognition and make sure there is no space in it for exact testing
      this.detectedFood = event.results[last][0].transcript.replace(/ /g,'');
      $('#detected-food').text(this.detectedFood);
      $('#recognition-status').text('');

      // If it's correct
      if (this.detectedFood.toLowerCase() === this.testingFood.toLowerCase()){
        // If this is not the last word in the last
        if (this.foodPointer !== foodNameList.length - 1){
          succeed();

          // Wait for the animation to finish
          setTimeout(()=>{
            //Set detected food to empty string
            $('#detected-food').text('');
            //Hide correct icon and show recording icon
            $('#recording-area').show();
            $('#ticking-area').hide();

            // Move the pointer to the next food in the list
            this.foodPointer += 1;
            this.testingFood = foodNameList[this.foodPointer];

            // Display the next food on the interface
            $('#testing-food').text(this.testingFood);

            recognition.start();
          }, 2000);
          // if this is the last word in the list
        } else {
          succeed();
          // Wait for the animation to finish
          setTimeout(() => {
            // Set detected food to empty string
            $('#detected-food').text('');
            // End the game and show the result
            this.endProno(recognition);
          }, 2000);
        }
        // If it's wrong
      } else {
        fail();
        setTimeout(() => {
          $('#detected-food').text(''); //Set detected food to empty string
          $('#recording-area').show();
          $('#incorrect-area').hide();
          recognition.start();
        }, 1000);
      }
    };

    const succeed = () =>{
      // Hide recording icon and show correct icon
      $('#recording-area').hide();
      $('#ticking-area').show();
      // Increase correct score and display it on the interface
      this.correctScore += 1;
      $('#correct-score').text(this.correctScore);
    };
    const fail = () => {
      // Hide recording icon and show ticking icon
      $('#recording-area').hide();
      $('#incorrect-area').show();
      this.inCorrectScore += 1;
      $('#incorrect-score').text(this.inCorrectScore);

    }


  }

  endProno = (recognition) => {
    this.gameStatus = 'ended';
    // Stop recording
    recognition.abort();
    // Hide stop-button and show close-button
    $('#stopGame-btn').hide();
    $('#closeGame-btn').show();
    // Hide game-interface and show game-result area
    $('#game-interface').hide();
    $('#gameResult-area').show();

    const earningPoints = this.correctScore;
    const losingPoints = this.inCorrectScore * 2;
    const totalPoints = earningPoints - losingPoints;
    $("#earning-points").text(earningPoints);
    $('#losing-points').text(losingPoints);
    $('#total-points').text(totalPoints);


    this.adventureServ.onGameCompleted.next();
  };

 ngOnDestroy() {
   this.onGameStartedSub.unsubscribe();
 }


}
