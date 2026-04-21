import { TestBed } from '@angular/core/testing';
import { UserStore } from './user.store';
import { UserService } from '../../users/user.service';
import { AuthService } from '../../auth/auth.service';
import { of, throwError } from 'rxjs';
import { User } from '../../users/user.model';
import sinon, { SinonStubbedInstance } from 'sinon';

describe('UserStore (Angular test runner + Sinon)', () => {
  let store: UserStore;
  let userService: SinonStubbedInstance<UserService>;
  let authService: SinonStubbedInstance<AuthService>;

  const mockUser: User = {
    id: '123',
    username: 'test',
    email: 'test@example.com',
    role: 'user',
    createdAt: '2026-01-01 00:00:0000',
    balance: 1000.0,
  };

  beforeEach(() => {
    userService = sinon.createStubInstance(UserService);
    authService = sinon.createStubInstance(AuthService);

    TestBed.configureTestingModule({
      providers: [
        UserStore,
        { provide: UserService, useValue: userService },
        { provide: AuthService, useValue: authService },
      ],
    });

    store = TestBed.inject(UserStore);
  });

  it('clears and logs out when token is invalid', () => {
    authService.isTokenValid.returns(false);
    sinon.stub(authService, 'rawToken').get(() => 'valid-token');

    store.init();

    expect(store.user()).toBeNull();
    expect(authService.logout.calledWith(true)).toBe(true);
  });

  it('loads user when token is valid', () => {
    authService.isTokenValid.returns(true);
    sinon.stub(authService, 'rawToken').get(() => 'valid-token');
    userService.getCurrentUser.returns(of(mockUser));

    store.init();

    expect(userService.getCurrentUser.calledOnce).toBe(true);
    expect(store.user()).toEqual(mockUser);
  });

  it('clears user when getCurrentUser errors', () => {
    authService.isTokenValid.returns(true);
    userService.getCurrentUser.returns(throwError(() => new Error('fail')));

    store.init();

    expect(store.user()).toBeNull();
    expect(authService.logout.calledWith(false)).toBe(true);
  });

  it('clear() resets user and calls logout(false)', () => {
    // simulate user loaded
    userService.getCurrentUser.returns(of(mockUser));
    authService.isTokenValid.returns(true);
    store.init();

    store.clear();

    expect(store.user()).toBeNull();
    expect(authService.logout.calledWith(false)).toBe(true);
  });

  it('clear({ navigateLogin: true }) calls logout(true)', () => {
    store.clear({ navigateLogin: true });

    expect(authService.logout.calledWith(true)).toBe(true);
  });
});
