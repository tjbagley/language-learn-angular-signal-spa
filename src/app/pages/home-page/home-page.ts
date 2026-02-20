import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExportHelper } from '../../helpers/export-helper';
import { ExportModel } from '../../models/export-model';

@Component({
  selector: 'app-home-page',
  imports: [],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private router = inject(Router);

  handleNewLanguageClick(): void {
    this.router.navigate(['/words']);
  }

  handleFileUploadChange(event: Event): void {
    console.log(event);
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      ExportHelper.lastLoadedFileName = file.name;
      const reader = new FileReader();
      reader.onload = (e) => {
        const modelText = reader.result?.toString() ?? "";
        const model: ExportModel = JSON.parse(modelText);
        if (model?.categories && model?.language) {
          /*if (model?.categories?.length > 0) {
            store.dispatch(loadCategories(model.categories)); 
          }
          if (model?.language?.wordsOrPhrases?.length > 0) {
            store.dispatch(loadWords(model.language.wordsOrPhrases));
          }
          if (model?.language?.dialogues && model.language.dialogues.length > 0) {
            store.dispatch(loadWordLists(model.language.dialogues));
          }
          if (model?.language?.learn?.recentWordsAndPhrases && model.language.learn.recentWordsAndPhrases.length > 0) {
            store.dispatch(loadRecentlyLearntWordsAndPhrases(model.language.learn.recentWordsAndPhrases));
          }
          if (model?.language?.learn?.whatToLearnListId) {
            store.dispatch(setWhatToLearnListId(model.language.learn.whatToLearnListId));
          } else {
            store.dispatch(setWhatToLearnListId(""));
          }*/
          this.router.navigate(['/words']);
        }
      };
      reader.readAsText(file);
    } 
  }
}
