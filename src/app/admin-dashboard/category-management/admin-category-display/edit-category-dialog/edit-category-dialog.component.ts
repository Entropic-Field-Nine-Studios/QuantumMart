import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/categories/category.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TitleDirective } from 'src/app/shared/directives/title.directive';
import { CategorySlugDirective } from 'src/app/shared/directives/category-slug.directive';
import { MatAnchor } from '@angular/material/button';
import { Category } from 'src/app/categories/category.model';
import { AuthService } from 'src/app/auth/auth.service';
import { PatchCategoryRequest } from 'src/app/categories/patch-category-request.model';
import { MessageService } from 'src/app/shared/message/message.service';

@Component({
  selector: 'app-edit-category-dialog',
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    TitleDirective,
    CategorySlugDirective,
    MatAnchor,
  ],
  templateUrl: './edit-category-dialog.component.html',
  styleUrl: './edit-category-dialog.component.scss',
})
export class EditCategoryDialogComponent {
  private readonly categoryService = inject(CategoryService);
  private readonly dialogRef = inject(MatDialogRef<EditCategoryDialogComponent>);
  private readonly existingCategory = inject(MAT_DIALOG_DATA) as Category;
  private readonly messageService = inject(MessageService);
  private readonly auth = inject(AuthService);

  readonly categoryTitle = signal<string>('');

  readonly editCategoryForm = new FormGroup({
    name: new FormControl('', Validators.required),
    slug: new FormControl('', Validators.required),
  });

  constructor() {
    this.categoryTitle.set(this.existingCategory.name);

    this.editCategoryForm.patchValue({
      name: this.existingCategory.name,
      slug: this.existingCategory.slug,
    });
  }

  closeDialog() {
    this.editCategoryForm.reset();
    this.dialogRef.close();
  }

  formValid(): boolean {
    const formName = this.editCategoryForm.get('name')!.value!;
    const formSlug = this.editCategoryForm.get('slug')!.value!;

    const valuesAreDifferent =
      formName !== this.existingCategory.name && formSlug !== this.existingCategory.slug;

    return valuesAreDifferent && this.auth.isLoggedIn && this.editCategoryForm.valid;
  }

  submitForm() {
    if (this.formValid()) {
      const editReq: PatchCategoryRequest = {
        name: this.editCategoryForm.get('name')!.value!,
        slug: this.editCategoryForm.get('slug')!.value!,
      };

      this.categoryService.updateCategory(this.existingCategory.id, editReq).subscribe({
        next: () => {
          this.dialogRef.close();
          this.messageService.info('Category updated.');
        },
        error: () => this.messageService.error('Could not update category.'),
      });
    }
  }
}
