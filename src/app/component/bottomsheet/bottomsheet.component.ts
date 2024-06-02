import { Component, Input } from '@angular/core';
import { getCorridorBusStopList } from '../../service/firebase.service';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss'
})
export class BottomsheetComponent {
  @Input() corridorList: any;
  selectedCorridor: any;
  selectedDirection: any;
  bottomSheetTitle: any = 'Koridor Transjakarta';
  currentState: string = 'main';
  selectedCorridorBusStopList: any;
  selectedBusStopDetail: any;

  async selectCorridor(selectedCorridor: any) {
    this.selectedCorridor = selectedCorridor;
    this.bottomSheetTitle = selectedCorridor.corridorName;
    this.selectedCorridorBusStopList = await getCorridorBusStopList(this.selectedCorridor.corridorName);
    this.currentState = 'corridorDetail';
    this.selectedDirection = 'upper';
    console.log('corridorBusStopList', this.selectedCorridorBusStopList);
    console.log('selectedCorridor', this.selectedCorridor);
  }

  selectDirection(selectedDirection: any) {
    this.selectedDirection = selectedDirection;
    console.log('selectedDirection', this.selectedDirection);
  }

  selectBusStopDetail(selectedBusStopDetail: any) {
    this.selectedBusStopDetail = selectedBusStopDetail;
    this.bottomSheetTitle = selectedBusStopDetail[0].busStopId;
    this.currentState = 'busStopDetail';
    console.log('selected bus stop detail', this.selectedBusStopDetail);
  }

  isShowCorridorList() {
    if(this.currentState === 'main') {
      return true;
    }
    return false;
  }

  isShowLineDetail() {
    if(this.currentState === 'corridorDetail') {
      return true;
    }
    return false;
  }

  isShowBackButton() {
    if(this.currentState === 'main') {
      return false;
    }
    return true;
  }
  
  isShowCorridorIcon() {
    if((this.selectedCorridor && this.isShowLineDetail()) || (this.selectedBusStopDetail && this.currentState === 'busStopDetail')) {
      return true;
    }
    return false;
  }

  goBack() {
    switch(this.currentState) {
      case 'corridorDetail': 
        this.currentState = 'main';
        this.bottomSheetTitle = 'Koridor Transjakarta';
        break;
      case 'busStopDetail':
        this.currentState = 'main';
        this.bottomSheetTitle = 'Koridor Transjakarta';
    }
  }
}
