import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { UserStore } from '../core/stores/user.store';
import Sinon from 'sinon';

class MockUserStore {
  user = Sinon.stub().returns({
    username: '123',
    avatarUrl: 'test.png',
  });
}

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
      providers: [{ provide: UserStore, useClass: MockUserStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // safe now
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
