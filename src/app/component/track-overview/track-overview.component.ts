import { Component, Input, Output, EventEmitter } from '@angular/core';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-track-overview',
  templateUrl: './track-overview.component.html',
  styleUrls: ['./track-overview.component.scss', '../animation.component.scss']
})
export class TrackOverviewComponent {
  @Input() data: any;
  @Output() stopClick = new EventEmitter<any>();

  getStopName(code) {
    return stopData.find((item) => {
      return item.stopId === code;
    }).stopName;
  }

  getTrackColor(color: string) {
    if(color === 'color') {
      return `var(--${this.data.corridorColor})`;
    }
    return `var(--${color})`;
  }

  getTrackStyle(style: string) {
    if(style === 'dashed') {
      return 'dotted';
    }
    return 'solid';
  }

  getTrackLength() {
    return (window.innerWidth - 144) / this.data.trackStyleColorData.length + 'px';
  }

  getNumberOfTrackShown() {
    return this.data.trackStyleColorData.length;
  }

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
