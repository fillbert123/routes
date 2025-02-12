import { Component, EventEmitter, Input, Output } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json'

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
  // @Input() isFirst: boolean;
  // @Input() isLast: boolean;
  @Output() selectedCorridor = new EventEmitter<any>();
  @Output() selectedStop = new EventEmitter<any>();
  transitCorridor: any = [];

  //redesigned
  @Input() type: string;
  @Input() item: any;
  @Output() itemClick = new EventEmitter<any>();
  corridorDetail: any;
  @Input() isStopFirst: boolean;
  @Input() isStopLast: boolean;
  transitDetailList: any = [];

  ngOnInit() {
    this.getCorridorDetail();
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
        this.transitCorridor.push(...corridorData.filter((corridor) => corridor.corridorId === transit));
      });
    }
  }

  getSearchStopName(name) {
    if(name.endsWith('MRT') || name.endsWith('LRT') || name.endsWith('KRL')) {
      return name.substring(0, name.length - 4);
    }
    return name;
  }

  getInterchangeCorridorData(interchange, value) {
    let data = corridorData.find((corridor) => corridor.corridorId === interchange);
    if(value === 'color') {
      return data.corridorColor;
    }
    if(value === 'icon') {
      return data.corridorIcon;
    }
    return null;
  }

  //redesign
  handleItemClick(id) {
    this.itemClick.emit(id);
  }

  getCorridorDetail() {
    this.corridorDetail = corridorData.find((item) => {
      return item.corridorId === this.item.stopCorridor;
    })
    this.getTransitDetailList();
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
}
