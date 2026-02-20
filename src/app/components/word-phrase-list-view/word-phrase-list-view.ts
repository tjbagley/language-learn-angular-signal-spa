import { Component, computed, input, output } from '@angular/core';
import { WordOrPhrase } from '../../models/word-or-phrase';

@Component({
  selector: 'app-word-phrase-list-view',
  imports: [],
  templateUrl: './word-phrase-list-view.html',
  styleUrl: './word-phrase-list-view.scss',
})
export class WordPhraseListView {
  wordOrPhrase = input.required<WordOrPhrase>();
  embedded = input<boolean>(false);
  addButtonClickEvent = output<WordOrPhrase>();

  translateText = computed<string>(() => encodeURIComponent(this.wordOrPhrase().value));

  handleAddClick(): void {
    this.addButtonClickEvent.emit(this.wordOrPhrase());
  }
}
