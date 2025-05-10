import { Component, EventEmitter, Input, Output } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss', '../animation.component.scss']
})
export class ListItemComponent {
  corridorDetail: any;
  transitDetailList: any = [];

  @Input() isStopFirst: boolean;
  @Input() isStopLast: boolean;
  @Input() item: any;
  @Input() type: string;

  @Output() itemClick = new EventEmitter<any>();

  ngOnInit() {
    this.getCorridorDetail();
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  getCorridorDetail() {
    this.corridorDetail = corridorData.find((item) => {
      return item.corridorId === this.item.stopCorridor;
    })
    this.getTransitDetailList();
  }

  getSearchStopName(name) {
    if(name.endsWith('MRT') || name.endsWith('LRT') || name.endsWith('KRL')) {
      return name.substring(0, name.length - 4);
    }
    return name;
  }

  getStopName(code, shorten = false) {
    let stop = stopData.find((item) => {
      return item.stopId === code;
    });
    if(shorten) {
      return (stop.stopNameShorten) ? stop.stopNameShorten : stop.stopName;
    } else {
      return stop.stopName;
    }
  }

  getTransitDetailList() {
    if(this.item?.stopTransit) {
      this.item.stopTransit.forEach((transit) => {
        this.transitDetailList.push(...corridorData.filter((corridor) => corridor.corridorId === transit));
      });
    }
    if(this.item?.stopInterchange) {
      this.item.stopInterchange.forEach((transit) => {
        this.transitDetailList.push(...corridorData.filter((corridor) => corridor.corridorId === transit));
      });
    }
  }

  handleItemClick(id) {
    this.itemClick.emit(id);
  }
}
