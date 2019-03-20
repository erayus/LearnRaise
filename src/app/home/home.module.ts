import {NgModule} from "@angular/core";
import {FooterComponent} from "./footer/footer.component";
import {HomepageContentComponent} from "./homepage-content/homepage-content.component";
import {TopNavBarComponent} from "./top-nav-bar/top-nav-bar.component";
import {CommonModule} from "@angular/common";
import {HomeRoutingModule} from "./home-routing.module";
import {FormsModule} from "@angular/forms";
import {HomeComponent} from "./home.component";

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    HomepageContentComponent,
    TopNavBarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
  ]
})
export class HomeModule {
}
