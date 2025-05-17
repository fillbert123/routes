import { Component, Input, Output, EventEmitter, Inject, PLATFORM_ID } from '@angular/core';
import stopData from '../../../assets/data/stop.json'
import { isMobile } from '../../shared/methods';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-track-overview',
  templateUrl: './track-overview.component.html',
  styleUrls: ['./track-overview.component.scss', '../animation.component.scss']
})
export class TrackOverviewComponent {
  @Input() data: any;
  
  @Output() stopClick = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
    if(!isPlatformBrowser(this.platformId)) {return 0;}
    if(isMobile(this.platformId)) {
      return (window.innerWidth - 144) / this.data.trackStyleColorData.length + 'px';
    } else {
      if(this.data.trackStyleColorData.length === 3) {
        return '76px';
      } else if(this.data.trackStyleColorData.length === 2) {
        return '136px';
      } else if(this.data.trackStyleColorData.length === 1) {
        return '266px';
      } else {
        return null;
      }
    }
  }

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
