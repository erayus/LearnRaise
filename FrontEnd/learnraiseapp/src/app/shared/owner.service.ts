/**
 * Created by imrte on 22/11/2017.
 */
import {Injectable} from "@angular/core";
import {Owner} from "./owner.model";
import {ServerService} from "./server.service";
@Injectable()
export class OwnerService {
  private owner: Owner;
  constructor(private serverServ: ServerService) {}

  createOwnerWithIdAndEmail(id: string, email: string) : Owner {
    // Create owner Object
    this.owner = new Owner(
      id,
      email,
      '', // Full name
      '', // Avatar
      0,
      false //isRegComplete
    );
    const ownerCopy = this.owner;
    return ownerCopy;
  }
  initOwner(owner: Owner) {
    this.owner = owner;
  }

  retrieveOwner() {
    return this.owner;
  }
  setName(newName: string){
    this.owner.nickName = newName;
    console.log(this.owner.nickName);
  }
  setAvatar(newAvatar: string){
    this.owner.avatar = newAvatar;
    console.log(this.owner.avatar);
  }

  gainScoreWhenFeeding(){
    this.owner.score += 1;
    this.saveOwnerToDatabase();
  }

  gainScoreWhenEvolving(){
    this.owner.score += 5;
  }
  gainScoreWhenTraining(){
    this.owner.score += 20;
  }
  gainScoreWhenBattling(){
    this.owner.score += 50;
  }

  saveOwnerToDatabase(){
    this.serverServ.updateOwner(this.owner).subscribe();
  }
  saveAndDestroyOwner(){
    this.serverServ.updateOwner(this.owner).subscribe();
    this.owner = null;
  }
  finishReg() {
    this.owner.isRegComplete = true;
  }
  destroyOwner(){
    this.owner = null;
  }
}
