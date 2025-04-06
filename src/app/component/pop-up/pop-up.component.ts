import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() type: string;
  selectedFilter: number = 0;
  filterSelectionList: any = [
    {
      'id': 0,
      'name': 'Any'
    },
    {
      'id': 1,
      'name': 'Transjakarta BRT'
    },
    {
      'id': 2,
      'name': 'MRT Jakarta'
    },
    {
      'id': 3,
      'name': 'LRT Jakarta & Jabodebek'
    },
    {
      'id': 4,
      'name': 'KRL Commuter'
    },
    {
      'id': 5,
      'name': 'Transjabodetabek'
    },
  ];

  handleFilterClick(id) {
    this.selectedFilter = id;
  }
}
