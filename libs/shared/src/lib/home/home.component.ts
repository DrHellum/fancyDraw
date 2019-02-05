import { Component, OnInit } from '@angular/core';
import { AddDraw, Draw, LoadDraws, selectAll, DrawState } from '@fancydraw/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'fancydraw-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  draws$: Observable<Draw[]>;

  constructor(private store: Store<DrawState>) {
  }

  ngOnInit() {
    this.draws$ = this.store.select(selectAll);
    this.store.dispatch(new LoadDraws());

  }

  addDraw() {
    this.store.dispatch(new AddDraw({draw: {name: "Min første draw", groups: [{name: "Gruppe1"}, {name: "Gruppe2"}]}}))
  }
}
