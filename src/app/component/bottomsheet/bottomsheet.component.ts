import { Component } from '@angular/core';
import { getCorridorBusStopList, getCorridorList, getBusStopDetail } from '../../service/firebase.service';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss'
})
export class BottomsheetComponent {
  bottomSheetTitle: any;
  currentState: string = 'main';

  corList: any;
  corBusList: any;
  selCor: any;
  selCorDir: any;
  busCorList: any;
  selBus: any;
  trkBusList: any;
  selTrk: any;
  selTrkDir: any;

  ngOnInit() {
    this.getCorList();
    this.bottomSheetTitle = 'Koridor Transjakarta';
    this.currentState = 'main';
  }

  selectDirection(selDir: any) {
    if(this.currentState === 'corDetail') {
      this.selCorDir = selDir;
    }
    else if(this.currentState === 'trkDetail') {
      this.selTrkDir = selDir;
    }
  }

  isShowCorList() {
    if(this.currentState === 'main') {
      return true;
    }
    return false;
  }

  isShowBusList() {
    if(this.currentState === 'corDetail') {
      return true;
    }
    return false;
  }

  isShowTrkList() {
    if(this.currentState === 'trkDetail') {
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
  
  isShowCorIcon() {
    if((this.selCor && this.isShowBusList()) || (this.selBus && this.currentState === 'busDetail') || (this.selTrk && this.currentState === 'trkDetail')) {
      return true;
    }
    return false;
  }

  isShowTerminusSelection() {
    if((this.selCor && this.isShowBusList()) || (this.selTrk && this.isShowTrkList())) {
      return true;
    }
    return false;
  }

  isShowBusCorList() {
    if(this.currentState === 'busDetail') {
      return true;
    }
    return false;
  }

  goNext(nextState: string, nextData: any) {
    this.currentState = nextState;
    switch(nextState) {
      case 'corDetail':
        this.selCor = nextData;
        this.bottomSheetTitle = nextData.corridorName;
        this.getCorBusList();
        this.selCorDir = 'upper';
        break;
      case 'busDetail':
        this.selBus = nextData;
        this.bottomSheetTitle = nextData;
        this.getBusCorList();
        break;
      case 'trkDetail':
        this.selTrk = nextData.selCor;
        this.selTrkDir = nextData.selDir;
        this.getTrkBusList()
        break;
    }
  }

  async getCorList() {
    this.corList = await getCorridorList();
  }

  async getCorBusList() {
    this.corBusList = await getCorridorBusStopList(this.selCor.corridorName);
  }

  async getBusCorList() {
    this.busCorList = await getBusStopDetail(this.selBus);
    this.appendCorDetail();
  }

  async getTrkBusList() {
    this.trkBusList = await getCorridorBusStopList(this.selTrk.corridorId)
  }

  appendCorDetail() {
    this.busCorList.forEach((corridor: any) => {
      var searchResultCorridor = this.corList.find((searchCorridor: any) => {
        return corridor.corridorId === searchCorridor.corridorName
      })
      corridor.corridorTerminusLower = searchResultCorridor.corridorTerminusLower;
      corridor.corridorTerminusUpper = searchResultCorridor.corridorTerminusUpper;
    })
  }

  goBack() {
    this.currentState = 'main';
    this.bottomSheetTitle = 'Koridor Transjakarta';
    this.selCorDir = null;
    this.selTrkDir = null;
  }
}
