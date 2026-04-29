import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryDisplayComponent } from './admin-category-display.component';

describe('AdminCategoryDisplayComponent', () => {
  let component: AdminCategoryDisplayComponent;
  let fixture: ComponentFixture<AdminCategoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCategoryDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCategoryDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
