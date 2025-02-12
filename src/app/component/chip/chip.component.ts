import { Component, Input, Output, EventEmitter } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() type: string;
  @Input() color: string;
  @Input() field: string;
  @Input() connection: any;
  @Output() clickedFilter = new EventEmitter<any>();
  corridorDetail: any = [];

  ngOnInit() {
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
