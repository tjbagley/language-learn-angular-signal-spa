import { Component, computed, inject } from '@angular/core';
import { ListsStore } from '../../store/lists-store';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionHeader } from '../../components/section-header/section-header';
import { WordOrPhrase } from '../../models/word-or-phrase';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { WordPhraseListView } from '../../components/word-phrase-list-view/word-phrase-list-view';

@Component({
  selector: 'app-list-view-page',
  imports: [SectionHeader, WordPhraseListView],
  templateUrl: './list-view-page.html',
  styleUrl: './list-view-page.scss',
})
export class ListViewPage {
  listsStore = inject(ListsStore);
  private wordsAndPhrasesStore = inject(WordsAndPhrasesStore);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private readonly id = this.route.snapshot.paramMap.get('id');

  list = this.listsStore.listById(this.id ?? '');

  handleEditClick(): void {
    this.router.navigate(['lists', this.id]);
  }

  getWordOrPhraseDisplay(wordOrPhraseId: string): WordOrPhrase {
    const words = this.wordsAndPhrasesStore.values();
    return (
      words.find(wp => wp.id === wordOrPhraseId) || {
        id: "",
        value: "",
        soundsLike: "",
        meaning: "",
        categories: [],
      }
    );
  };

  handleWordClick(id: string): void {
    this.router.navigate(['/words', id]);
  }
}
