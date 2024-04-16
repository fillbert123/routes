import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-corridor-icon',
  templateUrl: './corridor-icon.component.html',
  styleUrl: './corridor-icon.component.scss'
})

export class CorridorIconComponent {
  @Input() corridorColor: any;
  @Input() corridorIcon: any;

  getCorridorColor(color: string) {
    return `var(--${color})`
  }
}
