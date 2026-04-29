import { Component, computed, inject, Input, OnChanges, signal } from '@angular/core';
import { Category } from 'src/app/categories/category.model';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { CategoryService } from 'src/app/categories/category.service';
import { PatchCategoryRequest } from 'src/app/categories/patch-category-request.model';
import { MessageService } from 'src/app/shared/message/message.service';

@Component({
  selector: 'app-admin-category-display',
  imports: [DragDropModule],
  templateUrl: './admin-category-display.component.html',
  styleUrl: './admin-category-display.component.scss',
})
export class AdminCategoryDisplayComponent implements OnChanges {
  private readonly categoryService = inject(CategoryService);
  private readonly messageService = inject(MessageService);

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

  get inactiveCategories(): Category[] {
    return this._inactiveCategories();
  }

  get activeCategories(): Category[] {
    return this._activeCategories();
  }
}
