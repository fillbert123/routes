import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  corridorSearchResult: any = [];
  stopSearchResult: any = [];

  @Input() query: string = '';
  @Input() selectedFilter: any;

  @Output() itemClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    this.corridorSearchResult = this.searchCorridorByQuery(this.query);
    this.stopSearchResult = this.searchStopByQuery(this.query);
  }

  searchCorridorByQuery(query: any) {
    let searchResult = corridorData.filter((corridor) => (
      corridor.corridorType.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorName.toLowerCase().includes(query.toLowerCase())
    ));
    let filterResult;
    if(this.selectedFilter !== 'All') {
      filterResult = searchResult.filter((corridor) => {
        return corridor.corridorType === this.selectedFilter;
      })
    } else {
      filterResult = searchResult;
    }
    return filterResult;
  }

  searchStopByQuery(query: any) {
    let searchResult = stopData.filter((stop) => (
      stop.stopName.toLowerCase().includes(query.toLowerCase())
    ));
    let filterResult;
    if(this.selectedFilter !== 'All') {
      filterResult = searchResult.filter((stop) => {
        return this.selectedFilter.includes(stop.stopType.toUpperCase());
      })
    } else {
      filterResult = searchResult;
    }
    return filterResult;
  }

  handleItemClick(item: any) {
    this.itemClick.emit(item);
  }
}
