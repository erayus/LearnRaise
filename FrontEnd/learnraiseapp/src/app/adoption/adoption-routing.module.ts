import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdoptionComponent} from "./adoption.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {StoryComponent} from "./story/story.component";
import {RegistrationComponent} from "./registration/registration.component";

const adoptionRoutes: Routes = [
  {path: '', component: AdoptionComponent, children: [
    {path: 'story', component: StoryComponent},
    {path: 'registration', component: RegistrationComponent},
  ]}
];



@NgModule({
  imports: [
    RouterModule.forChild(adoptionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdoptionRoutingModule {}
