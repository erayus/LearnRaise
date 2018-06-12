import {NgModule} from "@angular/core";
import {AdoptionComponent} from "./adoption.component";
import {PetchooseComponent} from "./petchoose/petchoose.component";
import {PetquizzComponent} from "./petquizz/petquizz.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdoptionRoutingModule} from "./adoption-routing.module";
import { Page1Component } from './petquizz/page1/page1.component';
import { Page2Component } from './petquizz/page2/page2.component';

@NgModule ({
  declarations: [
    AdoptionComponent,
    PetchooseComponent,
    PetquizzComponent,
    Page1Component,
    Page2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdoptionRoutingModule
  ]
})

export class AdoptionModule {}
