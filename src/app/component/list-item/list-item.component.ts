import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss', '../animation.component.scss']
})
export class ListItemComponent {
  @Input() corridor: any;
  @Input() color: string
  @Input() stop: any;
  @Input() listItemType: string;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;
  @Output() selectedCorridor = new EventEmitter<any>();

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleListItemClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }
}
