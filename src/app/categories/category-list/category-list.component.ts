import { Component, Input } from '@angular/core';
import { Category } from '../category.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
})
export class CategoryListComponent {
  @Input({ required: true }) categories!: Category[];
}
