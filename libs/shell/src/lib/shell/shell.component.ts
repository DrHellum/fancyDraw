import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fancydraw-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  @Input()
  title = "";

  constructor() {
  }

  ngOnInit() {
  }

}
