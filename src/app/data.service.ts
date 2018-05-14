import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  constructor() { }

  private goals = new BehaviorSubject<any>(['My home', 'My son', 'And my tree']);
  goal = this.goals.asObservable();

  changeGoal(goal) {
    this.goals.next(goal);
  }
}
