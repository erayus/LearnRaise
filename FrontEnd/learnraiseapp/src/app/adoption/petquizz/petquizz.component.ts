import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Pet} from "../../shared/pets/pet.model";
import {PetService} from "../../shared/pet.service";
import {OwnerService} from "../../shared/owner.service";
@Component({
  selector: 'app-petquizz',
  templateUrl: './petquizz.component.html',
  styleUrls: ['./petquizz.component.css']
})
export class PetquizzComponent implements OnInit {
ngOnInit(){

}
}
