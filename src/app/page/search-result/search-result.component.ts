import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  @Input() query: string = '';
  @Output() selectedCorridor = new EventEmitter<any>();
  corridorSearchResult: any = [];
  stopSearchResult: any = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.corridorSearchResult = this.searchCorridorByQuery(this.query);
      this.stopSearchResult = this.searchStopByQuery(this.query);
    }
  }

  searchCorridorByQuery(query: any) {
    return corridorData.filter((corridor) => (
      corridor.corridorType.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorName.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorLowerBound.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorUpperBound.toLowerCase().includes(query.toLowerCase()) ||
      corridor?.corridorVia?.toLowerCase().includes(query.toLowerCase())
    ));
  }

  searchStopByQuery(query: any) {
    return stopData.filter((stop) => (
      stop.stopName.toLowerCase().includes(query.toLowerCase())
    ));
  }

  handleListItemClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }
}
