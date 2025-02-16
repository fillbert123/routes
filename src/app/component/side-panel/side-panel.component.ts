import { Component } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss', '../animation.component.scss']
})
export class SidePanelComponent {
  isCollapsed: boolean = false;
  query: string = '';
  // selectedCorridor: any = null;
  // selectedStop: any = null;

  //redesigned
  currentPage: any = 'home';
  selectedCorridor: string = null;
  selectedStop: string = null;
  isSearching: boolean = false;
  selectedFilter: any;

  ngOnInit() {
    this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'Corridor', 'Stop'];
  }

  handleItemClick(id) {
    switch(this.currentPage) {
      case 'home':
        this.selectedCorridor = id;
        this.currentPage = 'corridorDetail';
        break;
      case 'corridorDetail':
        this.selectedStop = id;
        this.currentPage = 'stopDetail';
        break;
    }
  } 

  toggleSidePanelCollapseExpand() {
    this.isCollapsed = !this.isCollapsed;
    (this.isCollapsed) ? this.collapseSidePanel() : this.expandSidePanel();
  }

  collapseSidePanel() {
    let elementByClassName: any;
    document.getElementById('side-panel__content')?.classList.add('side-panel__content-collapse');
    document.getElementById('side-panel__content')?.classList.remove('side-panel__content-expand');
    elementByClassName = document.getElementsByClassName('list__content');
    [...elementByClassName].forEach((element: any) => {
      element?.classList.add('list__content-collapse');
      element?.classList.remove('list__content-expand');
    });
    elementByClassName = document.getElementsByClassName('list-item__info');
    [...elementByClassName].forEach((element: any) => {
      element?.classList.add('list-item__info-collapse');
      element?.classList.remove('list-item__info-expand');
    });
    document.getElementById('command-bar__button-back')?.classList.add('command-bar__button-back-collapse');
    document.getElementById('command-bar__button-back')?.classList.remove('command-bar__button-back-expand');
    document.getElementById('command-bar__search')?.classList.add('command-bar__search-collapse');
    document.getElementById('command-bar__search')?.classList.remove('command-bar__search-expand');
  }

  expandSidePanel() {
    let elementByClassName: any;
    document.getElementById('side-panel__content')?.classList.add('side-panel__content-expand');
    document.getElementById('side-panel__content')?.classList.remove('side-panel__content-collapse');
    elementByClassName = document.getElementsByClassName('list__content');
    [...elementByClassName].forEach((element: any) => {
      element?.classList.add('list__content-expand');
      element?.classList.remove('list__content-collapse');
    });
    elementByClassName = document.getElementsByClassName('list-item__info');
    [...elementByClassName].forEach((element: any) => {
      element?.classList.add('list-item__info-expand');
      element?.classList.remove('list-item__info-collapse');
    });
    document.getElementById('command-bar__button-back')?.classList.add('command-bar__button-back-expand');
    document.getElementById('command-bar__button-back')?.classList.remove('command-bar__button-back-collapse');
    document.getElementById('command-bar__search')?.classList.add('command-bar__search-expand');
    document.getElementById('command-bar__search')?.classList.remove('command-bar__search-collapse');
  }

  setQuery(query) {
    this.query = query;
    if(this.query !== '') {
      this.isSearching = true;
    } else {
      this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'Corridor', 'Stop'];
      this.isSearching = false;
    }
  }

  handleListCorridorClick(corridor: any) {
    this.selectedCorridor = corridor;
    this.selectedStop = null;
  }

  handleListStopClick(stop: any) {
    this.selectedStop = stop;
  }

  handleBackButtonClick() {
    this.currentPage = 'home';
    this.query = '';
    this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'Corridor', 'Stop'];
    this.isSearching = false;
  }

  handleSearchButtonClick() {
    this.currentPage = 'home';
  }

  handleFilterClick(event) {
    this.selectedFilter = event;
  }
}