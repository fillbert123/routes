import { Component, EventEmitter, Input, Output } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

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
  @Output() selectedStop = new EventEmitter<any>();
  transitCorridor: any = [];

  ngOnInit() {
    if(this.listItemType === 'stop') {
      this.getTransitCorridorData();
    }
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  handleListCorridorClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }

  handleListStopClick(stop: any) {
    this.selectedStop.emit(stop);
  }

  getTransitCorridorData() {
    if(this.stop?.stopTransit) {
      this.stop.stopTransit.forEach((transit) => {
        this.transitCorridor.push(...corridorData.filter((corridor) => corridor.corridorLookUp === transit));
      });
    }
  }
}
