import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/categories/category.model';
import { CategoryService } from 'src/app/categories/category.service';
import { MessageService } from 'src/app/shared/message/message.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TitleDirective } from 'src/app/shared/directives/title.directive';
import { MatAnchor } from '@angular/material/button';
import { CategorySlugDirective } from 'src/app/shared/directives/category-slug.directive';
import { MatCheckbox } from '@angular/material/checkbox';
import { AdminCategoryDisplayComponent } from './admin-category-display/admin-category-display.component';

@Component({
  selector: 'app-category-management',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    TitleDirective,
    MatAnchor,
    MatHint,
    CategorySlugDirective,
    MatCheckbox,
    AdminCategoryDisplayComponent,
  ],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.scss',
})
export class CategoryManagementComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly messageService = inject(MessageService);

  readonly createCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    generateSlug: new FormControl(true),
    slug: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  private readonly _categories = signal<Category[]>([]);

  ngOnInit(): void {
    this.loadCategories();

    // Disable/enable the slug form input based on the generate slug checkbox
    this.createCategoryForm.get('generateSlug')!.valueChanges.subscribe((checked) => {
      const slug = this.createCategoryForm.get('slug')!;

      if (checked) {
        slug.disable();

        const name = this.createCategoryForm.get('name')!.value!;

        slug.patchValue(this.toSlug(name));
      } else {
        slug.enable();
      }
    });

    // Automatically generate slug on name input if the generate checkbox is checked
    this.createCategoryForm.get('name')!.valueChanges.subscribe((value) => {
      const shouldGenerate = this.createCategoryForm.get('generateSlug')!.value!;

      if (value && shouldGenerate) {
        this.createCategoryForm.patchValue({ slug: this.toSlug(value) });
      } else if (value === null || value === '') {
        this.createCategoryForm.patchValue({ slug: '' });
      }
    });
  }

  get categories(): Category[] {
    return this._categories();
  }

  /**
   * Converts a string to a valid slug.
   *
   * @param str String to convert
   * @returns
   */
  private toSlug(str: string): string {
    return str
      .toLowerCase()
      .replaceAll(' ', '-')
      .replaceAll(/[^a-z0-9-]+/g, '');
  }

  private loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => this._categories.set(categories),
      error: () => this.messageService.error('Could not load categories.'),
    });
  }
}
