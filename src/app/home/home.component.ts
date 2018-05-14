import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
        transition('* => *', [
          query(':enter', style({opacity: 0}), {optional: true}),

          query(':enter', stagger('300ms', [
            animate('.3s ease-in', keyframes([
              style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 1, transform: 'translateY(0)', offset: 1})
            ]))
          ]), {optional: true}),

          query(':leave', stagger('300ms', [
            animate('.5s ease-in', keyframes([
              style({opacity: 1, transform: 'translateX(0)', offset: 0}),
              style({opacity: .5, transform: 'translateX(15px)', offset: .3}),
              style({opacity: 0, transform: 'translateX(75%)', offset: 1})
            ]))
          ]), {optional: true})
        ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private _data: DataService
  ) { }

  itemCount: number;
  btnText = 'Add an item';
  goalText = 'My first life goal';
  goals = [];

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

  removeItem(index) {
    this.goals.splice(index, 1);
    this._data.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }

}
