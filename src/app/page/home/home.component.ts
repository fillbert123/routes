import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @Output() itemClick = new EventEmitter<any>();
  corridorCategoryList = ['brt', 'mrt', 'lrt', 'krl', 'tjb']

  handleItemClick(id) {
    this.itemClick.emit(id);
  }
}
