import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrl: './line-detail.component.scss'
})
export class LineDetailComponent {
  @Input() corridorColor: any;
  @Input() selCor: any;
  @Input() selCorDir: any;
  @Input() corBusList: any;
  @Input() selTrk: any;
  @Input() selTrkDir: any;
  @Input() trkBusList: any;
  @Input() terminusLower: any;
  @Input() terminusUpper: any;
  @Output() clickedBusStop = new EventEmitter<any>();

  presentedCorBusList: any;
  corBusUpperBound: any;
  corBusLowerBound: any;

  presentedTrkBusList: any;
  trkBusUpperBound: any;
  trkBusLowerBound: any;
  presentedTrkBusListShow: any;

  ngOnChanges() {
    console.log('sel cor dir', this.selCorDir);
    console.log('sel trx dir', this.selTrkDir);
    if(this.corBusList) {
      this.corBusUpperBound = this.upperBoundLine(this.corBusList, this.terminusLower);
      this.corBusLowerBound = this.lowerBoundLine(this.corBusList, this.terminusUpper);
      this.presentedCorBusList = (this.selCorDir == 'lower') ? this.corBusLowerBound : this.corBusUpperBound;
    }
    else if(this.trkBusList) {
      this.trkBusUpperBound = this.upperBoundLine(this.trkBusList, this.terminusLower);
      this.trkBusLowerBound = this.lowerBoundLine(this.trkBusList, this.terminusUpper);
      this.presentedTrkBusList = (this.selTrkDir == 'lower') ? this.trkBusLowerBound : this.trkBusUpperBound;

      let target = false;
      this.presentedTrkBusListShow = [];

      for(let i = this.presentedTrkBusList.length; i > 0; i--) {
        if(this.presentedTrkBusList[i - 1] === this.selTrk.busStopId) {
          this.presentedTrkBusListShow.push('current');
          target = true;
        }
        else if(!target) {
          this.presentedTrkBusListShow.push('show');
        }
        else if(target) {
          this.presentedTrkBusListShow.push('hide');
        }
      }
      this.presentedTrkBusListShow = this.presentedTrkBusListShow.reverse()
    }
  }

  upperBoundLine(busList: any, terminusLower: any) {
    const upperBoundList = [];
    let currentStop = busList.find((stop: any) => stop.busStopId == terminusLower);
    while(currentStop) {
      upperBoundList.push(currentStop.busStopId);
      currentStop = busList.find((stop: any) => stop.busStopId == currentStop.busStopNextUp);
    }
    return upperBoundList;
  }

  lowerBoundLine(busList: any, terminusUpper: any) {
    const lowerBoundList = [];
    let currentStop = busList.find((stop: any) => stop.busStopId == terminusUpper);
    while(currentStop) {
      lowerBoundList.push(currentStop.busStopId);
      currentStop = busList.find((stop: any) => stop.busStopId == currentStop.busStopNextLow);
    }
    return lowerBoundList;
  }

  getBusStopDetail(stopName: string) {
    this.clickedBusStop.emit(stopName);
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  setCorridorColor(color: string, idx: any, type: string) {
    if(this.presentedTrkBusListShow[idx] === 'hide') {
      return `var(--disable)`
    }
    else {
      if(type === 'icon') {
        return `var(--${color})`
      }
      return `var(--white)`
    }
  }
}
