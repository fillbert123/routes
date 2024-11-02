import { Component, Input } from '@angular/core';
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
    this.routeNextData = this.getRouteNextData();
    this.setRoutePreviewData()
  }

  getRouteNextData() {
    return stopDirectionData[this.interchange.corridorLookUp].find((stop) => {
      return stop.stopName === this.stop.stopName;
    })
  }

  setRoutePreviewData() {
    this.routePreviewData = {
      "currentStop": this.stop.stopName,
      "corridorColor": this.interchange.corridorColor,
      "nextUpperStop": this.routeNextData.stopNextUp,
      "nextLowerStop": this.routeNextData.stopNextLow,
      "terminusUpperStopShorten": this.interchange.corridorUpperBoundShorten,
      "terminusUpperStop": this.interchange.corridorUpperBound,
      "terminusLowerStopShorten": this.interchange.corridorLowerBoundShorten,
      "terminusLowerStop": this.interchange.corridorLowerBound,
      "isUpperTerminus": this.checkIsTerminus(this.interchange.corridorUpperBound, this.stop.stopName),
      "isLowerTerminus": this.checkIsTerminus(this.interchange.corridorLowerBound, this.stop.stopName),
      "isNextAfterUpperTerminus": this.checkIsNextAfterTerminus(this.interchange.corridorUpperBound, this.routeNextData.stopNextUp),
      "isNextAfterLowerTerminus": this.checkIsNextAfterTerminus(this.interchange.corridorLowerBound, this.routeNextData.stopNextLow)
    }
  }

  checkIsTerminus(terminus, current) {
    return (terminus === current) ? true : false;
  }

  checkIsNextAfterTerminus(terminus, next) {
    return (terminus === next) ? true : false;
  }
}
