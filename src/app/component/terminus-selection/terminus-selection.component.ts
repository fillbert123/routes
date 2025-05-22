import { Component, EventEmitter, Input, Output, Inject, PLATFORM_ID } from '@angular/core';
import stopData from '../../../assets/data/stop.json'
import { isMobile } from '../../shared/methods';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-terminus-selection',
  templateUrl: './terminus-selection.component.html',
  styleUrl: './terminus-selection.component.scss'
})
export class TerminusSelectionComponent {
  buttonWidth: number;
  direction: any;

  @Input() terminusLower: any;
  @Input() terminusUpper: any;

  @Output() directionClick = new EventEmitter<any>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.direction = 'upper';
    this.buttonWidth = this.getButtonWidth();
  }

  handleDirectionClick(direction: string) {
    this.direction = direction;
    this.directionClick.emit(direction);
  }

  getButtonWidth() {
    if(!isPlatformBrowser(this.platformId)) {return 0;}
    if(isMobile(this.platformId)) {
      let windowWidth = window.innerWidth;
      return (windowWidth - 36)/2;
    }
    return 186;
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
