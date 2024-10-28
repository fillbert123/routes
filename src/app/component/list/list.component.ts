import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../animation.component.scss']
})

export class ListComponent {
  @Input() direction: string;
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

  ngOnInit() {
    this.setList();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setList();
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