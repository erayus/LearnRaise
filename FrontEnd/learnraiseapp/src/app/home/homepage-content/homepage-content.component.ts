import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../authentication/auth-service";
// import * as firebase from 'firebase';
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-homepage-content',
  templateUrl: './homepage-content.component.html',
  styleUrls: ['./homepage-content.component.css']
})
export class HomepageContentComponent implements OnInit {
  googleProvider: any;
  errorSubscription: Subscription;
  scrollSwitch1= true;
  scrollSwitch2= true;
  scrollSwitch3 = true;
  scrollSwitch4 = true;
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const position = $('.second-section-header').offset();
    $(document).ready(() => {
      $(window).scroll(() => {
        const secondSecPos =  $('.second-section-header').offset().top - 350;
        const thirdSecPos =  $('.third-section-header').offset().top - 350;
        const fourthSecPos = $('.fourth-section-header').offset().top - 350;
        const fifthSecPos = $('.fifth-section-content').offset().top - 500;

        const scrollPosition = $(window).scrollTop();

        if (  scrollPosition > secondSecPos  && this.scrollSwitch1) {
          if ($('.second-section-content').hasClass('fadeOut')) {
            $('.second-section-content').removeClass('fadeOut');
          }
            $('.second-section-content').css('display', 'flex');
            $('.second-section-header').addClass('pulse');
            $('.circle-1').addClass('rotateInDownLeft');
            $('.circle-2').addClass('rotateIn');
            $('.circle-3').addClass('rotateInDownRight');
            $('.description').addClass('fadeInUp');
          this.scrollSwitch1 = false;
        } else if ( scrollPosition < secondSecPos) {
          $('.second-section-content').addClass('fadeOut').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            () => {
              if (this.scrollSwitch1) {
                $('.second-section-content').css('display', 'none');
              }
            }
          );
          $('.second-section-header').removeClass('pulse');
          $('.circle-1').removeClass('rotateInDownLeft');
          $('.circle-2').removeClass('rotateIn');
          $('.circle-3').removeClass('rotateInDownRight');
          $('.description').removeClass('fadeInUp');
          this.scrollSwitch1 = true;
        } else if ( scrollPosition > thirdSecPos && this.scrollSwitch2){
          if ($('.third-section-body').hasClass('fadeOut')){
            $('.third-section-body').removeClass('fadeOut');
          }

          $('.third-section-header').addClass('pulse');
          $('.third-section-body').css('display', 'block');
          $('.third-section-icon').addClass('slideInLeft');
          $('.third-section-description').addClass('lightSpeedIn');
          this.scrollSwitch2 = false;
        } else if ( scrollPosition < thirdSecPos) {
          $('.third-section-body').addClass('fadeOut').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            () => {

              if (this.scrollSwitch2) {
                $('.third-section-body').css('display', 'none');
              }
            }
          );
          $('.third-section-header').removeClass('pulse');
          $('.third-section-icon').removeClass('slideInLeft');
          $('.third-section-description').removeClass('lightSpeedIn');
          this.scrollSwitch2 = true;
        } else if ( scrollPosition > fourthSecPos && this.scrollSwitch3) {
          if ($('.fourth-section-body').hasClass('fadeOut')){
            $('.fourth-section-body').removeClass('fadeOut');
          }
          $('.fourth-section-header').addClass('pulse');
          $('.fourth-section-body').css('display', 'flex');
          $('.left-content-item, .right-content-item').addClass('flipInX');
          this.scrollSwitch3 = false;
        } else if (scrollPosition < fourthSecPos){
          $('.fourth-section-body').addClass('fadeOut').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            () => {
              if (this.scrollSwitch3) {
                $('.fourth-section-body').css('display', 'none');
              }
            }
          );
          $('.fourth-section-header').removeClass('pulse');
          $('.left-content-item, .right-content-item').removeClass('flipInX');

          this.scrollSwitch3 = true;
        } else if (scrollPosition > fifthSecPos && this.scrollSwitch4){
          if ($('.fifth-section-content p').hasClass('fadeOut')) {
            $('.fifth-section-content p').removeClass('fadeOut');
          }
          $('.fifth-section-title').addClass('wobble');
          $('.fifth-section-content p').css('display', 'block');
          $('.fifth-section-description').addClass('bounceIn');
          $('.signUp-btn').addClass('jello');
          this.scrollSwitch4 = false;
        } else if (scrollPosition < fifthSecPos) {
          $('.fifth-section-content p').addClass('fadeOut').one(
            'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
            () => {
              if (this.scrollSwitch4) {
                $('.fifth-section-content p').css('display', 'none');
              }
            }
          );
          $('.fifth-section-title').removeClass('wobble');
          $('.fifth-section-description').removeClass('bounceIn');
          $('.signUp-btn').removeClass('jello');
          this.scrollSwitch4 = true;
        }
      });
    });
  }
  onToSignUp(){
    this.router.navigate(['/authentication/signup']);
  }

  // onLogInGoogle() {
  //   this.authService.loginGoogle(this.googleProvider);
  // }
}
