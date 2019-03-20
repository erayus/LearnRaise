import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {ContentComponent} from "./content/content.component";
import {FeedComponent} from "./feed/feed.component";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MainRoutingModule} from "./main-routing.module";
import {PetInfoComponent} from "./content/pet-info/pet-info.component";
import {AdventureComponent} from "./content/adventure/adventure.component";
import {FoodTypeShortenPipe} from "./content/stomach/food-list/food-item/foodTypeShorten.pipe";
import {FoodNameShortenPipe} from "./content/stomach/food-list/food-item/foodNameShorten.pipe";
import {NotFoundComponent} from "../not-found/not-found.component";
import {StomachComponent} from "./content/stomach/stomach.component";
import {FoodDesComponent} from "./content/stomach/food-des/food-des.component";
import {FoodListComponent} from "./content/stomach/food-list/food-list.component";
import {FoodEditComponent} from "./content/stomach/food-edit/food-edit.component";
import {FoodItemComponent} from "./content/stomach/food-list/food-item/food-item.component";
import { ToolBarComponent } from './healthExpBar/tool-bar.component';
import { FoodFilterPipe } from './content/stomach/food-filter.pipe';
import { ExtraNavComponent } from './extra-nav/extra-nav.component';
import {CommunityComponent} from "./content/community/community.component";
import {MatButtonModule, MatCheckboxModule, MatDividerModule, MatListModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { PronoComponent } from './content/adventure/prono/prono.component';
import {AdventureService} from './content/adventure/adventure.service';
import {FoodSynonymsSpaceAdderPipe} from './feed/FoodSynonymsSpaceAdderPipe';


@NgModule({
  declarations: [
    MainComponent,
    FeedComponent,
    FoodSynonymsSpaceAdderPipe,
    NavBarComponent,
    ToolBarComponent,
    ContentComponent,
    CommunityComponent,
    AdventureComponent,
    PronoComponent,
    PetInfoComponent,
    StomachComponent,
    FoodDesComponent,
    FoodEditComponent,
    FoodListComponent,
    FoodItemComponent,
    FoodNameShortenPipe,
    FoodTypeShortenPipe,
    NotFoundComponent,
    ToolBarComponent,
    FoodFilterPipe,
    ExtraNavComponent,
  ],
  imports: [
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  providers: [
    AdventureService
  ]
})

export class MainModule {
}
