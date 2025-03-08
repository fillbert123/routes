import { Component, Output, EventEmitter } from '@angular/core';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-system-map',
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.scss'
})
export class SystemMapComponent {
  selectedStopName: string;
  selectedStopType: string;
  selectedStopCode: string;
  selectedLineType: string;
  selectedLineCode: string;
  @Output() clickObject = new EventEmitter<any>();
  @Output() clickLine = new EventEmitter<any>();

  handleClickObject(stop: string) {
    let splittedStop = stop.split('-');
    this.selectedStopType = splittedStop[0];
    for(let i = 1; i < splittedStop.length; i++) {
      if(i === 1) {
        this.selectedStopName = splittedStop[i];
      } else {
        this.selectedStopName = this.selectedStopName + ' ' + splittedStop[i];
      }
    }
    this.selectedStopCode = this.getStopId(this.selectedStopName.toLowerCase(), this.selectedStopType.toLowerCase());
    this.clickObject.emit(this.selectedStopCode);
  }

  handleClickLine(line: string) {
    this.clickLine.emit(line);
  }

  getStopId(name, type) {
    return stopData.find((item) => {
      return item.stopType === type && item.stopName.toLowerCase() === name;
    }).stopId;
  }
}
