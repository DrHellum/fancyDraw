import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from '@fancydraw/core';
import { SharedModule } from '@fancydraw/shared';
import { StoreModule } from '@ngrx/store';
import { ShellComponent } from './shell.component';
import * as fromDraw from '@fancydraw/data-access'

describe('ShellComponent', () => {
  let component: ShellComponent;
  let fixture: ComponentFixture<ShellComponent>;
  const mockFireAuth = {
    login() {
    },
    logout() {
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("draw", fromDraw.reducer)
      ],
      declarations: [ShellComponent],
      providers: [
        {provide: AngularFireAuth, useValue: mockFireAuth}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
