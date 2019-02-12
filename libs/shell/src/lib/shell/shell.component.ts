import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@fancydraw/core';
import { Draw, QueryDraws } from '@fancydraw/data-access';
import { Store } from '@ngrx/store';

@Component({
  selector: 'fancydraw-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @Input()
  title = "";

  constructor(public authService: AuthService, private drawStore: Store<Draw>) {

  }

  ngOnInit() {
    this.drawStore.dispatch(new QueryDraws());
  }

}
