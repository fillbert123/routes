import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() selectedCorridor = new EventEmitter<any>();

  handleListItemClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }
}
