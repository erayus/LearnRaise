import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ServerService} from "../../shared/server.service";
import {AuthService} from "../../authentication/auth-service";
import {Owner} from "../../shared/owner.model";

@Component({
  selector: 'app-extra-nav',
  templateUrl: './extra-nav.component.html',
  styleUrls: ['./extra-nav.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExtraNavComponent implements OnInit {
  viewRankBoard = false;
  rankList = [];
  constructor(private authServ: AuthService,
              private serverServ: ServerService ) { }

  ngOnInit() {
  }

  onToFacebook(){
    window.open('https://www.facebook.com/unipet2017/?fref=ts&ref=br_tf');
  }
  onLogOut() {
   this.authServ.logOut();
  }
  onViewRankBoard(){
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
