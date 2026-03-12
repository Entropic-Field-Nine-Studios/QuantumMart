import { computed, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/**
 * Helper class for displaying partial items in a list for a material paginator.
 */
export class Paginator<T> {
  /**
   * Items currently being displayed in this paginator.
   */
  readonly pagedItems = computed(() => this._pagedItems());

  /**
   * The paginator's current page number.
   */
  pageIndex = 0;

  /**
   * Amount of items to display per page.
   */
  pageSize = 5;

  private readonly _items = signal<T[]>([]);
  private readonly _pagedItems = signal<T[]>([]);

  constructor(initialPageSize = 5) {
    this.pageSize = initialPageSize;
  }

  /**
   * Sets the list of items this paginator should reference.
   */
  setItems(items: T[]) {
    this._items.set(items);
    this.update();
  }

  /**
   * Event handler for the paginator.
   */
  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.update();
  }

  /**
   * Total amount of items in the referenced list.
   */
  get length(): number {
    return this._items().length;
  }

  private update() {
    const _items = this._items();
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;

    this._pagedItems.set(_items.slice(start, end));
  }
}
