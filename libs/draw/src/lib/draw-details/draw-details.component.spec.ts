import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Draw, UpdateDraw } from '@fancydraw/data-access';
import { Store, StoreModule } from '@ngrx/store';

import { DrawDetailsComponent } from './draw-details.component';
import Spy = jasmine.Spy;

describe('DrawDetailsComponent', () => {
  let component: DrawDetailsComponent;
  let fixture: ComponentFixture<DrawDetailsComponent>;
  let dispatchSpy: Spy;
  const draw: Draw = {
    name: "TestDraw",
    created: new Date(),
    groups: [
      {name: "Group1"}
    ],
    contestants: [
      {id: "xxx", name: "Contestant1"}
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        StoreModule.forRoot({})
      ],
      declarations: [ DrawDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dispatchSpy = spyOn(TestBed.get(Store), 'dispatch');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addGroup', () => {
    it('should dispatch UpdateDraw with new group', () => {
      component.addGroup(draw);

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.groups.length).toBe(2);
    });
  });

  describe('groupNameChange', () => {
    it('should dispatch UpdateDraw with new group name', () => {
      component.groupNameChange(draw, draw.groups[0], "New name");

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.groups[0].name).toBe("New name");
    });
  });

  describe('deleteGroup', () => {
    it('should dispatch UpdateDraw with deleted group', () => {
      component.deleteGroup(draw, draw.groups[0]);

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.groups.length).toBe(0);
    });
  });

  describe('addContestant', () => {
    it('should dispatch UpdateDraw with new contestant', () => {
      component.addContestant(draw);

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.contestants.length).toBe(2);
    });
  });

  describe('contestantNameChange', () => {
    it('should dispatch UpdateDraw with new contestant name', () => {
      component.contestantNameChange(draw, draw.contestants[0], "New name");

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.contestants[0].name).toBe("New name");
    });
  });

  describe('deleteContestant', () => {
    it('should dispatch UpdateDraw with deleted contestant', () => {
      component.deleteContestant(draw, draw.contestants[0]);

      const action = dispatchSpy.calls.first().args[0] as UpdateDraw;

      expect(action.payload.draw.changes.contestants.length).toBe(0);
    });
  });


});
