import { Component, inject } from '@angular/core';
import { SectionHeader } from '../../components/section-header/section-header';
import { ListsStore } from '../../store/lists-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lists-page',
  imports: [SectionHeader],
  templateUrl: './lists-page.html',
  styleUrl: './lists-page.scss',
})
export class ListsPage {
  listsStore = inject(ListsStore);
  private router = inject(Router);

  handleAddClick(): void {
    this.router.navigate(['lists', 'new']);
  }

  handleListClick(id: string): void {
    this.router.navigate(['list-view', id]);
  }
}
