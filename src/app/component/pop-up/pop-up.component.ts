import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  @Input() type: string;
  @Output() filterSelect = new EventEmitter<any>();
  selectedFilter: string = 'All';
  filterSelectionList: any = [
    {
      'id': 0,
      'name': 'Any',
      'code': 'All'
    },
    {
      'id': 1,
      'name': 'Transjakarta BRT',
      'code': 'BRT'
    },
    {
      'id': 2,
      'name': 'MRT Jakarta',
      'code': 'MRT'
    },
    {
      'id': 3,
      'name': 'LRT Jakarta & Jabodebek',
      'code': 'LRT'
    },
    {
      'id': 4,
      'name': 'KRL Commuter',
      'code': 'KRL'
    },
    {
      'id': 5,
      'name': 'Transjabodetabek',
      'code': 'TJB'
    },
  ];

  handleFilterClick(code) {
    this.selectedFilter = code;
    this.filterSelect.emit(code);
  }
}
