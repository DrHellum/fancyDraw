import { async, TestBed } from '@angular/core/testing';
import { ShellModule } from './shell.module';

describe('ShellModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShellModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ShellModule).toBeDefined();
  });
});
