import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Output() backClicked = new EventEmitter<any>();

  emitBackClicked() {
    this.backClicked.emit();
  }
}
