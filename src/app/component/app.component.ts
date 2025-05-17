import { Component, Inject, PLATFORM_ID } from '@angular/core';
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
  isMobile: boolean = false;
  selectedLine: string = null;
  selectedStopId: string = null;
  zoomLevel: number = 1;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
    if(isMobile(this.platformId)) {
      this.setMobileStyle();
      this.isMobile = true;
    }
  }

  setMobileStyle() {
    document.getElementById('app__panel').classList.add('app__panel-mobile');
  }
}
