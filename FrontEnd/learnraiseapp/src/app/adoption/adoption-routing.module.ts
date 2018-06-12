import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AdoptionComponent} from "./adoption.component";
import {PetquizzComponent} from "./petquizz/petquizz.component";
import {PetchooseComponent} from "./petchoose/petchoose.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {Page1Component} from "./petquizz/page1/page1.component";
import {Page2Component} from "./petquizz/page2/page2.component";

const adoptionRoutes: Routes = [
  {path: '', component: AdoptionComponent, children: [
    {path: 'petquizz', component: PetquizzComponent, children: [
      {path: 'page1', component: Page1Component},
      {path: 'page2', component: Page2Component},
    ]},
    {path: 'petchoose', component: PetchooseComponent}
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
