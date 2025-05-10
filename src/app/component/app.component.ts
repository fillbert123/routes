import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { isMobile } from '../shared/methods';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../../styles.scss',
    './app.component.scss'
  ]
})
export class AppComponent {
  title = 'reykjavik';
  items: any[] = [];
  busStop: any;
  corridorList: any[] = [];
  busStopDetailList: any[] = [];
  busStopList: any[] = [];
  isMobile: boolean = false;

  //redesigned
  selectedStopId: string = null;
  selectedLine: string = null;
  zoomLevel: number = 1;

  handleClickObject(id) {
    this.selectedStopId = '';
    setTimeout(() => {
      this.selectedStopId = id;
    })
  }

  handleClickLine(line) {
    this.selectedLine = '';
    setTimeout(() => {
      this.selectedLine = line;
    })
  }

  handleZoomChange(event) {
    this.zoomLevel = event;
  }

  ngOnInit(): void {
    if(isMobile()) {
      this.setMobileStyle();
      this.isMobile = true;
    }
  }

  setMobileStyle() {
    document.getElementById('app__panel').classList.add('app__panel-mobile');
  }
}
