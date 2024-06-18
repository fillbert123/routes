import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-terminus-selection',
  templateUrl: './terminus-selection.component.html',
  styleUrl: './terminus-selection.component.scss'
})
export class TerminusSelectionComponent {
  @Input() terminusLower: any;
  @Input() terminusUpper: any;
  @Input() selTrkDir: any;
  @Output() clickedDirection = new EventEmitter<any>();
  direction: any;

  ngOnInit() {
    this.direction = (this.selTrkDir) ? this.selTrkDir : 'upper';
  }

  emitDirectionClick(direction: any) {
    this.direction = direction;
    console.log(direction);
    this.clickedDirection.emit(direction);
  }
}
