import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss'
})
export class BottomsheetComponent {
  @Input() corridorList: any;
  @Input() busStopDetailList: any;
}
