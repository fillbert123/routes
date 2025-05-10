import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopDirectionData from '../../../assets/data/stopDirection.json';
import { FirebaseService } from '../../service/firebase.service';
import { getDataFromDatabaseByKey } from '../../shared/methods';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../animation.component.scss']
})

export class ListComponent {
  constructor(private firebaseService: FirebaseService) {}

  itemList: any;

  @Input() corridor: string;
  @Input() direction: string;
  @Input() item: string;
  @Input() listTitle: string = null;
  @Input() searchResultList: any;
  @Input() type: string;

  @Output() itemClick = new EventEmitter<any>();

  ngOnInit() {
    this.setItemList();
    // getDataFromFirebase('corridor', this.firebaseService);
  }

  ngOnChanges(changes: SimpleChanges) {
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
        // getDataFromDatabaseByKey('corridorType', 'MRT', 'corridor',  this.firebaseService);
        break;
      case 'lrt':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'LRT');
        break;
      case 'krl':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'KRL');
        break;
      case 'tjb':
        this.itemList = corridorData.filter((corridor) => corridor.corridorType === 'TJB');
        break;
      case 'track':
        let track = stopDirectionData.filter((stopDirection) => {
          return stopDirection.stopCorridor === this.corridor;
        });
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
}

enum ListType {
  MRT = 'mrt',
  LRT = 'lrt',
  BRT = 'brt',
  KRL = 'krl',
  TJB = 'tjb',
  TRACK = 'track'
}

enum DirectionType {
  LOWER = 'lower',
  UPPER = 'upper'
}