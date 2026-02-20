import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewPage } from './list-view-page';
import { ActivatedRoute } from '@angular/router';
import { mockActivatedRoute } from '../../mocks/mock-activated-route';

describe('ListViewPage', () => {
  let component: ListViewPage;
  let fixture: ComponentFixture<ListViewPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListViewPage],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListViewPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
