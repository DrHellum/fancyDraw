import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@fancydraw/core';
import { Draw, QueryDraws } from '@fancydraw/data-access';
import { Store } from '@ngrx/store';
import { slideInAnimation } from '../animations/router.animation';

@Component({
  selector: 'fancydraw-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class ShellComponent implements OnInit {
  @Input()
  title = "";

  constructor(public authService: AuthService, private drawStore: Store<Draw>) {

  }

  ngOnInit() {
    this.drawStore.dispatch(new QueryDraws());
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
