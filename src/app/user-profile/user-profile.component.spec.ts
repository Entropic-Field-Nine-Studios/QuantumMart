import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileComponent } from './user-profile.component';
import { provideRouter } from '@angular/router';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
