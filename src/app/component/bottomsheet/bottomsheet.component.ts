import { Component, Input } from '@angular/core';
import { getCorridorBusStopList } from '../../service/firebase.service';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrl: './bottomsheet.component.scss'
})
export class BottomsheetComponent {
  @Input() corridorList: any;
  selectedCorridor: any;
  bottomSheetTitle: any = 'Koridor Transjakarta'

  async selectCorridor(selectedCorridor: any) {
    this.selectedCorridor = selectedCorridor;
    this.bottomSheetTitle = selectedCorridor.corridorName;
    let corridorBusStopList = await getCorridorBusStopList(this.selectedCorridor.corridorName);
    console.log('corridorBusStopList', corridorBusStopList);
    console.log('selectedCorridor', this.selectedCorridor);
  }
}
