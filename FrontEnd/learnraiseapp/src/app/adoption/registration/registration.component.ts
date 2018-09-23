import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PetService} from "../../shared/pet.service";
import {OwnerService} from "../../shared/owner.service";
import {Pet} from "../../shared/pet.model";
import {Owner} from "../../shared/owner.model";
declare var $: any;

@Component({
  selector: 'app-page2',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  page = 'welcome';
  ownerNickname: string;
  ownerAvatar: string;
  ownerPet = {name:'', species:'', element:'', story: '',weight: 0, height: 0, pictureURL:[]};

  pet: Pet;
  petName: string;
  owner: Owner;
  constructor( private router: Router,
               private route: ActivatedRoute,
               private petServ: PetService,
               private ownerServ: OwnerService) { }
  ngOnInit() {
  }

  onProceed(page: string){
    switch (page) {
      case 'userName':
        this.page = 'userName';
        break;
      case 'avatar':
        if (this.ownerNickname !== undefined && this.ownerNickname.length > 0) {
          this.ownerServ.setName(this.ownerNickname);
          this.page = 'avatar';
        }
        break;
      case 'petSelection':
        this.ownerServ.setAvatar(this.ownerAvatar);
        this.page = 'petSelection';
        break;
      case 'petName':
        this.petServ.installPet(this.ownerPet.name,
          this.ownerPet.species,
          this.ownerPet.element,
          this.ownerPet.story,
          this.ownerPet.weight,
          this.ownerPet.height,
          this.ownerPet.pictureURL);
          this.page = 'petName';
        setTimeout(() => {
          this.pet = this.petServ.retrivePet();
          this.owner = this.ownerServ.retrieveOwner();
          this.petName = this.pet.name;
        } , 2000);
        // this.router.navigate(['../petchoose'], {relativeTo: this.route});
        break;
      case 'communityAccess':
        this.petServ.setName(this.petName);
        this.petServ.updatePet();
        // this.petServ.destroyPet();
        this.ownerServ.finishReg();
        this.ownerServ.saveOwnerToDatabase();
        this.page = 'communityAccess';
        break;
      case 'infoAnnouncement':
        this.page = 'infoAnnouncement';
        break;
      case 'done':
        // this.router.navigate(['/main', 'petinfo']);
        window.location.href = '/main/petinfo';
        break;
    }
  }
  onPreceed(page: string){
    switch (page) {
      case 'story':
        this.page = 'story';
        break;
      case 'welcome':
        this.page = 'welcome';
        break;
      case 'userName':
        this.page = 'userName';
        break;
      case 'avatar':
        this.page = 'avatar';
        break;
      case 'petSelection':
        this.page = 'petSelection';
        break;
      case 'petName':
        this.page = 'petName';
        break;
      case 'communityAccess':
        this.page = "communityAccess";
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

    switch (id) {
      case 0:
        if (confirm("Are you sure you want to adopt Nios?")) {
          this.ownerPet.name = "Nios";
          this.ownerPet.species = "Nios";
          this.ownerPet.element = 'Water';
          this.ownerPet.story = 'Before the Invasion, Nios were always viewed by other creatures in their universe as royalty. ' +
            'They give off such strong aura that whenever they are in presence of other creatures, ' +
            'they are showered with respect and hospitality. ';
          this.ownerPet.weight = 40;
          this.ownerPet.height = 60;
          this.ownerPet.pictureURL = ["../../../assets/pet/Nios.png", '', '', ''];
          this.onProceed("petName");
          break;
        } else{
          break;
        }
      case 1:
        if (confirm("Are you sure you want to adopt Nera?")) {
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
        this.onProceed("petName");
        break;
        } else{
          break;
        }
      case 2:
        if (confirm("Are you sure you want to adopt Eyos?")) {
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
        this.onProceed("petName");
        break;
        } else{
          break;
        }
    }
  }
}
