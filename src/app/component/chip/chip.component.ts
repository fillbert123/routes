import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() type: string;
  @Input() color: string;
  @Input() code: string;

  getCorridorColor(color: string) {
    return `var(--${color})`
  }
}
