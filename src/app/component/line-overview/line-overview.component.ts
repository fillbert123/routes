import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import stopData from '../../../assets/data/stop.json'

@Component({
  selector: 'app-line-overview',
  templateUrl: './line-overview.component.html',
  styleUrl: './line-overview.component.scss'
})
export class LineOverviewComponent {
  @Input() bound: string;
  @Input() data: any;
  terminus: string;
  lineOverviewData: any;
  @Output() stopClick = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges) {
    this.terminus = null;
    this.lineOverviewData = null;
    this.setTerminus();
    this.setLineOverviewData();

    console.log('current', this.data.currentStop);
  }

  getStopName(code) {
    return stopData.find((item) => {
      return item.stopId === code;
    }).stopName;
  }

  setTerminus() {
    if(this.bound === 'up') {
      this.terminus = this.data.terminusUpperStop;
    } else if(this.bound === 'low') {
      this.terminus = this.data.terminusLowerStop;
    }
  }

  getCorridorColor(color: string) {
    return `var(--${color})`;
  }

  setLineOverviewData() {
    this.lineOverviewData = {
      "currentStop": this.data.currentStop,
      "corridorColor": this.data.corridorColor,
      "stopData": this.getStopData(),
      "trackStyleData": this.getTrackStyleData(),
      "trackColorData": this.getTrackColorData(),
      "trackStyleColorData": this.getTrackStyleColorData(),
      'trackInformationData': this.getTrackInformationData()
    }
  }

  getTrackInformationData() {
    let stopStatus = this.getStopStatus();
    let tempInformationData = [];
    if(stopStatus !== 'u-cur-lt' && stopStatus !== 'l-bef-lt') {
      tempInformationData.push('empty');
    }
    if(this.bound === 'low') {
      tempInformationData.push('backward');
    } else {
      tempInformationData.push('forward');
    }
    if(stopStatus !== 'l-cur-ut' && stopStatus !== 'u-bef-ut') {
      tempInformationData.push('empty');
    }
    return tempInformationData;
  }

  getStopData() {
    let stopStatus = this.getStopStatus();
    let tempStopData = [];
    tempStopData = this.setStopData(tempStopData, this.data.terminusLowerStop, this.data.corridorColor, stopStatus, 'lower-terminus');
    if(stopStatus === 'l-cur-ut' || stopStatus === 'l-aft-ut' || stopStatus === 'l-strd' || stopStatus === 'l-two-bef-lt') {
      tempStopData = this.setStopData(tempStopData, this.data.nextLowerStop, this.data.corridorColor, stopStatus);
    }
    if(stopStatus !== 'l-cur-ut' && stopStatus !== 'u-cur-lt' && stopStatus !== 'l-cur-ut-aft-lt' && stopStatus !== 'u-cur-lt-aft-ut') {
      tempStopData = this.setStopData(tempStopData, this.data.currentStop, this.data.corridorColor, stopStatus);
    }
    if(stopStatus === 'u-cur-lt' || stopStatus === 'u-aft-lt' || stopStatus === 'u-strd' || stopStatus === 'u-two-bef-ut') {
      tempStopData = this.setStopData(tempStopData, this.data.nextUpperStop, this.data.corridorColor, stopStatus);
    }
    tempStopData = this.setStopData(tempStopData, this.data.terminusUpperStop, this.data.corridorColor, stopStatus, 'upper-terminus');
    return tempStopData;
  }

  setStopData(currentData, name, color, stopStatus, stopPosition?) {
    let data;
    if(stopPosition && stopPosition === 'lower-terminus' && (stopStatus === 'u-strd' || stopStatus === 'u-aft-lt' || stopStatus === 'u-bef-ut' || stopStatus === 'u-two-bef-ut')) {
      data = {
        'name': name,
        'color': 'grey'
      }
    } else if(stopPosition && stopPosition === 'upper-terminus' && (stopStatus === 'l-strd' || stopStatus === 'l-bef-lt' || stopStatus === 'l-aft-ut' || stopStatus === 'l-two-bef-lt')) {
      data = {
        'name': name,
        'color': 'grey'
      }
    } else {
      data = {
        'name': name,
        'color': color
      }
    }
    currentData.push(data);
    return currentData;
  }

  getTrackStyleColorData() {
    let trackStyleData = this.getTrackStyleData();
    let trackColorData = this.getTrackColorData();
    let trackStyleColorData = [];
    for(let i = 0; i < trackStyleData.length; i++) {
      let data = {
        'style': trackStyleData[i],
        'color': trackColorData[i]
      }
      trackStyleColorData.push(data);
    }
    return trackStyleColorData;
  }

  getTrackStyleData() {
    let stopStatus = this.getStopStatus();
    let tempTrackStyle = [];
    if(stopStatus === 'u-cur-lt' || stopStatus === 'u-cur-lt-aft-ut') {
      tempTrackStyle.push('arrow-u');
    } else if(stopStatus === 'u-aft-lt' || stopStatus === 'l-two-bef-lt') {
      tempTrackStyle.push('solid');
    } else if(stopStatus === 'l-bef-lt' || stopStatus === 'l-cur-ut-aft-lt') {
      tempTrackStyle.push('arrow-l');
    } else {
      tempTrackStyle.push('dashed');
    }
    if(stopStatus === 'u-cur-lt' || stopStatus === 'l-bef-lt') {
      tempTrackStyle.push('dashed');
    } else if(stopStatus === 'u-strd' || stopStatus === 'u-aft-lt' || stopStatus === 'u-bef-ut' || stopStatus === 'u-two-bef-ut') {
      tempTrackStyle.push('arrow-u');
    } else if(stopStatus !== 'u-cur-lt-aft-ut' && stopStatus !== 'l-cur-ut-aft-lt') {
      tempTrackStyle.push('arrow-l');
    }
    if(stopStatus === 'l-aft-ut' || stopStatus === 'u-two-bef-ut') {
      tempTrackStyle.push('solid');
    } else if(stopStatus === 'u-strd' || stopStatus === 'l-strd' || stopStatus === 'u-aft-lt' || stopStatus === 'l-two-bef-lt') {
      if(this.data.currentStop === 'STP019' && this.bound === 'low') {
        tempTrackStyle.push('solid');
      } else {
        tempTrackStyle.push('dashed');
      }
    }
    return tempTrackStyle;
  }

  getTrackColorData() {
    let stopStatus = this.getStopStatus();
    let tempTrackColor = [];
    if(stopStatus === 'u-strd' || stopStatus === 'u-aft-lt' || stopStatus === 'u-bef-ut' || stopStatus === 'u-two-bef-ut') {
      tempTrackColor.push('grey');
    }
    tempTrackColor.push('color');
    if(stopStatus !== 'u-bef-ut' && stopStatus !== 'l-bef-lt' && stopStatus !== 'l-cur-ut-aft-lt' && stopStatus !== 'u-cur-lt-aft-ut') {
      tempTrackColor.push('color');
    }
    if(stopStatus === 'l-strd' || stopStatus === 'l-bef-lt' || stopStatus === 'l-aft-ut' || stopStatus === 'l-two-bef-lt') {
      tempTrackColor.push('grey');
    }
    return tempTrackColor;
  }

  getStopStatus() {
    if(this.data.isUpperTerminus && this.data.isNextAfterLowerTerminus) {
      return 'l-cur-ut-aft-lt';
    } else if(this.data.isUpperTerminus) {
      return 'l-cur-ut';
    } else if(this.data.isLowerTerminus && this.data.isNextAfterUpperTerminus) {
      return 'u-cur-lt-aft-ut';
    } else if(this.data.isLowerTerminus) {
      return 'u-cur-lt';
    } else if(this.data.isNextAfterUpperTerminus && this.bound === 'up') {
      return 'u-bef-ut';
    } else if(this.data.isNextAfterUpperTerminus && this.bound === 'low') {
      return 'l-aft-ut';
    } else if(this.data.isNextAfterLowerTerminus && this.bound === 'up') {
      return 'u-aft-lt';
    } else if(this.data.isNextAfterLowerTerminus && this.bound === 'low') {
      return 'l-bef-lt';
    } else if(this.data.isNextTwoAfterUpperTerminus && this.bound === 'up') {
      return 'u-two-bef-ut';
    } else if(this.data.isNextTwoAfterLowerTerminus && this.bound === 'low') {
      return 'l-two-bef-lt';
    } else if(this.bound === 'up') {
      return 'u-strd';
    } else if(this.bound === 'low') {
      return 'l-strd';
    }
    return null;
  }

  handleStopClick(stop: any) {
    this.stopClick.emit(stop);
  }
}
