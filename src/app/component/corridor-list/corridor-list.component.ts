import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getCorridorBusStopList } from '../../service/firebase.service';

@Component({
  selector: 'app-corridor-list',
  templateUrl: './corridor-list.component.html',
  styleUrls: [
    '../../../styles.scss',
    './corridor-list.component.scss'
  ]
})

export class CorridorListComponent {
  @Input() corridorList: any;
  @Input() busStopDetailList: any;
  @Output() clickedCorridorName = new EventEmitter<any>();

  // async test(corridorName: any) {
  //   console.log(corridorName);
  //   const data = await getCorridorBusStopList(corridorName);
  //   console.log(data);
  // }

  emitCorridorClick(selectedCorridor: any) {
    this.clickedCorridorName.emit(selectedCorridor);
  }
}
