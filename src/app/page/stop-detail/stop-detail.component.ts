import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json';

@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.component.html',
  styleUrl: './stop-detail.component.scss'
})
export class StopDetailComponent {
  stopDetail: any = null;
  selectedStopConnectionData: any = [];
  selectedStopInterchangeData: any = [];
  stopInterchangeDetail: any = []

  @Input() stop: string;
;
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

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
