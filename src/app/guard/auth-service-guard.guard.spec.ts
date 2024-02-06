import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authServiceGuardGuard } from './auth-service-guard.guard';

describe('authServiceGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authServiceGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
