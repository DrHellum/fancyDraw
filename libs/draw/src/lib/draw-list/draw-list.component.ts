import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import * as fromDraw from '@fancydraw/data-access';
import { AddDraw, DeleteDraw, Draw, UpdateDraw } from '@fancydraw/data-access';
import { Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'fancydraw-draw-list',
  templateUrl: './draw-list.component.html',
  styleUrls: ['./draw-list.component.scss'],
  animations: [
    // nice stagger effect when showing existing elements
    trigger('list', [
      transition(':enter', [
        // // child animation selector + stagger
        query('@item',
          stagger(300, animateChild())
        )
      ]),
    ]),
    trigger('items', [
      // cubic-bezier for a tiny bouncing feel
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('0.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(1)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('0.5s cubic-bezier(.8,-0.6,0.2,1.5)',
          style({transform: 'scale(0.5)', opacity: 0, height: '0px', margin: '0px'}))
      ])
    ])
  ]
})
export class DrawListComponent implements OnInit, AfterContentInit, OnDestroy {
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 2,
    xs: 1
  };

  gridCols = 1;

  draws$: Observable<Draw[]>;
  animationDisabled = false;

  constructor(private store: Store<Draw>, private mediaObserver: MediaObserver) {
  }

  ngAfterContentInit() {
    this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.gridCols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngOnInit() {
    this.draws$ = this.store.select<Draw[]>(fromDraw.selectAll)
      .pipe(
        untilDestroyed(this),
        map((draw) => {
          setTimeout(() => {
            this.animationDisabled = false
          }, 100);
          return draw;
        }));
  }

  nameChange(id: string, name: string) {
    this.animationDisabled = true;
    this.store.dispatch(new UpdateDraw({draw: {id: id, changes: {name: name}}}));
  }

  addDraw() {
    this.store.dispatch(new AddDraw({draw: {name: "Ny trekning", created: new Date()}}));
  }

  deleteDraw(id: string) {
    if (id) {
      this.store.dispatch(new DeleteDraw({id}));
    }
  }

  ngOnDestroy(): void {
  }
}
