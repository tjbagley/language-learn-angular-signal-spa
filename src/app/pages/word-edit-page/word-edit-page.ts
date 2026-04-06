import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { CategoriesStore } from '../../store/categories-store';
import { WordOrPhrase } from '../../models/word-or-phrase';
import { FormHelper } from '../../helpers/form-helper';
import { ListsStore } from '../../store/lists-store';

@Component({
  selector: 'app-word-edit-page',
  imports: [ReactiveFormsModule],
  templateUrl: './word-edit-page.html',
  styleUrl: './word-edit-page.scss',
})
export class WordEditPage {
  wordsAndPhrasesStore = inject(WordsAndPhrasesStore);
  categoriesStore = inject(CategoriesStore);
  listsStore = inject(ListsStore);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private readonly id = this.route.snapshot.paramMap.get('id');
  private initialValue = this.wordsAndPhrasesStore.wordOrPhraseById(this.id ?? '');

  wordFormGroup = this.formBuilder.group({
    id: [this.initialValue?.id],
    value: [this.initialValue?.value ?? this.wordsAndPhrasesStore.searchQuery(), Validators.required],
    soundsLike: [this.initialValue?.soundsLike],
    meaning: [this.initialValue?.meaning, Validators.required],
    categories: [this.initialValue?.categories ?? [], Validators.required]
  });
  isFormSubmitted = signal<boolean>(false);
  isAddMode = computed<boolean>(() => !this.id);

  handleSubmit(): void {
    this.isFormSubmitted.set(true);
    if (this.wordFormGroup.valid) {
      const formValues = this.wordFormGroup.getRawValue();
      const word: WordOrPhrase = {
        id: formValues.id ?? '',
        value: formValues.value ?? '',
        soundsLike: formValues.soundsLike ?? '',
        meaning: formValues.meaning ?? '',
        categories: formValues.categories ?? []
      }
      if (!word.id) {
        this.wordsAndPhrasesStore.addWordOrPhrase(word);
      } else {
        this.wordsAndPhrasesStore.updateWordOrPhrase(word);   
      }
      this.navigateBack();
    }
  }

  handleCancel(): void {
    this.navigateBack();
  }

  handleDelete(): void {
    if (confirm("Are you sure you want to remove this word/phrase?")) {
      const formId = this.wordFormGroup.get('id')?.value ?? '';
      this.wordsAndPhrasesStore.removeWordOrPhrase(formId);
      this.listsStore.removeWordFromLists(formId);
      this.router.navigate(['/words']);
    }
  }

  hasError(controlName: string): boolean {
    return FormHelper.hasError(controlName, this.wordFormGroup, this.isFormSubmitted());
  }

  private navigateBack(): void {
    const wordEditReturnRoute = this.wordsAndPhrasesStore.wordEditReturnRoute();
    if (wordEditReturnRoute.route) {
      if (wordEditReturnRoute.routeId) {
        this.router.navigate([wordEditReturnRoute.route, wordEditReturnRoute.routeId]);
      } else {
        this.router.navigate([wordEditReturnRoute.route]);
      }
    } else {
      this.router.navigate(['/words']);
    }
  }
}
