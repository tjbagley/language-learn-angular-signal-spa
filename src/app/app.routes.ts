import { Routes } from '@angular/router';
import { BasicLayout } from './layouts/basic-layout/basic-layout';
import { HomePage } from './pages/home-page/home-page';
import { MainLayout } from './layouts/main-layout/main-layout';
import { WordsPage } from './pages/words-page/words-page';
import { WordEditPage } from './pages/word-edit-page/word-edit-page';
import { CategoriesPage } from './pages/categories-page/categories-page';
import { CategoryViewPage } from './pages/category-view-page/category-view-page';
import { CategoryEditPage } from './pages/category-edit-page/category-edit-page';
import { LearnPage } from './pages/learn-page/learn-page';

export const routes: Routes = [
  {
    path: '',
    component: BasicLayout,
    children: [
      { path: '', component: HomePage },
      { path: 'words/new', component: WordEditPage},
      { path: 'words/:id', component: WordEditPage},
      { path: 'categories/new', component: CategoryEditPage},
      { path: 'categories/:id', component: CategoryEditPage},
      { path: 'lists/new', loadComponent: () =>
      import('./pages/list-edit-page/list-edit-page').then(m => m.ListEditPage) },
      { path: 'lists/:id', loadComponent: () =>
      import('./pages/list-edit-page/list-edit-page').then(m => m.ListEditPage) },
    ],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'words', component: WordsPage },
      { path: 'lists', loadComponent: () =>
      import('./pages/lists-page/lists-page').then(m => m.ListsPage) },
      { path: 'list-view/:id', loadComponent: () =>
      import('./pages/list-view-page/list-view-page').then(m => m.ListViewPage) },
      { path: 'categories', component: CategoriesPage},
      { path: 'category-view/:id', component: CategoryViewPage},
      { path: 'learn', component: LearnPage}
    ],
  },
];
