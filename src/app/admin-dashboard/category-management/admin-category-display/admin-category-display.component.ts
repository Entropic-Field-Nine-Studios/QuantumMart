import { Component, computed, inject, Input, OnChanges, signal } from '@angular/core';
import { Category } from 'src/app/categories/category.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CategoryService } from 'src/app/categories/category.service';
import { PatchCategoryRequest } from 'src/app/categories/patch-category-request.model';
import { MessageService } from 'src/app/shared/message/message.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from './edit-category-dialog/edit-category-dialog.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-category-display',
  imports: [DragDropModule, MatButtonModule, MatIcon, MatTooltip],
  templateUrl: './admin-category-display.component.html',
  styleUrl: './admin-category-display.component.scss',
})
export class AdminCategoryDisplayComponent implements OnChanges {
  private readonly categoryService = inject(CategoryService);
  private readonly messageService = inject(MessageService);
  private readonly dialog = inject(MatDialog);

  @Input({ required: true }) categories!: Category[];

  private readonly _categories = signal<Category[]>([]);

  private readonly _inactiveCategories = computed(() =>
    this._categories().filter((item) => !item.isActive),
  );
  private readonly _activeCategories = computed(() =>
    this._categories().filter((item) => item.isActive),
  );

  ngOnChanges(): void {
    this._categories.set(this.categories);
  }

  onDrop(event: CdkDragDrop<Category[]>) {
    const sameContainer = event.previousContainer === event.container;
    const sameIndex = event.previousIndex === event.currentIndex;

    if (sameContainer && sameIndex) {
      return;
    }

    if (sameContainer) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      // TODO allow endpoint call to change category order
      return;
    }

    const movedItem = event.previousContainer.data[event.previousIndex];
    const isNowActive = event.container.id === 'activeList';

    // Update the category in the source signal
    this._categories.update((list) =>
      list.map((cat) => (cat.id === movedItem.id ? { ...cat, isActive: isNowActive } : cat)),
    );

    // Update backend
    const updateReq: PatchCategoryRequest = {
      isActive: isNowActive,
    };

    this.categoryService.updateCategory(movedItem.id, updateReq).subscribe({
      next: () => this.messageService.success('Category updated.'),
      error: () => {
        this._categories.update((list) =>
          list.map((cat) => (cat.id === movedItem.id ? { ...cat, isActive: !isNowActive } : cat)),
        );
      },
    });
  }

  openEditDialog(category: Category) {
    this.dialog.open(EditCategoryDialogComponent, {
      data: category,
      width: '480px',
      height: '320px',
    });
  }

  get inactiveCategories(): Category[] {
    return this._inactiveCategories();
  }

  get activeCategories(): Category[] {
    return this._activeCategories();
  }
}
