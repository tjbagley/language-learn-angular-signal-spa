import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPhraseListView } from './word-phrase-list-view';

describe('WordPhraseListView', () => {
  let component: WordPhraseListView;
  let fixture: ComponentFixture<WordPhraseListView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordPhraseListView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordPhraseListView);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('wordOrPhrase', { value: 'test', category: 'test' });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
