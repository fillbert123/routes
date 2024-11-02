import { Component, Input } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json';

@Component({
  selector: 'app-stop-detail',
  templateUrl: './stop-detail.component.html',
  styleUrl: './stop-detail.component.scss'
})
export class StopDetailComponent {
  @Input() selectedStop: any;
  selectedStopInterchange: any = [];
  selectedStopInterchangeData: any = [];

  ngOnInit() {
    if(this.selectedStop.stopNameRefer) {
      this.selectedStopInterchange = this.getStopInterchange(this.selectedStop.stopNameRefer).stopInterchange;
    } else {
      this.selectedStopInterchange = this.getStopInterchange(this.selectedStop.stopName).stopInterchange;
    }
    this.setStopInterchangeData(this.selectedStopInterchange);
  }

  getStopInterchange(stopName: string) {
    return stopData.find((stop) => {
      return stop.stopName === stopName;
    })
  }

  setStopInterchangeData(stopInterchange: any) {
    stopInterchange.forEach((interchange) => {
      let interchangeCorridorData = corridorData.find((corridor) => {
        return corridor.corridorLookUp === interchange;
      })
      this.selectedStopInterchangeData.push(interchangeCorridorData);
    })
  }
}
