import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Category } from '../models/category';
import { computed, Signal } from '@angular/core';

type CategoriesState = {
   categories: Category[];
}

const initialState: CategoriesState = {
  categories: [{
    id: '1',
    description: 'Noun'
  }, {
    id: '2',
    description: 'Verb'
  }, {
    id: '3',
    description: 'Adjective'
  }, {
    id: '4',
    description: 'Other'
  }, {
    id: '5',
    description: 'Greetings'
  }, {
    id: '6',
    description: 'Numbers'
  }]
};

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    categoryById: (id: string) => store.categories().find(c => c.id === id),
    addCategory: (category: Category) => {
      if (!category.id) {
        category.id = crypto.randomUUID();
      }
      const updatedValues = sortCategories([...store.categories(), category]);
      patchState(store, {categories: updatedValues});
    },
    updateCategory: (category: Category) => {
      const updatedValues = sortCategories([...store.categories().filter(c => c.id !== category.id), category]);
      patchState(store, {categories: updatedValues});
    },
    removeCategory: (id: string) => {
      patchState(store, {categories: store.categories().filter(c => c.id !== id)});
    }
  }))
);

function sortCategories(lists: Category[]): Category[] {
  lists.sort((a: Category, b: Category): number => {
    return a.description.localeCompare(b.description);
  });
  return lists;
}
