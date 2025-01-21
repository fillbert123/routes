import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() type: string;
  @Input() color: string;
  @Input() field: string;
  @Input() sideIcon: any;
  @Output() clickedFilter = new EventEmitter<any>();

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleFilterClick(filter: string) {
    this.clickedFilter.emit(filter);
  }
}
