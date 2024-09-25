import { Component, Input } from '@angular/core';
import stopData from '../../../assets/data/stop.json';

@Component({
  selector: 'app-corridor-detail',
  templateUrl: './corridor-detail.component.html',
  styleUrl: './corridor-detail.component.scss'
})
export class CorridorDetailComponent {
  @Input() selectedCorridor: any;
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
    this.track = stopData[this.selectedCorridor.corridorLookUp];
  }

  handleListItemClick(stop: string) {

  }
}
