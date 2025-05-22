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
  @Input() isActive: boolean = true;

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  getCorridorStyleSmall() {
    return {
      'background-color': this.getCorridorColor(this.color),
      'box-sizing': 'border-box', 
      'border-style': (this.isActive) ? 'none' : 'solid', 
      'border-width': '2px', 
      'border-color': 'var(--grey)'
    }
  }

  getCorridorStyleLarge() {
    return {
      'background-color': this.getCorridorColor(this.color),
      'box-sizing': 'border-box', 
      'border-style': (this.isActive) ? 'none' : 'solid', 
      'border-width': '4px', 
      'border-color': 'var(--grey)'
    }
  }
}
