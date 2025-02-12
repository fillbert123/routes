import { Component, EventEmitter, Input, Output } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json'
import stopDirectionData from '../../../assets/data/stopDirection.json';

@Component({
  selector: 'app-corridor-detail',
  templateUrl: './corridor-detail.component.html',
  styleUrl: './corridor-detail.component.scss'
})
export class CorridorDetailComponent {
  @Output() selectedStop = new EventEmitter<any>();
  // direction: string;
  track: any;

  //redesigned
  @Input() corridor: string;
  corridorDetail: any;
  direction: string;
  @Output() itemClick = new EventEmitter<any>();

  ngOnInit() {
    this.getCorridorDetail();
  }

  getCorridorDetail() {
    this.corridorDetail = corridorData.find((item) => {
      return item.corridorId === this.corridor;
    })
  }

  handleDirectionClick(direction) {
    this.direction = direction;
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleListStopClick(stop: string) {
    this.selectedStop.emit(stop);
  }

  handleItemClick(id) {
    this.itemClick.emit(id);
  }
}
