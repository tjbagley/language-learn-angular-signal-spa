import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { WordOrPhrase } from '../models/word-or-phrase';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { WordHelper } from '../helpers/word-helper';

type WordsToLearn = {
  wordToLearn: WordOrPhrase | null;
  choice1: WordOrPhrase | null;
  choice2: WordOrPhrase | null;
}

type WordsAndPhrasesState = {
  values: WordOrPhrase[];
  searchQuery: string;
  recentlyLearntWordsAndPhrases: string[];
  learn: WordsToLearn;
  whatToLearnListId: string;
  wordEditReturnRoute: {
    route: string;
    routeId: string;
  }
}

const initialState: WordsAndPhrasesState = {
  values: [{
    id: '1',
    value: 'bonjour',
    soundsLike: 'bon[d] [a]zure',
    meaning: 'Good morning',
    categories: ['5']
  },{
    id: '2',
    value: 'un',
    soundsLike: 'uh',
    meaning: 'one',
    categories: ['6']
  },{
    id: '3',
    value: 'deux',
    soundsLike: 'dir',
    meaning: 'two',
    categories: ['6']
  },{
    id: '4',
    value: 'trois',
    soundsLike: 'twah',
    meaning: 'three',
    categories: ['6']
  }],
  searchQuery: '',
  recentlyLearntWordsAndPhrases: [],
  whatToLearnListId: '',
  learn: {
    wordToLearn: null,
    choice1: null,
    choice2: null
  },
  wordEditReturnRoute: {
    route: '',
    routeId: ''
  }
};

export const WordsAndPhrasesStore = signalStore(
  { providedIn: 'root' },
  withDevtools('words'),
  withState(initialState),
  withComputed(({ values, searchQuery }) => ({
    wordsBySearchQuery: () => {
      const result = searchQuery() ? values().filter(item =>
        item.value?.toLowerCase()?.includes(searchQuery().toLowerCase()) ||
        item.meaning?.toLowerCase()?.includes(searchQuery().toLowerCase())
      ) : [];
      return result;
    }
  })),
  withMethods((store) => ({
    search: (query: string) => {
      patchState(store, {searchQuery: query});
    },
    searchByCategoryId: (categoryId: string) => store.values().filter(w => w.categories && w.categories.includes(categoryId)),
    wordOrPhraseById: (id: string) => store.values().find(w => w.id === id),
    addWordOrPhrase: (word: WordOrPhrase) => {
      if (!word.id) {
        word.id = crypto.randomUUID();
      }
      const updatedValues = sortWordsAndPhrases([...store.values(), word]);
      patchState(store, {values: updatedValues, searchQuery: word.value});
    },
    updateWordOrPhrase: (word: WordOrPhrase) => {
      const updatedValues = sortWordsAndPhrases([...store.values().filter(w => w.id !== word.id), word]);
      patchState(store, {values: updatedValues, searchQuery: word.value});
    },
    removeWordOrPhrase: (id: string) => {
      patchState(store, {values: store.values().filter(w => w.id !== id), searchQuery: ''});
    },
    removeCategory: (categoryId: string) => {
      store.values().forEach(w => {
        w.categories = w.categories.filter(cid => cid !== categoryId);
      });
    },
    setupWordToLearn: (wordIds: string[]) => {
      const wordsInList = !!wordIds && wordIds.length > 0 ? store.values().filter(word => 
        wordIds.includes(word.id)
      ) : store.values();
      const wordToLearn = WordHelper.getRandomWordOrPhraseWithLowestLearnLevel(wordsInList, [], [], store.recentlyLearntWordsAndPhrases());
      const choice1 = WordHelper.getRandomWordOrPhrase(store.values(), wordToLearn.categories, [wordToLearn.id], store.recentlyLearntWordsAndPhrases());
      const choice2 = WordHelper.getRandomWordOrPhrase(store.values(), wordToLearn.categories, [wordToLearn.id, choice1.id], store.recentlyLearntWordsAndPhrases());
      const wordsToLearn = {
        wordToLearn: wordToLearn,
        choice1: choice1,
        choice2: choice2
      };
      patchState(store, {learn: wordsToLearn});
    },
    setWordLearntAsCorrect: () => {
      if (store.learn().wordToLearn) {
        const word = store.values().find(wp => wp.id === store.learn().wordToLearn?.id);
        WordHelper.markAsLearntCorrect(word);
      }
    },
    setWordLearntAsIncorrect: () => {
      if (store.learn().wordToLearn) {
        const word = store.values().find(wp => wp.id === store.learn().wordToLearn?.id);
        WordHelper.markAsLearntIncorrect(word);
      }
    },
    addRecentlyLearntWord: (wordOrPhrase: WordOrPhrase | null) => {
      if (!wordOrPhrase) {
        return;
      }
      let recentlyLearntWordsAndPhrases = store.recentlyLearntWordsAndPhrases(); 
      if (recentlyLearntWordsAndPhrases.length >= 20) {
        recentlyLearntWordsAndPhrases.shift();
      }
      recentlyLearntWordsAndPhrases = [...recentlyLearntWordsAndPhrases.filter(id => id !== wordOrPhrase.id), wordOrPhrase.id];
      patchState(store, {recentlyLearntWordsAndPhrases: recentlyLearntWordsAndPhrases});
    },
    setWhatToLearnListId: (listId: string) => {
      patchState(store, {whatToLearnListId: listId});
    },
    setWordEditReturnRoute: (route: string, routeId?: string) => {
      patchState(store, {wordEditReturnRoute: {route: route, routeId: routeId ?? ''}});
    }
  }))
);

function sortWordsAndPhrases(words: WordOrPhrase[]): WordOrPhrase[] {
  words.sort((a: WordOrPhrase, b: WordOrPhrase): number => {
    return a.value.localeCompare(b.value);
  });
  return words;
}
