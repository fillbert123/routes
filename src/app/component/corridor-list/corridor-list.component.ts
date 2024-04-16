import { Component, Input, OnInit } from '@angular/core';

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
}
