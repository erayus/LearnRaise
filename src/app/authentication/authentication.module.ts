
import {AuthenticationComponent} from "./authentication.component";
import {LogInComponent} from "./log-in/log-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {AuthenticationRoutingModule} from "./authentication-routing.module";
/**
 * Created by imrte on 23/11/2017.
 */
@NgModule({
  declarations: [
    AuthenticationComponent,
    LogInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
  ]
})
export class AuthenticationModule {
}
