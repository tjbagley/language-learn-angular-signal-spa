import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { computed, Signal } from '@angular/core';
import { WordList } from '../models/word-list';

type ListsState = {
   values: WordList[];
}

const initialState: ListsState = {
  values: [{
    id: '1',
    description: 'Numbers 1 - 3',
    items: [
      { actor: '', wordOrPhraseId: '2' },
      { actor: '', wordOrPhraseId: '3' },
      { actor: '', wordOrPhraseId: '4' }
    ] 
  }]
};

export const ListsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    listById: (id: string) => store.values().find(l => l.id === id),
    addList: (list: WordList) => {
      if (!list.id) {
        list.id = crypto.randomUUID();
      }
      const updatedValues = sortLists([...store.values(), list]);
      patchState(store, {values: updatedValues});
    },
    updateList: (list: WordList) => {
      const updatedValues = sortLists([...store.values().filter(l => l.id !== list.id), list]);
      patchState(store, {values: updatedValues});
    },
    removeList: (id: string) => {
      patchState(store, {values: store.values().filter(l => l.id !== id)});
    },
    removeWordFromLists: (wordOrPhraseId: string) => {
      store.values().forEach(wordList => {
        wordList.items = wordList.items.filter(item => item.wordOrPhraseId !== wordOrPhraseId);
      });
    },
  }))
);

function sortLists(lists: WordList[]): WordList[] {
  lists.sort((a: WordList, b: WordList): number => {
    return a.description.localeCompare(b.description);
  });
  return lists;
}
