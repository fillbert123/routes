import { Component, Input } from '@angular/core';
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

  ngOnInit() {
    this.routeNextData = this.getRouteNextData(this.stop);
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
    console.log('route preview data', this.routePreviewData);
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
      let nextStopData = (direction === 'up') ? this.getRouteNextData(next).stopNextUp : this.getRouteNextData(next).stopNextLow;
      return (terminus === nextStopData) ? true : false;
    }
  }
}
