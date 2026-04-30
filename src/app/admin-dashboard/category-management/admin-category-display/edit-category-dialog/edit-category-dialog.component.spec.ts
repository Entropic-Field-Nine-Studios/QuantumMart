import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryDialogComponent } from './edit-category-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/categories/category.model';

describe('EditCategoryDialogComponent', () => {
  let component: EditCategoryDialogComponent;
  let fixture: ComponentFixture<EditCategoryDialogComponent>;

  const sampleCategory: Category = {
    id: '123',
    name: 'sample',
    slug: 'sample',
    isActive: true,
    createdAt: '00000000000',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: sampleCategory,
        },
        {
          provide: MatDialogRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditCategoryDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
