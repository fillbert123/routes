import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-overview',
  templateUrl: './track-overview.component.html',
  styleUrls: ['./track-overview.component.scss', '../animation.component.scss']
})
export class TrackOverviewComponent {
  @Input() data: any;

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
    if(this.data.trackStyleColorData.length === 3) {
      return '84px';
    } else if(this.data.trackStyleColorData.length === 2) {
      return '144px';
    } else {
      return null;
    }
  }

  getNumberOfTrackShown() {
    return this.data.trackStyleColorData.length;
  }
}
