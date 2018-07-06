import {Component, OnInit, HostListener} from '@angular/core';
import {AuthService} from "../authentication/auth-service";
import {Router, ActivatedRoute} from "@angular/router";
import {PetService} from "../shared/pet.service";
import {OwnerService} from "../shared/owner.service";
import {ServerService} from "../shared/server.service";
import {Owner} from "../shared/owner.model";
import {Pet} from "../shared/pet.model";

@Component({
  selector: 'app-adoption',
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.css']
})
export class AdoptionComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHander($event) {
    // this.exit();
  };
  @HostListener('window:load', ['$event'])
  loadHander($event) {
    this.refresh();
  };

  // exit: any = () => {
  //   this.petServ.saveLeaveTimeAndHungerTime();
  //   this.petServ.destroyPet();
  //   this.ownerServ.saveOwnerToDatabase();
  // };

  constructor(private petServ: PetService,
              private ownerServ: OwnerService,
              private serverServ: ServerService) {
  }
  refresh = () => {
    this.serverServ.setUpOwnerKeyAndToken();//IMPORTANT: must be called first
    this.serverServ.onOwnerKeyAndTokenReady.subscribe(
      () => {
        this.serverServ.getOwner()
          .subscribe(
            (owner: Owner) => {
              console.log("Owner: ", owner);
              this.ownerServ.initOwner(owner);
            },
            (error)=> {console.log(error)}
          );
        this.serverServ.getPet()
          .subscribe(
            (pet: Pet) => {
              console.log("Pet: ", pet);
              this.petServ.initPet(pet);
            },
          ),
          (error) => {console.log(error)
          }
      },
      (error) => {console.log("Fail setting up owner key", error)}
    );
  };
  ngOnInit() {
  }
}


