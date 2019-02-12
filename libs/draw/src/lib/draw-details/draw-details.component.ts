import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Contestant, Draw, getSelectedDraw, Group, SetSelectedDraw, UpdateDraw } from '@fancydraw/data-access';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'fancydraw-draw-details',
  templateUrl: './draw-details.component.html',
  styleUrls: ['./draw-details.component.scss']
})
export class DrawDetailsComponent implements OnInit {
  draw$: Observable<Draw>;

  @ViewChild('groupList')
  groupList: ElementRef;

  @ViewChild('contestantList')
  contestantList: ElementRef<HTMLDivElement>;

  constructor(private route: ActivatedRoute, private store: Store<Draw>) {
  }


  ngOnInit() {
    this.draw$ = this.store.select(getSelectedDraw);

    this.route.paramMap
      .subscribe((map: ParamMap) => {
        this.store.dispatch(new SetSelectedDraw(map.get("drawId")));
      });


  }

  addGroup(draw) {
    const newGroups = (draw.groups || []).concat([{name: ""}]);

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          groups: newGroups
        }
      }
    }))


  }

  addContestant(draw) {
    const newContestants = (draw.contestants || []).concat([{name: ""}]);

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          contestants: newContestants
        }
      }
    }));
  }

  groupNameChange(draw: Draw, group: Group, value: any) {
    group.name = value;

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          groups: draw.groups
        }
      }
    }));

  }

  deleteGroup(draw: Draw, group: Group) {
    const newGroups = draw.groups.slice();
    newGroups.splice(newGroups.indexOf(group), 1);

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          groups: newGroups
        }
      }
    }));
  }

  contestantNameChange(draw: Draw, contestant: Contestant, value: any) {
    contestant.name = value;

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          contestants: draw.contestants
        }
      }
    }));
  }

  deleteContestant(draw: Draw, contestant: Contestant) {
    const newContestants = draw.contestants.slice();
    newContestants.splice(newContestants.indexOf(contestant), 1);

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          contestants: newContestants
        }
      }
    }));
  }
}
