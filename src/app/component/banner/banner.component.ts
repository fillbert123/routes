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
  @Input() stopConnectionData: any;
  connectionData: any;


  ngOnInit() {
    if(this.type === 'connectivity') {
      this.setConnectionLabel();
    }
  }

  setConnectionLabel() {
    let connectionData = [];
    this.stopConnectionData.forEach((connection) => {
      console.log('connection: ', connection);
      let eachStopType = this.setEachStopType(connection.stopType);
      let eachStopCorridor = this.setEachStopCorridor(connection.stopInterchange);
      connectionData.push({
        "connectedStopName": this.getStopName(connection.stopName),
        "connectedStopType": eachStopType,
        "connectedStopCorridor": eachStopCorridor
      })
    })
    // console.log('connectionData', connectionData);
    this.connectionData = connectionData;
  }

  setEachStopType(type) {
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

  setEachStopCorridor(interchanges) {
    let interchangesData = []
    interchanges.forEach((interchange) => {
      let interchangeCorridorData = corridorData.find((corridor) => {
        return corridor.corridorLookUp === interchange;
      })
      interchangesData.push({
        "corridorIcon": interchangeCorridorData.corridorIcon,
        "corridorColor": interchangeCorridorData.corridorColor
      })
    })
    return interchangesData;
  }

  getStopName(name) {
    if(name.endsWith('MRT') || name.endsWith('LRT') || name.endsWith('KRL')) {
      return name.substring(0, name.length - 4);
    }
    return name;
  }
}

enum ListType {
  MRT = 'mrt',
  LRT = 'lrt',
  LRTJ = 'lrtj',
  BRT = 'brt',
  KRL = 'krl',
}