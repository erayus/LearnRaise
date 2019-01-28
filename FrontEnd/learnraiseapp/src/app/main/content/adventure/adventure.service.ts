import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AdventureService {
  onGameStarted = new Subject();
  onGameCompleted = new Subject();
  constructor() { }
}
