import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-terminus-selection',
  templateUrl: './terminus-selection.component.html',
  styleUrl: './terminus-selection.component.scss'
})
export class TerminusSelectionComponent {
  @Input() terminusLower: any;
  @Input() terminusUpper: any;
  @Output() clickedDirection = new EventEmitter<any>();
  selectedDirection: any = 'upper';

  emitDirectionClick(direction: any) {
    this.selectedDirection = direction;
    console.log(direction);
    this.clickedDirection.emit(direction);
  }
}
