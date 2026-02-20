import { Component, computed, input, signal, effect, inject, output } from '@angular/core';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { WordPhraseListView } from '../word-phrase-list-view/word-phrase-list-view';
import { Router } from '@angular/router';
import { WordOrPhrase } from '../../models/word-or-phrase';

@Component({
  selector: 'app-search',
  imports: [WordPhraseListView],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  private router = inject(Router);
  wordsAndPhrasesStore = inject(WordsAndPhrasesStore);

  embedded = input<boolean>(false);
  embeddedAddClickEvent = output<WordOrPhrase>();
  searchValue = signal<string>(this.wordsAndPhrasesStore.searchQuery());
  placeholder = computed(() => this.embedded() ? "Search for word or phrase to add to list" : "Search for word or phrase");
  private debounceTimeout: any;

  constructor() {
    effect(() => {
      const value = this.searchValue();
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.wordsAndPhrasesStore.search(value);
      }, 400);
    });
  }

  clearSearchInput(): void {
    this.searchValue.set('');
    this.wordsAndPhrasesStore.search('');
  }

  handleAddClick(): void {
    this.router.navigate(['/words', 'new']);
  }

  handleWordClick(id: string): void {
    if (!this.embedded()) {
      this.router.navigate(['/words', id]);
    }
  }

  handleEmbeddedAddClick(wordOrPhrase: WordOrPhrase): void {
    this.embeddedAddClickEvent.emit(wordOrPhrase);
  }
}
