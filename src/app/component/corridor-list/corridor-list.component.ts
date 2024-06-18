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
  @Input() corList: any;
  @Input() busCorList: any;
  @Output() clickedCor = new EventEmitter<any>();
  @Output() clickedBusCor = new EventEmitter<{selCor: any, selDir: any}>();

  emitCorClick(selCor: any) {
    this.clickedCor.emit(selCor);
  }

  emitBusCorClick(selCor: any, selDir: any) {
    this.clickedBusCor.emit({selCor, selDir});
  }
}
