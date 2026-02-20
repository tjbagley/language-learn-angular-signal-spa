import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordEditPage } from './word-edit-page';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../mocks/mock-activated-route';

describe('WordEditPage', () => {
  let component: WordEditPage;
  let fixture: ComponentFixture<WordEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordEditPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
