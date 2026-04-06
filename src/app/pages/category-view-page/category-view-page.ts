import { Component, inject } from '@angular/core';
import { SectionHeader } from '../../components/section-header/section-header';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { CategoriesStore } from '../../store/categories-store';
import { ActivatedRoute, Router } from '@angular/router';
import { WordPhraseListView } from '../../components/word-phrase-list-view/word-phrase-list-view';

@Component({
  selector: 'app-category-view-page',
  imports: [SectionHeader, WordPhraseListView],
  templateUrl: './category-view-page.html',
  styleUrl: './category-view-page.scss',
})
export class CategoryViewPage {
  wordsAndPhrasesStore = inject(WordsAndPhrasesStore);
  categoriesStore = inject(CategoriesStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private readonly id = this.route.snapshot.paramMap.get('id');

  category = this.categoriesStore.categoryById(this.id ?? '');
  wordsAndPhrases = this.wordsAndPhrasesStore.searchByCategoryId(this.id ?? '');

  handleWordOrPhraseClick(id: string): void {
    this.wordsAndPhrasesStore.setWordEditReturnRoute('/category-view', this.id ?? '');
    this.router.navigate(['words', id]);
  }

  handleEditClick(): void {
    this.router.navigate(['categories', this.id]);
  }
}
