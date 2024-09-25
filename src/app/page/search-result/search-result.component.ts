import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  @Input() query: string = '';
  @Output() selectedCorridor = new EventEmitter<any>();
  searchResult: any = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['query']) {
      this.searchResult = this.searchByQuery(this.query);
    }
  }

  searchByQuery(query: any) {
    return corridorData.filter((corridor) => (
      corridor.corridorType.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorName.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorLowerBound.toLowerCase().includes(query.toLowerCase()) ||
      corridor.corridorUpperBound.toLowerCase().includes(query.toLowerCase()) ||
      corridor?.corridorVia?.toLowerCase().includes(query.toLowerCase())
    ));
  }

  handleListItemClick(corridor: any) {
    this.selectedCorridor.emit(corridor);
  }
}
