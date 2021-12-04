import { TestBed } from '@angular/core/testing';

import { AuthorlistService } from './authorlist.service';

describe('AuthorlistService', () => {
  let service: AuthorlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
