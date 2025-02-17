import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json';

@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.component.html',
  styleUrl: './stop-detail.component.scss'
})
export class StopDetailComponent {
  @Input() selectedStop: any;
  selectedStopInterchange: any = [];
  selectedStopInterchangeData: any = [];
  selectedStopConnection: any = [];
  selectedStopConnectionData: any = [];

  //redesigned
  @Input() stop: string;
  stopDetail: any = null;
  stopInterchangeDetail: any = [];
  @Output() stopClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    this.stopDetail = null;
    this.stopInterchangeDetail = [];
    this.getCorridorDetail();
  }

  getStopName(code) {
    return stopData.find((item) => {
      return item.stopId === code;
    }).stopName;
  }

  getCorridorDetail() {
    this.stopDetail = stopData.find((item) => {
      return item.stopId === this.stop;
    })
    this.getTransitDetailList();
  }

  getTransitDetailList() {
    if(this.stopDetail?.stopInterchange) {
      this.stopDetail.stopInterchange.forEach((interchange) => {
        this.stopInterchangeDetail.push(...corridorData.filter((corridor) => corridor.corridorId === interchange));
      });
    }
  }

  getStopInterchange(stopName: string) {
    return stopData.find((stop) => {
      return stop.stopName === stopName;
    })
  }

  setStopInterchangeData(stopInterchange: any) {
    stopInterchange.forEach((interchange) => {
      let interchangeCorridorData = corridorData.find((corridor) => {
        return corridor.corridorId === interchange;
      })
      this.selectedStopInterchangeData.push(interchangeCorridorData);
    })
  }

  setStopConnectionData(stopConnection: any) {
    stopConnection.forEach((connection) => {
      let stopConnectionData = stopData.find((stop) => {
        return stop.stopName === connection;
      })
      this.selectedStopConnectionData.push(stopConnectionData);
    })
  }

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
