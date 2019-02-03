import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserListService } from './user-list.service';

@Component({
  selector: 'fancydraw-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<any>;


  constructor(private userListService: UserListService) {
    this.users$ = this.userListService.users$;

  }

  ngOnInit() {
  }

}
