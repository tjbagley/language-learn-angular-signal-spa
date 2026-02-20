import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLayout } from './basic-layout';

describe('HomeLayout', () => {
  let component: BasicLayout;
  let fixture: ComponentFixture<BasicLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicLayout],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
