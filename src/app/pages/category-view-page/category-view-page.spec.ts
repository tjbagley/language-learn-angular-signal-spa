import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewPage } from './category-view-page';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../mocks/mock-activated-route';

describe('CategoryViewPage', () => {
  let component: CategoryViewPage;
  let fixture: ComponentFixture<CategoryViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryViewPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
