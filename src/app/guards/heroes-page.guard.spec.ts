import { TestBed } from '@angular/core/testing';

import { HeroesPageGuard } from './heroes-page.guard';

describe('HeroesPageGuard', () => {
  let guard: HeroesPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HeroesPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
