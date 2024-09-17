import { Component } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

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

  isLoading: boolean = false;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getCorList();
    this.bottomSheetTitle = 'Jakarta';
    this.currentState = 'main';
  }

  isInStandaloneMode() {
    const isStandalone = (navigator as any).standalone === true;
    const isStandaloneDisplayMode = window.matchMedia('(display-mode: standalone)').matches;
    return isStandalone || isStandaloneDisplayMode;
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

  async getCorList(): Promise<void> {
    this.isLoading = true;
    try {
      this.corList = await this.firebaseService.getCorridorList();
    } catch(error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async getCorBusList(): Promise<void> {
    this.isLoading = true;
    try {
      this.corBusList = await this.firebaseService.getCorridorBusStopList(this.selCor.corridorName);
    } catch(error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async getBusCorList(): Promise<void> {
    this.isLoading = true;
    try {
      this.busCorList = await this.firebaseService.getBusStopDetail(this.selBus);
    } catch(error) {
      console.error(error);
    } finally {
      this.appendCorDetail();
      this.isLoading = false;
    }
  }

  async getTrkBusList(): Promise<void> {
    this.isLoading = true;
    try {
      this.trkBusList = await this.firebaseService.getCorridorBusStopList(this.selTrk.corridorId);
    } catch(error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
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
    this.bottomSheetTitle = 'Jakarta';
    this.selCorDir = null;
    this.selTrkDir = null;
  }
}
