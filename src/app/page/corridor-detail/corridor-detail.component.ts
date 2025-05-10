import { Component, EventEmitter, Input, Output } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json'

@Component({
  selector: 'app-corridor-detail',
  templateUrl: './corridor-detail.component.html',
  styleUrl: './corridor-detail.component.scss'
})
export class CorridorDetailComponent {
  corridorDetail: any;
  direction: string;

  @Input() corridor: string;

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

  handleItemClick(id) {
    this.itemClick.emit(id);
  }
}
