import { Component, EventEmitter, Input, Output } from '@angular/core';
import stopDirectionData from '../../../assets/data/stopDirection.json';

@Component({
  selector: 'app-corridor-detail',
  templateUrl: './corridor-detail.component.html',
  styleUrl: './corridor-detail.component.scss'
})
export class CorridorDetailComponent {
  @Input() selectedCorridor: any;
  @Output() selectedStop = new EventEmitter<any>();
  direction: string;
  track: any;

  ngOnInit() {
    this.getRoute();
  }

  setSelectedDirection(direction: string) {
    this.direction = direction;
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  getRoute() {
    this.track = stopDirectionData[this.selectedCorridor.corridorLookUp];
  }

  handleListStopClick(stop: string) {
    this.selectedStop.emit(stop);
  }
}
