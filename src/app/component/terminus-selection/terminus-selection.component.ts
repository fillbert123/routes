import { Component, EventEmitter, Input, Output } from '@angular/core';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-terminus-selection',
  templateUrl: './terminus-selection.component.html',
  styleUrl: './terminus-selection.component.scss'
})
export class TerminusSelectionComponent {
  @Input() terminusLower: any;
  @Input() terminusUpper: any;
  @Output() directionClick = new EventEmitter<any>();
  direction: any;

  ngOnInit() {
    this.direction = 'upper';
  }

  handleDirectionClick(direction: string) {
    this.direction = direction;
    this.directionClick.emit(direction);
  }

  getStopName(code, shorten = false) {
    let stop = stopData.find((item) => {
      return item.stopId === code;
    });
    if(shorten) {
      return (stop.stopNameShorten) ? stop.stopNameShorten : stop.stopName;
    } else {
      return stop.stopName;
    }
  }
}
