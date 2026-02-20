import { Component, computed, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsStore } from '../../store/lists-store';
import { WordList, WordListItem } from '../../models/word-list';
import { FormHelper } from '../../helpers/form-helper';
import { WordsAndPhrasesStore } from '../../store/words-phrases-store';
import { Search } from '../../components/search/search';
import { WordOrPhrase } from '../../models/word-or-phrase';

@Component({
  selector: 'app-list-edit-page',
  imports: [ReactiveFormsModule, Search],
  templateUrl: './list-edit-page.html',
  styleUrl: './list-edit-page.scss',
})
export class ListEditPage {
  listsStore = inject(ListsStore);
  wordsAndPhrasesStore = inject(WordsAndPhrasesStore);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private readonly id = this.route.snapshot.paramMap.get('id');
  private initialValue = this.listsStore.listById(this.id ?? '');

  listFormGroup = this.formBuilder.group({
    id: [this.initialValue?.id],
    description: [this.initialValue?.description ?? '', Validators.required],
    items: this.wordListItemsToFormArray(this.initialValue?.items),
  });
  isFormSubmitted = signal<boolean>(false);
  isAddMode = computed<boolean>(() => !this.id);
  headingPrefix = computed<string>(() => (this.isAddMode() ? 'Add' : 'Edit'));

  get items(): FormArray {
    return this.listFormGroup.get('items') as FormArray;
  }

  getWordOrPhraseDisplay(control: AbstractControl): string {
    return control.get('description')?.value ?? '';
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  hasError(controlName: string): boolean {
    return FormHelper.hasError(controlName, this.listFormGroup, this.isFormSubmitted());
  }

  handleAddClick(wordOrPhrase: WordOrPhrase): void {
    const formGroup = this.createItemFormGroup({
      actor: '',
      wordOrPhraseId: wordOrPhrase.id
    });
    this.items.push(formGroup);
  }

  handleSubmit(): void {
    this.isFormSubmitted.set(true);
    if (this.listFormGroup.valid) {
      const formValues = this.listFormGroup.getRawValue();
      const list: WordList = {
        id: formValues.id ?? '',
        description: formValues.description ?? '',
        items: [],
      };
      for (let i = 0; i <= this.items.controls.length - 1; i++) {
        const item = this.items.controls[i];
        list.items.push({
          actor: item.get('actor')?.value ?? '',
          wordOrPhraseId: item.get('wordOrPhraseId')?.value ?? '',
        });
      }
      if (!list.id) {
        this.listsStore.addList(list);
      } else {
        this.listsStore.updateList(list);
      }
      this.router.navigate(['/lists']);
    }
  }

  handleCancel(): void {
    this.router.navigate(['/lists']);
  }

  handleDelete(): void {
    if (confirm('Are you sure you want to remove this list?')) {
      this.listsStore.removeList(this.listFormGroup.get('id')?.value ?? '');
      this.router.navigate(['/lists']);
    }
  }

  private wordListItemsToFormArray(wordListItems: WordListItem[] | undefined): FormArray {
    const results: FormArray = this.formBuilder.array([]);
    if (!wordListItems) {
      return results;
    }

    wordListItems.forEach((w) => {
      results.push(this.createItemFormGroup(w));
    });

    return results;
  }

  private createItemFormGroup(wordListItem: WordListItem | null = null): UntypedFormGroup {
    const description =
      this.wordsAndPhrasesStore.wordOrPhraseById(wordListItem?.wordOrPhraseId ?? '')?.value ?? '';

    return this.formBuilder.group({
      actor: [wordListItem?.actor ?? ''],
      wordOrPhraseId: [wordListItem?.wordOrPhraseId ?? '', Validators.required],
      description: [description],
    });
  }
}
