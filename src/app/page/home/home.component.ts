import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() itemClick = new EventEmitter<any>();
  
  corridorCategoryList = [
    {
      'item': 'brt',
      'title': 'Transjakarta BRT'
    },
    {
      'item': 'mrt',
      'title': 'MRT Jakarta'
    },
    {
      'item': 'lrt',
      'title': 'LRT Jakarta & Jabodebek'
    },
    {
      'item': 'krl',
      'title': 'KRL Commuter'
    },
    {
      'item': 'tjb',
      'title': 'Transjabodetabek'
    },
  ];

  handleItemClick(id) {
    this.itemClick.emit(id);
  }
}
