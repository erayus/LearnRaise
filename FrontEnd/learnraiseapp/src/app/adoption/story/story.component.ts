import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-page1',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  constructor(){}
  ngOnInit() {}

  continueToPage2() {
    $('.page-1-wrapper').addClass('animated hinge').one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      () => {
        $('.page-1-wrapper').css('display', 'none');
        $('.page-2-overlay').css('display', 'block');
        $('.page-2-overlay').addClass('animated fadeIn');
        $('.page2-line-1').css('animation-name', 'typing');
        $('.page2-line-2').css('animation-name', 'typing');
        $('.page2-line-3').css('animation-name', 'typing');
        $('.page2-line-4').css('animation-name', 'typing');
      });
  }
  continueToPage3() {
    $('.page-2-wrapper').addClass('animated hinge').one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      () => {
        $('.page-2-wrapper').css('display', 'none');
        $('.page-3-overlay').css('display', 'block');
        $('.page-3-overlay').addClass('animated fadeIn');
        $('.page3-line-1').css('animation-name', 'typing');
        $('.page3-line-2').css('animation-name', 'typing');
        $('.page3-line-3').css('animation-name', 'typing');
      });
  }
  continueToPage4(){
    $('.page-3-wrapper').addClass('animated hinge').one(
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
      () => {
        $('.page-3-wrapper').css('display', 'none');
        $('.page-4-overlay').css('display', 'block');
        $('.page-4-overlay').addClass('animated fadeIn');
        $('.page4-line-1').css('animation-name', 'typing');
        $('.page4-line-2').css('animation-name', 'typing');
        $('.page4-line-3').css('animation-name', 'typing');
        $('.page4-line-4').css('animation-name', 'typing');
        $('.page4-line-5').css('animation-name', 'typing');
        $('.page4-line-6').css('animation-name', 'typing');
        $('.page4-line-7').css('animation-name', 'typing');
        $('.page4-line-8').css('animation-name', 'typing');
        $('.page4-line-9').css('animation-name', 'typing');
      });
  }
}
