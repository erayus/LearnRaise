import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pet} from "../../shared/pet.model";
import {PetService} from "../../shared/pet.service";
import {OwnerService} from "../../shared/owner.service";
import {Owner} from "../../shared/owner.model";

@Component({
  selector: 'app-petchoose',
  templateUrl: './petchoose.component.html',
  styleUrls: ['./petchoose.component.css']
})
export class PetchooseComponent implements OnInit {
  pet: Pet;
  owner: Owner;
  petName: string;
  currentStage = 'settingName';
  constructor(private router: Router,
              private route: ActivatedRoute,
              private petServ: PetService,
              private ownerServ: OwnerService) { }

  ngOnInit() {
    setTimeout(() => {
      this.pet = this.petServ.retrivePet();
      this.owner = this.ownerServ.retrieveOwner();
    } , 2000);
  }
  moveToNextStage(stage: string){
   switch (stage) {
     case 'communityAccess':
       this.petServ.setName(this.petName);
       this.petServ.updatePet();
       this.petServ.destroyPet();
       this.ownerServ.finishReg();
       this.ownerServ.saveOwnerToDatabase() ;
       this.currentStage = 'communityAccess';
       break;
     case 'InfoAnnouncement':
       this.currentStage = 'InfoAnnouncement';
       break
   }
  }
  navigateToMain() {
    // this.router.navigate(['/main', 'petinfo']);
    window.location.href = "/main/petinfo"
  }
}
