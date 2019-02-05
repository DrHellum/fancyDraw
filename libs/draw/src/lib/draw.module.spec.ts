import { async, TestBed } from '@angular/core/testing';
import { DrawModule } from './draw.module';

describe('DrawModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DrawModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DrawModule).toBeDefined();
  });
});
