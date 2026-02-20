import { Component, inject } from '@angular/core';
import { SectionHeader } from '../../components/section-header/section-header';
import { CategoriesStore } from '../../store/categories-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  imports: [SectionHeader],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage {
  categoriesStore = inject(CategoriesStore);
  private router = inject(Router);

  handleCategoryClick(id: string): void {
    this.router.navigate(['category-view', id]);
  }

  handleAddClick(): void {
    this.router.navigate(['categories', 'new']);
  }
}
