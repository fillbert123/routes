import { Component, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-corridor-selection',
  templateUrl: './corridor-selection.component.html',
  styleUrl: './corridor-selection.component.scss'
})
export class CorridorSelectionComponent {
  groupedLine: any;
  selectedLineGroup: string;
  selectedLineType: string;

  @Input() selectedLine: string;

  @Output() itemClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    let splittedLine = this.selectedLine.split('-');
    this.selectedLineType = splittedLine[0];
    this.selectedLineGroup = splittedLine[1];
    this.groupedLine = this.getLinesBySelection(this.selectedLineGroup, this.selectedLineType);
  }

  getLinesBySelection(name, type) {
    return corridorData.filter((item) => {
      return item.corridorType === type && item.corridorGroup === name;
    });
  }

  handleItemClick(item: any) {
    this.itemClick.emit(item);
  }
}
