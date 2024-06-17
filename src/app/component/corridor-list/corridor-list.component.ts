import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() busStopCorridorList: any;
  @Input() busStopDetailList: any;
  @Output() clickedCorridorName = new EventEmitter<any>();

  ngOnInit() {
    console.log('corridorList', this.corridorList)
    console.log('busStopCorridorList', this.busStopCorridorList);
  }

  emitCorridorClick(selectedCorridor: any) {
    this.clickedCorridorName.emit(selectedCorridor);
  }
}
