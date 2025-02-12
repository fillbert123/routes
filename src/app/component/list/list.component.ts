import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopDirectionData from '../../../assets/data/stopDirection.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../animation.component.scss']
})

export class ListComponent {
  // @Input() direction: string;
  @Input() listType: any;
  @Input() searchResult: any;
  @Input() track: any;
  @Input() color: string;
  @Input() terminusUpper: string;
  @Input() terminusLower: string;
  @Output() selectedCorridor = new EventEmitter<any>();
  @Output() selectedStop = new EventEmitter<any>();
  list: any;
  upperBoundTrack: any;
  lowerBoundTrack: any;

  //redesigned
  @Input() type: string;
  @Input() item: string;
  @Input() direction: string;
  itemList: any;
  @Input() corridor: string;
  @Output() itemClick = new EventEmitter<any>();
  @Input() searchResultList: any;
  @Input() listTitle: string = null;

  ngOnInit() {
    // this.setList();
    this.setItemList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // this.setList();
    this.setListTitle();
    this.setItemList();
  }

  setListTitle() {
    if(!this.listTitle) {
      this.listTitle = this.item;
    }
  }

  setItemList() {
    switch(this.item) {
      case 'brt':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'BRT');
        break;
      case 'mrt':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'MRT');
        break;
      case 'lrt':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'LRT');
        break;
      case 'krl':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'KRL');
        break;
      case 'track':
        let track = stopDirectionData[this.corridor];
        let lowerBound = this.getCorridorLowerBound(this.corridor);
        let upperBound = this.getCorridorUpperBound(this.corridor);
        switch(this.direction) {
          case 'lower':
            this.itemList = this.setLowerBoundTrack(track, upperBound);
            break;
          default:
            this.itemList = this.setUpperBoundTrack(track, lowerBound);
            break;
        }
        break;
      default:
        this.itemList = this.item;
        break;
    }
  }

  getCorridorLowerBound(code) {
    return corridorData.find((item) => {
      return item.corridorId === code;
    }).corridorLowerBound;
  }

  getCorridorUpperBound(code) {
    return corridorData.find((item) => {
      return item.corridorId === code;
    }).corridorUpperBound;
  }

  handleItemClick(id) {
    this.itemClick.emit(id);
  }

  setList() {
    if(this.listType && this.searchResult) {
      this.list = this.searchResult;
    } else if(this.listType) {
      switch(this.listType) {
        case ListType.MRT:
          this.list = corridorData.filter((corridor) => corridor.corridorType === 'MRT');
          break;
        case ListType.LRT:
          this.list = corridorData.filter((corridor) => corridor.corridorType === 'LRT');
          break;
        case ListType.BRT:
          this.list = corridorData.filter((corridor) => corridor.corridorType === 'BRT');
          break;
        case ListType.KRL:
          this.list = corridorData.filter((corridor) => corridor.corridorType === 'KRL');
          break;
        case ListType.TRACK:
          switch(this.direction) {
            case DirectionType.LOWER:
              this.list = this.setLowerBoundTrack(this.track, this.terminusUpper);
              break;
            case DirectionType.UPPER:
              this.list = this.setUpperBoundTrack(this.track, this.terminusLower);
              break;
            default:
              this.list = this.setUpperBoundTrack(this.track, this.terminusLower);
              break;
          }
          break;
      }
    }
  }

  setUpperBoundTrack(list: any, terminusLower: any) {
    const upperBoundList = [];
    let currentStop = list.find((stop: any) => stop.stopName == terminusLower);
    while(currentStop) {
      upperBoundList.push(currentStop);
      currentStop = list.find((stop: any) => stop.stopName == currentStop.stopNextUp);
    }
    return upperBoundList;
  }

  setLowerBoundTrack(list: any, terminusUpper: any) {
    const lowerBoundList = [];
    let currentStop = list.find((stop: any) => stop.stopName == terminusUpper);
    while(currentStop) {
      lowerBoundList.push(currentStop);
      currentStop = list.find((stop: any) => stop.stopName == currentStop.stopNextLow);
    }
    return lowerBoundList;
  }

  handleListCorridorClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }

  handleListStopClick(stop: any) {
    this.selectedStop.emit(stop);
  }
}

enum ListType {
  MRT = 'mrt',
  LRT = 'lrt',
  BRT = 'brt',
  KRL = 'krl',
  TRACK = 'track'
}

enum DirectionType {
  LOWER = 'lower',
  UPPER = 'upper'
}