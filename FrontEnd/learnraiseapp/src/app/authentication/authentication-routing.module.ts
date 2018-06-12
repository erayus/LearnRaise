import {RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AuthenticationComponent} from "./authentication.component";
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
/**
 * Created by imrte on 23/11/2017.
 */

const authenticationRoutes = [
  {path: 'authentication', component: AuthenticationComponent, children: [
    {path: 'login', component: LogInComponent},
    {path: 'signup', component: SignUpComponent},
  ]}
];
@NgModule({
  imports: [
    RouterModule.forChild(authenticationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule {}
