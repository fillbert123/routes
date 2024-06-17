import { Component } from '@angular/core';
import { getCorridorBusStopList, getCorridorList, getBusStopDetail } from '../../service/firebase.service';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss'
})
export class BottomsheetComponent {
  corridorList: any;
  selectedCorridor: any;
  selectedDirection: any;
  bottomSheetTitle: any;
  currentState: string = 'main';
  selectedCorridorBusStopList: any;
  selectedBusStopDetail: any;
  selectedBusStopCorridorList: any;
  selectedCorridorBusStopTrack: any;

  ngOnInit() {
    this.getCorridorList();
    this.bottomSheetTitle = 'Koridor Transjakarta';
    this.currentState = 'main';
  }

  selectDirection(selectedDirection: any) {
    this.selectedDirection = selectedDirection;
    console.log('selectedDirection', this.selectedDirection);
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

  isShowTerminusSelection() {
    if(this.selectedCorridor && this.isShowLineDetail()) {
      return true;
    }
    return false;
  }

  isShowSelectedBusStopCorridorList() {
    if(this.currentState === 'busStopDetail') {
      return true;
    }
    return false;
  }

  goNext(nextState: string, nextData: any) {
    this.currentState = nextState;
    switch(nextState) {
      case 'corridorDetail':
        this.selectedCorridor = nextData;
        console.log('selectedCorridor', this.selectedCorridor);
        this.bottomSheetTitle = nextData.corridorName;
        this.setSelectedCorridorBusStopList();
        this.selectedDirection = 'upper';
        break;
      case 'busStopDetail':
        this.selectedBusStopDetail = nextData;
        this.bottomSheetTitle = nextData;
        this.getBusStopDetail();
        break;
      case 'busStopCorridorDetail':
        this.selectedCorridorBusStopTrack = nextData;
        console.log('selectedCorridorBusStopTrack', this.selectedCorridorBusStopTrack);
        this.setSelectedCorridorBusStopTrackList()
        break;
    }
  }

  async getCorridorList() {
    this.corridorList = await getCorridorList();
  }

  async setSelectedCorridorBusStopList() {
    this.selectedCorridorBusStopList = await getCorridorBusStopList(this.selectedCorridor.corridorName);
  }

  async getBusStopDetail() {
    this.selectedBusStopCorridorList = await getBusStopDetail(this.selectedBusStopDetail);
    this.appendCorridorDetail();
  }

  async setSelectedCorridorBusStopTrackList() {

  }

  appendCorridorDetail() {
    this.selectedBusStopCorridorList.forEach((corridor: any) => {
      var searchResultCorridor = this.corridorList.find((searchCorridor: any) => {
        return corridor.corridorId === searchCorridor.corridorName
      })
      corridor.corridorTerminusLower = searchResultCorridor.corridorTerminusLower;
      corridor.corridorTerminusUpper = searchResultCorridor.corridorTerminusUpper;
    })
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
        break;
      case 'busStopCorridorDetail':
        this.currentState = 'main';
        this.bottomSheetTitle = 'Koridor Transjakarta';
        break;
    }
  }
}
