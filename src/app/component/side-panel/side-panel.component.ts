import { Component, Input, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { isMobile } from '../../shared/methods';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss', '../animation.component.scss']
})
export class SidePanelComponent {
  currentPage: any = 'home';
  isCollapsed: boolean = false;
  isSearching: boolean = false;
  isShowFilterPane: boolean = false;
  query: string = '';
  selectedCorridor: string = null;
  selectedFilter: string = 'All';
  selectedStop: string = null;

  @Input() selectedId: string;
  @Input() selectedLine: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.selectedFilter = 'All';
    if(isMobile(this.platformId)) {
      this.setMobileStyle();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.selectedId && changes['selectedId']) {
      this.selectedStop = this.selectedId;
      this.currentPage = 'stopDetail';
      this.isSearching = false;
    }
    if(this.selectedLine && changes['selectedLine']) {
      this.currentPage = 'corridorSelection';
      this.isSearching = false;
    }
    this.isShowFilterPane = false;
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
    this.isShowFilterPane = false;
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
    this.isShowFilterPane = false;
  } 

  handleOutsideClick() {
    if(this.isShowFilterPane) {
      this.isShowFilterPane = false;
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
  }

  handleBackButtonClick() {
    this.currentPage = 'home';
    this.query = '';
    this.selectedFilter = 'All';
    this.isSearching = false;
    this.isShowFilterPane = false;
  }

  handleSearchButtonClick(query) {
    this.currentPage = 'home';
    this.query = query;
    this.isShowFilterPane = false;
    if(this.query !== '') {
      this.isSearching = true;
    } else {
      this.isSearching = false
    }
  }

  handleFilterClick(event) {
    this.selectedFilter = event;
  }

  handleStopClick(stop: any) {
    this.currentPage = 'stopDetail';
    this.selectedStop = stop;
    this.isShowFilterPane = false;
  }

  handleFilterButtonClick() {
    this.isShowFilterPane = !this.isShowFilterPane;
  }

  handleFilterSelect(filter) {
    this.selectedFilter = filter;
  }
}