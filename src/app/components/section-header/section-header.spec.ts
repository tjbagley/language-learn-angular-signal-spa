import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  let component: SectionHeader;
  let fixture: ComponentFixture<SectionHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionHeader);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('heading', '');
    fixture.componentRef.setInput('buttonLabel', '');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Inputs', () => {
    it('should set heading input', () => {
      const testHeading = 'Test Heading';
      fixture.componentRef.setInput('heading', testHeading);
      fixture.componentRef.setInput('buttonLabel', '');
      expect(component.heading()).toBe(testHeading);
    });

    it('should set buttonLabel input', () => {
      const testLabel = 'Click Me';
      fixture.componentRef.setInput('heading', '');
      fixture.componentRef.setInput('buttonLabel', testLabel);
      expect(component.buttonLabel()).toBe(testLabel);
    });

    it('should render heading in template', () => {
      const testHeading = 'My Section';
      fixture.componentRef.setInput('heading', testHeading);
      fixture.componentRef.setInput('buttonLabel', '');
      fixture.detectChanges();
      const h1 = fixture.nativeElement.querySelector('h1');
      expect(h1.textContent).toBe(testHeading);
    });

    it('should render buttonLabel in template', () => {
      const testLabel = 'Action Button';
      fixture.componentRef.setInput('heading', '');
      fixture.componentRef.setInput('buttonLabel', testLabel);
      fixture.detectChanges();
      const button = fixture.nativeElement.querySelector('button');
      expect(button.textContent).toBe(testLabel);
    });
  });

  describe('Output', () => {
    it('should emit buttonClickEvent when handleButtonClick is called', () => {
      let emitted = false;
      component.buttonClickEvent.subscribe(() => {
        emitted = true;
      });
      component.handleButtonClick();
      expect(emitted).toBe(true);
    });

    it('should emit buttonClickEvent when button is clicked', () => {
      fixture.componentRef.setInput('heading', 'Test');
      fixture.componentRef.setInput('buttonLabel', 'Test Button');
      fixture.detectChanges();

      let emitted = false;
      component.buttonClickEvent.subscribe(() => {
        emitted = true;
      });
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      expect(emitted).toBe(true);
    });
  });
});
