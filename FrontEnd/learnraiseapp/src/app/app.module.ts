import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./authentication/auth-service";
import {AuthGuard} from "./authentication/auth-guard.service";
import {PetService} from "./shared/pet.service";

import {RouterModule} from "@angular/router";
import {ServerService} from "./shared/server.service";

import {HomeModule} from "./home/home.module";

import {StomachService} from "./main/content/stomach/stomach.service";
import {MainService} from "./main/main.service";
import {DictionaryService} from "./shared/dictionary.service";
import {GameService} from "./shared/game.service";
import {OwnerService} from "./shared/owner.service";
import {AuthenticationModule} from "./authentication/authentication.module";
import {CanDeactivateGuard} from "./main/can-deactivate-guard.service";
import {AngularFireModule} from "angularfire2";
import {firebaseConfig} from "../environments/firebase.config";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {LocalStorageManager} from "./shared/localStorageManager.service";
import {HttpClientModule} from "@angular/common/http";
import {ServiceWorkerModule} from "@angular/service-worker";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    HomeModule,
    AuthenticationModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // environment.production ? ServiceWorkerModule.register('ngsw-worker.js') : [console.log('wRONGG')]
  ],

  providers: [AuthService,
    AuthGuard,
    OwnerService,
    PetService,
    ServerService,
    LocalStorageManager,
    MainService,
    StomachService,
    DictionaryService,
    GameService,
    CanDeactivateGuard],
  bootstrap: [AppComponent]
})



export class AppModule { }

