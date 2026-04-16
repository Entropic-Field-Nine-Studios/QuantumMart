import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { AuthService } from '../auth/auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MockAuthService } from 'src/testing/mock-auth.service';

describe('Checkout', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        {
          provide: AuthService,
          useFactory: () => {
            return new MockAuthService('stub');
          },
        },
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
    httpMock.expectOne('http://localhost:8080/api/address/primary/stub').flush({});

    expect(component).toBeTruthy();
  });
});
