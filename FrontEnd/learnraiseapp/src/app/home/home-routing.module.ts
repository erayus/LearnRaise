import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {AuthenticationComponent} from "../authentication/authentication.component";
const homeRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'authentication', component: AuthenticationComponent},

];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {}
