import { saveAs } from "file-saver";
import moment from "moment";
import { Category } from "../models/category";
import { ExportModel } from "../models/export-model";
import { WordList } from "../models/word-list";
import { WordOrPhrase } from "../models/word-or-phrase";

export class ExportHelper {
  public static lastLoadedFileName: string = "";

  public static export(words: WordOrPhrase[], categories: Category[], lists: WordList[], recentlyLearntWordsAndPhrases: string[], whatToLearnListId?: string): void {
    const model: ExportModel = {
      language: {
        wordsOrPhrases: words || [],
        dialogues: lists || [],
        learn: {
          recentWordsAndPhrases: recentlyLearntWordsAndPhrases || [],
          whatToLearnListId: whatToLearnListId
        }
      },
      categories: categories || [],
      exportDate: moment().format("YYYY-MM-DD")
    };
    const modelText = JSON.stringify(model);
    const blob = new Blob([modelText], { type: "text/json" });
    saveAs(blob, this.lastLoadedFileName ? this.lastLoadedFileName : `lang-learn.json`);
  }
}
