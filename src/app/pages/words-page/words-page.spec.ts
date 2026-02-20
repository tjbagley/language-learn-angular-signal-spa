import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordsPage } from './words-page';

describe('WordsPage', () => {
  let component: WordsPage;
  let fixture: ComponentFixture<WordsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
