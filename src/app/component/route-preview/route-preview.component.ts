import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import stopData from '../../../assets/data/stop.json'
import stopDirectionData from '../../../assets/data/stopDirection.json';

@Component({
  selector: 'app-route-preview',
  templateUrl: './route-preview.component.html',
  styleUrl: './route-preview.component.scss'
})
export class RoutePreviewComponent {
  @Input() interchange: any;
  @Input() stop: any;
  routeNextData: any;
  routePreviewData: any;
  @Output() stopClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    this.routeNextData = this.getRouteNextData(this.stop);
    this.routePreviewData = null;
    this.setRoutePreviewData();
  }

  getStopName(code) {
    return stopData.find((item) => {
      return item.stopId === code;
    }).stopName;
  }

  getRouteNextData(stopId) {
    return stopDirectionData[this.interchange.corridorId].find((stop) => {
      return stop.stopName === stopId;
    })
  }

  setRoutePreviewData() {
    this.routePreviewData = {
      "currentStop": this.stop,
      "corridorColor": this.interchange.corridorColor,
      "nextUpperStop": this.routeNextData.stopNextUp,
      "nextLowerStop": this.routeNextData.stopNextLow,
      "terminusUpperStop": this.interchange.corridorUpperBound,
      "terminusLowerStop": this.interchange.corridorLowerBound,
      "isUpperTerminus": this.checkIsTerminus(this.interchange.corridorUpperBound, this.stop),
      "isLowerTerminus": this.checkIsTerminus(this.interchange.corridorLowerBound, this.stop),
      "isNextAfterUpperTerminus": this.checkIsNextAfterTerminus(this.interchange.corridorUpperBound, this.routeNextData.stopNextUp),
      "isNextAfterLowerTerminus": this.checkIsNextAfterTerminus(this.interchange.corridorLowerBound, this.routeNextData.stopNextLow),
      "isNextTwoAfterUpperTerminus": this.checkIsNextTwoAfterTerminus(this.interchange.corridorUpperBound, this.routeNextData.stopNextUp, 'up'),
      "isNextTwoAfterLowerTerminus": this.checkIsNextTwoAfterTerminus(this.interchange.corridorLowerBound, this.routeNextData.stopNextLow, 'low'),
    }
  }

  checkIsTerminus(terminus, current) {
    return (terminus === current) ? true : false;
  }

  checkIsNextAfterTerminus(terminus, next) {
    return (terminus === next) ? true : false;
  }

  checkIsNextTwoAfterTerminus(terminus, next, direction) {
    if(next === null) {
      return false;
    } else {
      let nextStopData = this.getRouteNextData(next);
      let nextStopDataByDirection = (direction === 'up') ? nextStopData.stopNextUp : nextStopData.stopNextLow;
      return (terminus === nextStopDataByDirection) ? true : false;
    }
  }

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
