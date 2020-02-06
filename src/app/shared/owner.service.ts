/**
 * Created by imrte on 22/11/2017.
 */
import {Injectable} from "@angular/core";
import {Owner} from "./owner.model";
import {ServerService} from "./server.service";
import { AlertifyService } from "./alertify.service";
@Injectable()
export class OwnerService {
  private owner: Owner;
  constructor(private serverServ: ServerService,
              private alertify: AlertifyService) {}

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
  setName(newName: string) {
    this.owner.nickName = newName;
  }
  setAvatar(newAvatar: string) {
    this.owner.avatar = newAvatar;
    console.log(this.owner.avatar);
  }

  gainScoreWhenFeeding() {
    this.alertify.success("You gain 1 point");
    this.owner.score += 1;
    this.saveOwnerToDatabase().subscribe();
  }

  gainScoreWhenEvolving() {
    this.owner.score += 5;
  }
  gainScoreWhenTraining() {
    this.owner.score += 20;
  }
  gainScoreWhenBattling() {
    this.owner.score += 50;
  }

  saveOwnerToDatabase() {
    return this.serverServ.updateOwner(this.owner);
  }
  saveAndDestroyOwner()  {
    this.serverServ.updateOwner(this.owner).subscribe();
    this.owner = null;
  }
  finishReg() {
    this.owner.isRegComplete = true;
  }
  destroyOwner() {
    this.owner = null;
  }
}
