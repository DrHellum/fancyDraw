import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';

import { UserListComponent } from './user-list.component';
import { UserListService } from './user-list.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  const mockService = {
    user$: of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserListService, useValue: mockService}
      ],
      declarations: [UserListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
