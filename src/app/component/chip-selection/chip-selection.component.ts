import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip-selection',
  templateUrl: './chip-selection.component.html',
  styleUrl: './chip-selection.component.scss'
})
export class ChipSelectionComponent {
  homeFilters = ['All', 'BRT', 'MRT', 'LRT', 'KRL'];
  searchFilters = ['Corridor', 'Stop'];
  // selectedFilter: any = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'Corridor', 'Stop'];
  @Output() filterClick = new EventEmitter<any>();
  @Input() selectedFilter: any;

  selectFilter(filter: any) {
    if(this.selectedFilter.find((selectedFilter) => selectedFilter === filter) === undefined) {
      this.addFilter(filter);
    } else {
      this.removeFilter(filter);
    }
    this.filterClick.emit(this.selectedFilter);
  }

  addFilter(filter: any) {
    if(filter === 'All') {
      this.homeFilters.forEach((homeFilter) => {
        if(homeFilter !== 'All' && !this.selectedFilter.includes(homeFilter)) {
          this.addFilter(homeFilter);
        } else if(!this.selectedFilter.includes(homeFilter)) {
          this.selectedFilter = [...this.selectedFilter, filter];
          this.toggleChipStyle('active', filter);
        }
      })
    } else if(filter === 'justAll') {
      this.selectedFilter = [...this.selectedFilter, 'All'];
      this.toggleChipStyle('active', 'All');
    } else {
      this.selectedFilter = [...this.selectedFilter, filter];
      this.toggleChipStyle('active', filter);
      if(this.isAllHomeFilterActive()) {
        this.addFilter('justAll');
      }
    }
  }

  isAllHomeFilterActive() {
    return this.selectedFilter.includes('BRT') && this.selectedFilter.includes('MRT') && this.selectedFilter.includes('LRT') && this.selectedFilter.includes('KRL');
  }

  removeFilter(filter: any) {
    if(filter === 'All') {
      this.homeFilters.forEach((homeFilter) => {
        if(homeFilter !== 'All') {
          this.removeFilter(homeFilter);
        } else {
          this.selectedFilter = this.selectedFilter.filter((selectedFilter) => selectedFilter !== filter);
          this.toggleChipStyle('inactive', filter);
        }
      })
    } else if(filter === 'justAll') {
      this.selectedFilter = this.selectedFilter.filter((selectedFilter) => selectedFilter !== 'All');
      this.toggleChipStyle('inactive', 'All');
    } else {
      this.selectedFilter = this.selectedFilter.filter((selectedFilter) => selectedFilter !== filter);
      this.toggleChipStyle('inactive', filter);
      if(this.isOneHomeFilterInactive(filter)) {
        this.removeFilter('justAll');
      }
    }
  }

  isOneHomeFilterInactive(filter: any) {
    return filter === 'BRT' || filter === 'MRT' || filter === 'LRT' || filter === 'KRL';
  }

  toggleChipStyle(state: string, filter: string) {
    let classList = Array.from(document.getElementById('chip-filter' + filter)?.classList);
    let isExist = classList.find((className: any) => className === 'chip-filter-active');
    switch(state) {
      case 'active':
        if(isExist === undefined) {
          document.getElementById('chip-filter' + filter)?.classList.remove('chip-filter');
          document.getElementById('chip-filter' + filter)?.classList.add('chip-filter-active');
        }
        break;
      case 'inactive':
        if(isExist !== undefined) {
          document.getElementById('chip-filter' + filter)?.classList.add('chip-filter');
          document.getElementById('chip-filter' + filter)?.classList.remove('chip-filter-active');
        }
        break;
    }
  }
}