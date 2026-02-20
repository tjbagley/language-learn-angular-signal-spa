import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditPage } from './list-edit-page';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../mocks/mock-activated-route';

describe('ListEditPage', () => {
  let component: ListEditPage;
  let fixture: ComponentFixture<ListEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEditPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
