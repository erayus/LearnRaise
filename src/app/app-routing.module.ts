import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";

// import {AuthGuard} from "./home/auth-guard.service";

const appRoutes: Routes = [
  {path: '', loadChildren:'./home/home.module#HomeModule'},
  {path: 'authentication', loadChildren:'./authentication/authentication.module#AuthenticationModule'},
  {path: 'team', redirectTo: '/team'},
  {path: 'adoption', loadChildren: './adoption/adoption.module#AdoptionModule' },
  {path: 'main', loadChildren: './main/main.module#MainModule'}
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}


