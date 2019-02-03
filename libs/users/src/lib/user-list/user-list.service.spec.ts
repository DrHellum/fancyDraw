import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs/internal/observable/of';
import { UserListService } from './user-list.service';

describe('UserListService', () => {
  const mockFireStore = {
    collection() {
      return {
        valueChanges()
        {
          return of([]);
        }
      };
    }
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: AngularFirestore, useValue: mockFireStore}
    ]
  }));

  it('should be created', () => {
    const service: UserListService = TestBed.get(UserListService);
    expect(service).toBeTruthy();
  });
});
