import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input() color: string;
  @Input() icon: string;
  @Input() type: string;

  getCorridorColor(color: string) {
    return `var(--${color})`
  }
}
