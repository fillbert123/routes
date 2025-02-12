import { Component, Input } from '@angular/core';
import stopData from '../../../assets/data/stop.json';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  @Input() type: string;
  @Input() connection: any;
  stopConnectionDetail: any = [];

  ngOnInit() {
    if(this.type === 'connectivity') {
      this.getConnectionDetailList();
    }
  }

  getConnectionDetailList() {
    this.connection.forEach((connection) => {
      this.stopConnectionDetail.push(...stopData.filter((stop) => stop.stopId === connection));
    });
  }

  getConnectionTypeName(type) {
    switch(type) {
      case ListType.MRT:
        return 'MRT Jakarta';
      case ListType.LRT:
        return 'LRT Jabodebek';
      case ListType.LRTJ:
        return 'LRT Jakarta';
      case ListType.BRT:
        return 'BRT Transjakarta';
      case ListType.KRL:
        return 'KRL Commuter'
      default:
        return '';
    }
  }
}

enum ListType {
  MRT = 'mrt',
  LRT = 'lrt',
  LRTJ = 'lrtj',
  BRT = 'brt',
  KRL = 'krl',
}