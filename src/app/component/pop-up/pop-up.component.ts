import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent {
  filterSelectionList: any = [
    {
      'name': 'Any',
      'code': 'All'
    },
    {
      'name': 'Transjakarta BRT',
      'code': 'BRT'
    },
    {
      'name': 'MRT Jakarta',
      'code': 'MRT'
    },
    {
      'name': 'LRT Jakarta & Jabodebek',
      'code': 'LRT'
    },
    {
      'name': 'KRL Commuter',
      'code': 'KRL'
    },
    {
      'name': 'Transjabodetabek',
      'code': 'TJB'
    },
  ];
  isFirstAttempt: boolean = true;

  @Input() type: string;
  @Input() selectedFilter: string;
  
  @Output() filterSelect = new EventEmitter<any>();
  @Output() outsideClick = new EventEmitter<any>();

  handleFilterClick(code) {
    this.selectedFilter = code;
    this.filterSelect.emit(code);
  }

  handleOutsideClick() {
    if(this.isFirstAttempt) {
      this.isFirstAttempt = false;
    } else {
      this.outsideClick.emit();
    }
  }
}
