import {NgModule} from "@angular/core";
import {AdoptionComponent} from "./adoption.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AdoptionRoutingModule} from "./adoption-routing.module";
import { RegistrationComponent} from './registration/registration.component';
import {StoryComponent} from "./story/story.component";

@NgModule ({
  declarations: [
    AdoptionComponent,
    RegistrationComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdoptionRoutingModule
  ]
})

export class AdoptionModule {}
