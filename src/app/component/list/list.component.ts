import { Component, Input } from '@angular/core';
import corridorData from '../../../assets/data/corridor.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../animation.component.scss']
})

export class ListComponent {
  @Input() listType: any;
  @Input() isCollapsed!: any;
  corridorList: any;

  ngOnInit() {
    switch(this.listType) {
      case ListType.MRT:
        this.corridorList = corridorData.filter((corridor) => corridor.corridorType === 'MRT');
        break;
      case ListType.LRT:
        this.corridorList = corridorData.filter((corridor) => corridor.corridorType === 'LRT');
        break;
      case ListType.BRT:
        this.corridorList = corridorData.filter((corridor) => corridor.corridorType === 'BRT');
        break;
      case ListType.KRL:
        this.corridorList = corridorData.filter((corridor) => corridor.corridorType === 'KRL');
        break;
    }
  }
}

enum ListType {
  MRT = 'mrt',
  LRT = 'lrt',
  BRT = 'brt',
  KRL = 'krl'
}
