import { Component, EventEmitter, Input, Output, SimpleChanges, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss', '../animation.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class CommandBarComponent {
  inputValue: string = '';
  query: string = '';

  @Input() currentPage: any;
  @Input() isSearching: boolean;
  @Input() selectedFilter: any;

  @Output() backButtonClick = new EventEmitter<any>();
  @Output() filterButtonClick = new EventEmitter<any>();
  @Output() searchButtonClick = new EventEmitter<any>();
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.stylizeBackButton();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.stylizeBackButton();
    this.stylizeSearchButton();
  }

  stylizeBackButton() {
    if(!isPlatformBrowser(this.platformId)) {return;}
    if(this.currentPage === 'home' && !this.isSearching) {
      document.getElementById('command-bar__button-back')?.classList.add('command-bar__control__button-disabled');
      document.getElementById('command-bar__button-back')?.classList.remove('command-bar__control__button');
    } else {
      document.getElementById('command-bar__button-back')?.classList.add('command-bar__control__button');
      document.getElementById('command-bar__button-back')?.classList.remove('command-bar__control__button-disabled');
    }
  }

  stylizeSearchButton() {
    if(!isPlatformBrowser(this.platformId)) {return;}
    if(this.inputValue !== '') {
      document.getElementById('command-bar__button-search')?.classList.add('command-bar__control__button');
      document.getElementById('command-bar__button-search')?.classList.remove('command-bar__control__button-disabled');
    } else {
      document.getElementById('command-bar__button-search')?.classList.add('command-bar__control__button-disabled');
      document.getElementById('command-bar__button-search')?.classList.remove('command-bar__control__button');
    }
  }

  handleBackButtonClick() {
    this.inputValue = '';
    this.backButtonClick.emit();
  }

  handleFilterButtonClick() {
    this.filterButtonClick.emit();
  }

  handleSearchButtonClick() {
    if(this.inputValue !== '') {
      this.query = this.inputValue;
      this.searchButtonClick.emit(this.inputValue);
    }
  }
}
