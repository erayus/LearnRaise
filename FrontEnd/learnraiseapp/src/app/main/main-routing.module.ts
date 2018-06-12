import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {PetInfoComponent} from "./content/pet-info/pet-info.component";
import {AdventureComponent} from "./content/adventure/adventure.component";
import {StomachComponent} from "./content/stomach/stomach.component";
import {NotFoundComponent} from "../not-found/not-found.component";
import {CanDeactivateGuard} from "./can-deactivate-guard.service";
import {CommunityComponent} from "./content/community/community.component";



const mainRoutes: Routes = [
  {path: '', component: MainComponent, canDeactivate: [CanDeactivateGuard], children: [
    {path: '', redirectTo: 'petinfo', pathMatch: 'full'},
    {path: 'petinfo', component: PetInfoComponent},
    {path: 'adventure', component: AdventureComponent},
    {path: 'stomach', component: StomachComponent},
    {path: 'community', component: CommunityComponent},
  ]},
  {path: '**', redirectTo: '/authentication/login' }
];


@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {

}

