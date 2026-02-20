import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEditPage } from './category-edit-page';
import { mockActivatedRoute } from '../../mocks/mock-activated-route';
import { ActivatedRoute } from '@angular/router';

describe('CategoryEditPage', () => {
  let component: CategoryEditPage;
  let fixture: ComponentFixture<CategoryEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryEditPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
