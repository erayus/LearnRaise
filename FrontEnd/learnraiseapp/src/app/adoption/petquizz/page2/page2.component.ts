import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PetService} from "../../../shared/pet.service";
import {OwnerService} from "../../../shared/owner.service";
declare var $: any;

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {

  page = 'page1';
  ownerNickname: string;
  ownerAvatar: string;
  ownerPet = {name:'', species:'', element:'', story: '',weight: 0, height: 0, pictureURL:[]};
  constructor( private router: Router,
               private route: ActivatedRoute,
               private petServ: PetService,
               private ownerServ: OwnerService) { }
  ngOnInit() {
  }
  chooseDark() {
    this.petServ.installPet('Adios',
      'Wolf',
      'Ice',
      'Adios is an icy wolf who is an instinctive warrior. He is a born-leader, never afraid to be the last one to eat and first one to lead.' +
      ' He is also fearless to be the lonely wolf to face the challenges.',
      10,
      50,
      ['https://orig00.deviantart.net/85d2/f/2015/145/8/3/wolflinkf_by_daieny-d8urgky.png','' +
      'https://orig00.deviantart.net/2682/f/2011/066/4/6/chibi___wolf_by_dolphy-d3b4pdz.png','','']
    );
    this.router.navigate(['adoption', 'petchoose', this.route.snapshot.params['id']]);
  }
  chooseFire() {
    this.petServ.installPet(
      'Adus',
      'Dragon',
      'Metal',
      'Born to be the king of the sky. ',
      15,
      75,
      ['https://s-media-cache-ak0.pinimg.com/originals/96/e3/15/96e31533291321ab069944827241e399.jpg',
        '','','']
    );
    this.router.navigate(['adoption', 'petchoose', this.route.snapshot.params['id']]);
  }
  onProceed(page: string){
    switch (page) {
      case 'page2':
        this.page = 'page2';
        break;
      case 'page3':
        if (this.ownerNickname !== undefined && this.ownerNickname.length > 0) {
          this.ownerServ.setName(this.ownerNickname);
          this.page = 'page3';
        } else {
          $('.nickname-input').css('border','1px solid red');
          alert('Other MonGurus would like to know your name! ')
        }
        break;
      case 'page4':
        this.ownerServ.setAvatar(this.ownerAvatar);
        this.page = 'page4';
        break;
      case 'done':
        this.petServ.installPet(this.ownerPet.name,
          this.ownerPet.species,
          this.ownerPet.element,
          this.ownerPet.story,
          this.ownerPet.weight,
          this.ownerPet.height,
          this.ownerPet.pictureURL);
        this.router.navigate(['../../petchoose'], {relativeTo: this.route});
        break;
    }
  }
  onPreceed(page: string){
    switch (page) {
      case 'page1':
        this.page = 'page1';
        break;
      case 'page2':
        this.page = 'page2';
        break;
      case 'page3':
        this.page = 'page3';
        break;
    }
  }
  chooseAvatar(id: number){
    const selectedPicEl = $('.avatar-container').children()[id];
    $('.avatar-container').children().removeClass('selected');
    selectedPicEl.classList.toggle('selected');
    switch (id){
      case 0:
        this.ownerAvatar = '../../../assets/avatar/batman.jpg';
        break;
      case 1:
        this.ownerAvatar = '../../../assets/avatar/priate-girl.png';
        break;
      case 2:
        this.ownerAvatar = '../../../assets/avatar/cute-girl.png';
        break;
      case 3:
        this.ownerAvatar = '../../../assets/avatar/poop.png';
        break;
      case 4:
        this.ownerAvatar = '../../../assets/avatar/serious.jpg';
        break;
      case 5:
        this.ownerAvatar = '../../../assets/avatar/images.png';
        break;

    }
  }


  choosePet(id: number) {
    const selectedPetEl = $('.pet-container').children()[id];
    $('.pet-container ').children().removeClass('selected');
    selectedPetEl.classList.toggle('selected');

    switch (id) {
      case 0:
        this.ownerPet.name = "Nios";
        this.ownerPet.species = "Nios";
        this.ownerPet.element = 'Water';
        this.ownerPet.story = 'Before the Invasion, Nios were always viewed by other creatures in their universe as royalty. ' +
          'They give off such strong aura that whenever they are in presence of other creatures, ' +
          'they are showered with respect and hospitality. ';
        this.ownerPet.weight = 40;
        this.ownerPet.height = 60;
        this.ownerPet.pictureURL = [ "../../../assets/pet/Nios.png", '', '', ''];
        break;
      case 1:
        this.ownerPet.name = "Nera";
        this.ownerPet.species = "Nera";
        this.ownerPet.element = 'Diverse';
        this.ownerPet.story = 'Nera are a species that move around in a pack, there is usually a ' +
          'pack leader that leads the way. During the invasion, most Neras were separated from their pack ' +
          'and were forced to take lead on their own resulting in each and every Nera to develop their own ' +
          'leadership skills.';
        this.ownerPet.weight = 50;
        this.ownerPet.height = 78;
        this.ownerPet.pictureURL = ['../../../assets/pet/Nera.png','','',''];
        break;
      case 2:
        this.ownerPet.name = 'Eyos';
        this.ownerPet.species = 'Eyos';
        this.ownerPet.element = 'Fire';
        this.ownerPet.story = 'Eyos are species that wandered around many different places of their universe.' +
          ' Originally from the East End of their Universe, Eyos eventually migrated to the South End. ' +
          'Many Places in the South End are undiscovered or have never been visited by other species. ' +
          'This attracts the species of Eyos as they as a species enjoy learning and adventuring.';
        this.ownerPet.weight = 56;
        this.ownerPet.height = 80;
        this.ownerPet.pictureURL = ['../../../assets/pet/Eyos.png', '', '', ''];
        break;
    }
  }
}
