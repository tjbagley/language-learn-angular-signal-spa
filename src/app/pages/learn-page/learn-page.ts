import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { WordOrPhrase } from '../../models/word-or-phrase';

@Component({
  selector: 'app-learn-page',
  imports: [],
  templateUrl: './learn-page.html',
  styleUrl: './learn-page.scss',
})
export class LearnPage implements OnInit {
  wordsAndPhrasesStore = inject(WordsAndPhrasesStore);
  selectedWord = signal<WordOrPhrase | null>(null);
  
  randomisedChoices = computed(() => this.randomiseList([
    this.wordsAndPhrasesStore.learn().wordToLearn, 
    this.wordsAndPhrasesStore.learn().choice1, 
    this.wordsAndPhrasesStore.learn().choice2
  ]));

  ngOnInit(): void {
    this.loadNextWord();
  }

  handleChoiceClick(choice: WordOrPhrase): void {
    this.selectedWord.set(choice);
    if (choice.id === this.wordsAndPhrasesStore.learn().wordToLearn?.id) {
      this.wordsAndPhrasesStore.setWordLearntAsCorrect();
    } else {
      this.wordsAndPhrasesStore.setWordLearntAsIncorrect();
    }
  }

  handleNextClick(): void {
    this.wordsAndPhrasesStore.addRecentlyLearntWord(this.wordsAndPhrasesStore.learn().wordToLearn);
    this.loadNextWord();
  }

  private loadNextWord(): void {
    const wordList = this.wordsAndPhrasesStore.values();
    this.wordsAndPhrasesStore.setupWordToLearn(wordList ? wordList.map(w => w.id) : []);
    this.selectedWord.set(null);
  }

  private randomiseList(words: Array<WordOrPhrase | null | undefined>): WordOrPhrase[] {
    return words.filter(w => !!w).sort(() => Math.random() - 0.5);
  }
}
