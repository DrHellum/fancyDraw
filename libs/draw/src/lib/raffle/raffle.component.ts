import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  Draw,
  getSelectedDraw,
  Raffle,
  SetDrawnOnContestants,
  SetSelectedDraw,
  UpdateDraw
} from '@fancydraw/data-access';
import { Store } from '@ngrx/store';
import { interval, Observable } from 'rxjs';
import { filter, map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'fancydraw-raffle',
  templateUrl: './raffle.component.html',
  styleUrls: ['./raffle.component.scss'],
  host: {
    '[style.flex]': "1"
  },
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
export class RaffleComponent implements OnInit {
  draw$: Observable<Draw>;
  raffle$: Observable<Raffle>;
  isDrawing: boolean;

  constructor(private route: ActivatedRoute, private store: Store<Draw>) {
  }

  private static getDrawResult(drawNumber: number, remainingContestants: number) {
    const result: number[] = [];
    let draw: number;

    for (draw = 0; draw < drawNumber; draw++) {
      let randomNumber: number;
      do {
        randomNumber = Math.floor(Math.random() * Math.floor(remainingContestants));
      } while (result.includes(randomNumber));

      result.push(randomNumber);
    }

    return result;
  }

  ngOnInit() {
    this.draw$ = this.store.select(getSelectedDraw);
    this.raffle$ = this.store.select(getSelectedDraw).pipe(map(draw => {
      if (draw.raffles || draw.raffles.length > 0) {
        return draw.raffles[draw.raffles.length - 1];
      }

      return null;
    }));


    this.route.paramMap
      .subscribe((map: ParamMap) => {
        this.store.dispatch(new SetSelectedDraw(map.get("drawId")));
      });

  }

  createRaffle(draw: Draw) {
    const newRaffles = draw.raffles.concat([{
      groups: draw.groups.map(g => ({...g, members: []})),
      contestantPool: draw.contestants.map(c => ({...c, drawColor: ""}))
    }]);

    this.store.dispatch(new UpdateDraw({
      draw: {
        id: draw.id,
        changes: {
          raffles: newRaffles
        }
      }
    }));
  }

  doRaffle(draw: Draw, raffle: Raffle) {
    const groupCount = raffle.groups.length;
    const remainingContestants = raffle.contestantPool.length;
    const drawNumber = remainingContestants > groupCount ? groupCount : remainingContestants;
    let newRaffle: Raffle = {...raffle};
    let index: number;
    let drawResultArray: number[][] = [];
    let raffleCount = remainingContestants === 1 ? 1 : 20;

    for (index = 0; index < raffleCount; index++) {
      drawResultArray.push(RaffleComponent.getDrawResult(drawNumber, remainingContestants));
    }

    this.isDrawing = true;

    interval(100).pipe(
      takeWhile(intervalCount => intervalCount < drawResultArray.length),
      map(intervalCount => {
        this.store.dispatch(new SetDrawnOnContestants(draw.id, drawResultArray[intervalCount]));
        return intervalCount;
      })
    ).pipe(
      filter(intervalCount => intervalCount === drawResultArray.length - 1)
    ).subscribe(() => {
      const drawResult = drawResultArray[drawResultArray.length - 1];
      for (index = 0; index < drawResult.length; index++) {
        newRaffle.groups[index].members.push(raffle.contestantPool[drawResult[index]]);
      }

      drawResult.sort((a, b) => b - a);
      for (index = 0; index < drawResult.length; index++) {
        newRaffle.contestantPool.splice(drawResult[index], 1);
      }

      const newRaffles = [...draw.raffles];
      newRaffles.pop();
      newRaffles.push(newRaffle);

      this.store.dispatch(new UpdateDraw({
        draw: {
          id: draw.id,
          changes: {
            raffles: newRaffles
          }
        }
      }));

      this.isDrawing = false;
    })
  }
}
