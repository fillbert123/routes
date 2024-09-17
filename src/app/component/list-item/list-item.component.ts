import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss', '../animation.component.scss']
})
export class ListItemComponent {
  @Input() corridor: any;

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleListItemClick(corridor: any) {
    console.log(corridor);
  }
}
