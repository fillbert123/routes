import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-zoom-control',
  templateUrl: './zoom-control.component.html',
  styleUrl: './zoom-control.component.scss'
})
export class ZoomControlComponent {
  @Output() zoomChange = new EventEmitter<any>();
  maxZoomLevel: number = 5;
  minZoomLevel: number = 1;
  zoomLevel: number = 1;
  zoomIncremental: number = 0.5;

  zoomIn() {
    if(this.zoomLevel <= this.maxZoomLevel - this.zoomIncremental) {
      this.zoomLevel += this.zoomIncremental;
      this.handleZoomChange(this.zoomLevel);
    } else if(this.zoomLevel < this.maxZoomLevel && this.zoomLevel > this.maxZoomLevel - this.zoomIncremental) {
      this.zoomLevel = this.maxZoomLevel;
      this.handleZoomChange(this.zoomLevel);
    }
  }

  zoomOut() {
    if(this.zoomLevel >= this.minZoomLevel + this.zoomIncremental) {
      this.zoomLevel -= this.zoomIncremental;
      this.handleZoomChange(this.zoomLevel);
    } else if(this.zoomLevel > this.minZoomLevel && this.zoomLevel < this.minZoomLevel + this.zoomIncremental) {
      this.zoomLevel = this.minZoomLevel;
      this.handleZoomChange(this.zoomLevel);
    }
  }

  handleZoomChange(event) {
    this.zoomChange.emit(event);
  }
}
