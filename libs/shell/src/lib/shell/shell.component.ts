import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@fancydraw/core';

@Component({
  selector: 'fancydraw-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @Input()
  title = "";

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
  }

}
