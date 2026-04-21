import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewComponent } from './review.component';
import { provideRouter } from '@angular/router';
import { Review } from '../review.model';

describe('ReviewComponent', () => {
  let component: ReviewComponent;
  let fixture: ComponentFixture<ReviewComponent>;

  const review: Review = {
    id: '123',
    userId: '321',
    username: 'user',
    body: 'review text',
    score: 4,
    isEdited: false,
    createdAt: '2026-01-01 00:00:00.000000',
    updatedAt: '2026-01-01 00:00:00.000000',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewComponent);
    component = fixture.componentInstance;

    component.review = review;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
