import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  corridorDetail: any = [];

  @Input() color: string;
  @Input() connection: any;
  @Input() field: string;
  @Input() type: string;

  @Output() clickedFilter = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    this.corridorDetail = [];
    if(this.type === 'connection') {
      this.getCorridorDetail();
    }
  }

  getCorridorDetail() {
    this.connection.forEach((connection) => {
      this.corridorDetail.push(...corridorData.filter((corridor) => corridor.corridorId === connection));
    });
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleFilterClick(filter: string) {
    this.clickedFilter.emit(filter);
  }
}
