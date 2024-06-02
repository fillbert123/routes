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
  @Input() terminusLower: any;
  @Input() terminusUpper: any;

  selectedCorridorData: any;
  presentedList: any;
  upperBound: any;
  lowerBound: any;

  async ngOnChanges() {
    this.selectedCorridorData = await this.getSelectedCorridorData(this.selectedCorridor.corridorName);
    console.log(this.selectedCorridorData);
    console.log(this.selectedDirection);
    console.log('Selected corridor', this.selectedCorridorData)
    this.upperBound = this.upperBoundLine(this.selectedCorridorData, this.terminusLower);
    console.log('Upper bound', this.upperBound);
    this.lowerBound = this.lowerBoundLine(this.selectedCorridorData, this.terminusUpper);
    console.log('Lower bound', this.lowerBound);
    this.presentedList = (this.selectedDirection == 'lower') ? this.lowerBound : this.upperBound;
  }

  async getSelectedCorridorData(corridorName: any) {
    const selectedCorridorData = await getCorridorBusStopList(corridorName);
    return selectedCorridorData;
  }

  upperBoundLine(selectedCorridorData: any, terminusLower: any) {
    const upperBoundList = [];
    let currentStop = selectedCorridorData.find((stop: any) => stop.busStopId == terminusLower);
    while(currentStop) {
      upperBoundList.push(currentStop.busStopId);
      currentStop = selectedCorridorData.find((stop: any) => stop.busStopId == currentStop.busStopNextUp);
    }
    return upperBoundList;
  }

  lowerBoundLine(selectedCorridorData: any, terminusUpper: any) {
    const lowerBoundList = [];
    let currentStop = selectedCorridorData.find((stop: any) => stop.busStopId == terminusUpper);
    while(currentStop) {
      lowerBoundList.push(currentStop.busStopId);
      currentStop = selectedCorridorData.find((stop: any) => stop.busStopId == currentStop.busStopNextLow);
    }
    return lowerBoundList;
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }
}
