import { Component, computed, inject } from '@angular/core';
import { ListsStore } from '../../store/lists-store';
import { ActivatedRoute, Router } from '@angular/router';
import { SectionHeader } from '../../components/section-header/section-header';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { WordPhraseListView } from '../../components/word-phrase-list-view/word-phrase-list-view';
import { WordListItem, WordListItemWithWordOrPhrase } from '../../models/word-list';

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
  wordsOrPhrases = computed<WordListItemWithWordOrPhrase[]>(() =>
    this.list?.items.map(i => this.getWordOrPhraseDisplay(i)) ?? []
  );

  handleEditClick(): void {
    this.router.navigate(['lists', this.id]);
  }

  handleWordClick(id: string): void {
    this.wordsAndPhrasesStore.setWordEditReturnRoute('/list-view', this.id ?? '');
    this.router.navigate(['/words', id]);
  }

  private getWordOrPhraseDisplay(wordListItem: WordListItem): WordListItemWithWordOrPhrase {
    const words = this.wordsAndPhrasesStore.values();
    return {
      actor: wordListItem.actor,
      wordOrPhraseId: wordListItem.wordOrPhraseId,
      wordOrPhrase: words.find(wp => wp.id === wordListItem.wordOrPhraseId) || {
        id: "",
        value: "",
        soundsLike: "",
        meaning: "",
        categories: [],
      }
    };
  }
}
