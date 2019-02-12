import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('List => Detail', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('0.4s ease-in-out', style({left: '-100%'}))
        ]),
        query(':enter', [
          animate('0.4s ease-in-out', style({left: '10%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('Detail => List', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('0.4s ease-in-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('0.4s ease-in-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);

