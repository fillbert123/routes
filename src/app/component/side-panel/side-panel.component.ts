import { Component, Input, SimpleChanges } from '@angular/core';
import { isMobile } from '../../shared/methods';

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
  @Input() selectedId: string;
  @Input() selectedLine: string;
  currentPage: any = 'home';
  selectedCorridor: string = null;
  selectedStop: string = null;
  isSearching: boolean = false;
  selectedFilter: any;
  isShowFilterPane: boolean = false;

  ngOnInit() {
    this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'TJB', 'Corridor', 'Stop'];
    if(isMobile()) {
      this.setMobileStyle();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedId && changes['selectedId']) {
      this.selectedStop = this.selectedId;
      this.currentPage = 'stopDetail';
    }
    if(this.selectedLine && changes['selectedLine']) {
      this.currentPage = 'corridorSelection';
    }
  }

  setMobileStyle() {
    document.getElementById('side-panel__content').classList.add('side-panel__content-mobile');
  }

  handleSearchItemClick(item: string) {
    this.isSearching = false;
    let itemType = (item.startsWith('STP') ? 'stop' : 'corridor');
    switch(itemType) {
      case 'stop':
        this.currentPage = 'stopDetail';
        this.selectedStop = item;
        break;
      case 'corridor':
        this.currentPage = 'corridorDetail';
        this.selectedCorridor = item;
        break;
    }
  }

  handleItemClick(id) {
    switch(this.currentPage) {
      case 'home':
      case 'corridorSelection':
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
    this.isShowFilterPane = false;
    if(this.query !== '') {
      this.isSearching = true;
    } else {
      this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'TJB', 'Corridor', 'Stop'];
      this.isSearching = false;
    }
  }

  handleListStopClick(stop: any) {
    this.selectedStop = stop;
  }

  handleBackButtonClick() {
    this.currentPage = 'home';
    this.query = '';
    this.selectedFilter = ['All', 'BRT', 'MRT', 'LRT', 'KRL', 'TJB', 'Corridor', 'Stop'];
    this.isSearching = false;
    this.isShowFilterPane = false;
  }

  handleSearchButtonClick() {
    this.currentPage = 'home';
  }

  handleFilterClick(event) {
    this.selectedFilter = event;
  }

  handleStopClick(stop: any) {
    this.currentPage = 'stopDetail';
    this.selectedStop = stop;
  }

  handleFilterButtonClick() {
    this.isShowFilterPane = !this.isShowFilterPane;
  }
}