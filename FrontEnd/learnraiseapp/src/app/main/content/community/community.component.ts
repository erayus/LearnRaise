import { Component, OnInit } from '@angular/core';
import {Owner} from "../../../shared/owner.model";
import {ServerService} from "../../../shared/server.service";
import {AuthService} from "../../../authentication/auth-service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {
  viewRankBoard = false;
  rankList = [];
  constructor(private authServ: AuthService,
              private serverServ: ServerService,
              private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.viewRankBoard = true;
    this.serverServ.getAllOwners().subscribe(
      (ownerList: Owner[]) => {
        this.rankList.push(...ownerList);
        this.rankList.sort(function(a, b) {
          return  b.score - a.score ;
        });
      }
    );
  }

}
