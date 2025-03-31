import { Component, EventEmitter, NgModule, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss', '../animation.component.scss']
})
export class CommandBarComponent {
  inputValue: string = '';
  @Output() queryChange = new EventEmitter<any>();
  @Output() backButtonClick = new EventEmitter<any>();
  @Output() searchButtonClick = new EventEmitter<any>();
  @Output() clearButtonClick = new EventEmitter<any>();
  @Input() currentPage: any;
  @Input() isSearching: boolean;
  @Output() filterClick = new EventEmitter<any>();
  @Input() selectedFilter: any;

  ngOnInit() {
    this.stylizeBackButton();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylizeBackButton();
  }

  stylizeBackButton() {
    if(this.currentPage === 'home' && !this.isSearching) {
      document.getElementById('command-bar__button-back')?.classList.add('command-bar__control__button-disabled');
      document.getElementById('command-bar__button-back')?.classList.remove('command-bar__control__button');
    } else {
      document.getElementById('command-bar__button-back')?.classList.add('command-bar__control__button');
      document.getElementById('command-bar__button-back')?.classList.remove('command-bar__control__button-disabled');
    }
  }

  handleQueryChange(event) {
    this.queryChange.emit(event);
  }

  handleBackButtonClick() {
    this.inputValue = '';
    this.backButtonClick.emit();
  }

  handleSearchButtonClick() {
    // this.searchButtonClick.emit();
  }

  handleClearButtonClick() {
    this.clearButtonClick.emit();
  }

  handleFilterClick(event) {
    this.filterClick.emit(event);
  }
}
