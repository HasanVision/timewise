
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access if the user is logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(true);

    expect(authGuard.canActivate()).toBe(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and redirect to login if the user is not logged in', () => {
    (authService.isLoggedIn as jasmine.Spy).and.returnValue(false);

    expect(authGuard.canActivate()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});