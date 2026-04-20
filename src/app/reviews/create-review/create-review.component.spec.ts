import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewComponent } from './create-review.component';

describe('CreateReviewComponent', () => {
  let component: CreateReviewComponent;
  let fixture: ComponentFixture<CreateReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
