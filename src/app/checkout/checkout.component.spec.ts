import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import Sinon from 'sinon';
import { AuthService } from '../auth/auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

class MockAuthService {
  userId = Sinon.stub().returns('stub');
}

describe('Checkout', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
  });

  it('should create', () => {
    httpMock.expectOne('http://localhost:8080/api/cart-items/user/stub').flush([]);

    httpMock.expectOne('http://localhost:8080/api/address/primary/stub').flush({});

    expect(component).toBeTruthy();
  });
});
