import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { expect } from 'chai';
import { spy } from 'sinon';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const routerSpy = {
    navigate: spy(),
  };

  // Mock localStorage
  let store: Record<string, string> = {};
  const mockLocalStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });

  beforeEach(() => {
    store = {};

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    window.localStorage.clear();
    routerSpy.navigate.resetHistory();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should POST to /login with username and rawPassword', () => {
    const mockResponse = { token: 'abc123', username: 'matt' };

    service.login('matt', 'pw').subscribe((res) => {
      expect(res).to.deep.equal(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).to.equal('POST');
    expect(req.request.body).to.deep.equal({ username: 'matt', rawPassword: 'pw' });

    req.flush(mockResponse);
  });

  it('should remove token and navigate to /login', () => {
    mockLocalStorage.setItem('token', 'abc123');

    service.logout();

    expect(mockLocalStorage.getItem('token')).to.equal(null);
    expect(routerSpy.navigate.calledWith(['/login'])).to.equal(true);
  });

  it('should remove token but NOT navigate when navigateLogin=false', () => {
    mockLocalStorage.setItem('token', 'abc123');

    service.logout(false);

    expect(routerSpy.navigate.called).to.equal(false);
    expect(mockLocalStorage.getItem('token')).to.equal(null);
  });

  it('should return null username when no token exists', () => {
    expect(service.username).to.equal(null);
  });

  it('should decode username, uid, and role from token', () => {
    const payload = {
      sub: 'matt',
      uid: '123',
      role: 'ADMIN',
      exp: Math.floor(Date.now() / 1000) + 1000,
    };

    const fakeToken = 'header.' + btoa(JSON.stringify(payload)) + '.sig';
    mockLocalStorage.setItem('token', fakeToken);

    expect(service.username).to.equal('matt');
    expect(service.userId).to.equal('123');
    expect(service.userRole).to.equal('ADMIN');
  });

  it('should return false when token is missing', () => {
    expect(service.isLoggedIn).to.equal(false);
  });

  it('should return false when token is expired', () => {
    const expired = {
      exp: Math.floor(Date.now() / 1000) - 10,
    };

    const fakeToken = 'header.' + btoa(JSON.stringify(expired)) + '.sig';
    mockLocalStorage.setItem('token', fakeToken);

    expect(service.isLoggedIn).to.equal(false);
  });

  it('should return true when token is valid', () => {
    const valid = {
      exp: Math.floor(Date.now() / 1000) + 1000,
    };

    const fakeToken = 'header.' + btoa(JSON.stringify(valid)) + '.sig';
    mockLocalStorage.setItem('token', fakeToken);

    expect(service.isLoggedIn).to.equal(true);
  });
});
