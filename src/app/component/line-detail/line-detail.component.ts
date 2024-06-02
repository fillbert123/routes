import { Component, Input } from '@angular/core';
import { getCorridorBusStopList } from '../../service/firebase.service';

@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrl: './line-detail.component.scss'
})
export class LineDetailComponent {
  @Input() corridorColor: any;
  @Input() selectedCorridor: any;
  @Input() selectedDirection: any;
  @Input() selectedCorridorBusStopList: any;
  @Input() terminusLower: any;
  @Input() terminusUpper: any;

  presentedList: any;
  upperBound: any;
  lowerBound: any;

  ngOnChanges() {
    this.selectedCorridorBusStopList;
    console.log(this.selectedCorridorBusStopList);
    console.log(this.selectedDirection);
    console.log('Selected corridor', this.selectedCorridorBusStopList)
    this.upperBound = this.upperBoundLine(this.selectedCorridorBusStopList, this.terminusLower);
    console.log('Upper bound', this.upperBound);
    this.lowerBound = this.lowerBoundLine(this.selectedCorridorBusStopList, this.terminusUpper);
    console.log('Lower bound', this.lowerBound);
    this.presentedList = (this.selectedDirection == 'lower') ? this.lowerBound : this.upperBound;
  }

  upperBoundLine(selectedCorridorBusStopList: any, terminusLower: any) {
    const upperBoundList = [];
    let currentStop = selectedCorridorBusStopList.find((stop: any) => stop.busStopId == terminusLower);
    while(currentStop) {
      upperBoundList.push(currentStop.busStopId);
      currentStop = selectedCorridorBusStopList.find((stop: any) => stop.busStopId == currentStop.busStopNextUp);
    }
    return upperBoundList;
  }

  lowerBoundLine(selectedCorridorBusStopList: any, terminusUpper: any) {
    const lowerBoundList = [];
    let currentStop = selectedCorridorBusStopList.find((stop: any) => stop.busStopId == terminusUpper);
    while(currentStop) {
      lowerBoundList.push(currentStop.busStopId);
      currentStop = selectedCorridorBusStopList.find((stop: any) => stop.busStopId == currentStop.busStopNextLow);
    }
    return lowerBoundList;
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }
}
