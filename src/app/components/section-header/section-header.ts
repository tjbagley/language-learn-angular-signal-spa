import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-section-header',
  imports: [],
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
})
export class SectionHeader {
  heading = input.required<string>();
  buttonLabel = input.required<string>();
  buttonClickEvent = output();

  handleButtonClick(): void {
    if (this.buttonClickEvent) {
      this.buttonClickEvent.emit();
    }
  }
}
