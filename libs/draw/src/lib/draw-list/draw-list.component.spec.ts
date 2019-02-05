import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatGridListModule, MatIconModule, MatInputModule } from '@angular/material';
import { AddDraw, DeleteDraw, Draw, UpdateDraw } from '@fancydraw/data-access';
import { Store, StoreModule } from '@ngrx/store';

import { DrawListComponent } from './draw-list.component';
import * as fromDraw from '@fancydraw/data-access'

describe('DrawListComponent', () => {
  let component: DrawListComponent;
  let fixture: ComponentFixture<DrawListComponent>;
  let store: Store<Draw>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatGridListModule,
        MatInputModule,
        MatCardModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("draw", fromDraw.reducer)
      ],
      declarations: [DrawListComponent],
    })
      .compileComponents();

    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('nameChange should dispatch UpdateDraw', () => {
    const id = "xxx";
    const name = "Nytt navn";
    const expectedAction = new UpdateDraw({draw: {id, changes: {name}}});

    component.nameChange(id, name);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);

  });

  it('addDraw should dispatch AddDraw', () => {
    const name = "Ny trekning";
    const expectedAction = new AddDraw({draw: {name, created: new Date() }});

    component.addDraw();

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('deleteDraw should dispatch DeleteDraw', () => {
    const id = "xxx";
    const expectedAction = new DeleteDraw({id});

    component.deleteDraw(id);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
