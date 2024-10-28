import { Component, Input } from '@angular/core';

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

  ngOnInit() {
    this.setTerminus();
    this.setLineOverviewData();
  }

  setTerminus() {
    if(this.bound === 'up') {
      this.terminus = this.data.terminusUpperStopShorten;
    } else if(this.bound === 'low') {
      this.terminus = this.data.terminusLowerStopShorten;
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
    if(stopStatus !== 'l-term' && stopStatus !== 'aft-l-term-l') {
      tempInformationData.push('empty');
    }
    if(this.bound === 'low') {
      tempInformationData.push('backward');
    } else {
      tempInformationData.push('forward');
    }
    if(stopStatus !== 'u-term' && stopStatus !== 'aft-u-term-u') {
      tempInformationData.push('empty');
    }
    return tempInformationData;
  }

  getStopData() {
    let stopStatus = this.getStopStatus();
    let tempStopData = [];
    tempStopData = this.setStopData(tempStopData, this.data.terminusLowerStop, this.data.corridorColor, stopStatus, 'lower-terminus');
    if(stopStatus === 'u-term' || stopStatus === 'aft-u-term-l' || stopStatus === 'bidr-l') {
      tempStopData = this.setStopData(tempStopData, this.data.nextLowerStop, this.data.corridorColor, stopStatus);
    }
    if(stopStatus !== 'u-term' && stopStatus !== 'l-term') {
      tempStopData = this.setStopData(tempStopData, this.data.currentStop, this.data.corridorColor, stopStatus);
    }
    if(stopStatus === 'l-term' || stopStatus === 'aft-l-term-u' || stopStatus === 'bidr-u') {
      tempStopData = this.setStopData(tempStopData, this.data.nextUpperStop, this.data.corridorColor, stopStatus);
    }
    tempStopData = this.setStopData(tempStopData, this.data.terminusUpperStop, this.data.corridorColor, stopStatus, 'upper-terminus');
    return tempStopData;
  }

  setStopData(currentData, name, color, stopStatus, stopPosition?) {
    let data;
    if(stopPosition && stopPosition === 'lower-terminus' && (stopStatus === 'bidr-u' || stopStatus === 'aft-l-term-u' || stopStatus === 'aft-u-term-u')) {
      data = {
        'name': name,
        'color': 'grey'
      }
    } else if(stopPosition && stopPosition === 'upper-terminus' && (stopStatus === 'bidr-l' || stopStatus === 'aft-l-term-l' || stopStatus === 'aft-u-term-l')) {
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
    if(stopStatus === 'l-term') {
      tempTrackStyle.push('arrow-u');
    } else if(stopStatus === 'aft-l-term-u') {
      tempTrackStyle.push('solid');
    } else if(stopStatus === 'aft-l-term-l') {
      tempTrackStyle.push('arrow-l');
    } else {
      tempTrackStyle.push('dashed');
    }
    if(stopStatus === 'l-term' || stopStatus === 'aft-l-term-l') {
      tempTrackStyle.push('dashed');
    } else if(stopStatus === 'bidr-u' || stopStatus === 'aft-l-term-u' || stopStatus === 'aft-u-term-u') {
      tempTrackStyle.push('arrow-u');
    } else {
      tempTrackStyle.push('arrow-l');
    }
    if(stopStatus === 'aft-u-term-l') {
      tempTrackStyle.push('solid');
    } else if(stopStatus === 'bidr-u' || stopStatus === 'bidr-l' || stopStatus === 'aft-l-term-u') {
      tempTrackStyle.push('dashed');
    }
    return tempTrackStyle;
  }

  getTrackColorData() {
    let stopStatus = this.getStopStatus();
    let tempTrackColor = [];
    if(stopStatus === 'bidr-u' || stopStatus === 'aft-l-term-u' || stopStatus === 'aft-u-term-u') {
      tempTrackColor.push('grey');
    }
    tempTrackColor.push('color');
    if(stopStatus !== 'aft-u-term-u' && stopStatus !== 'aft-l-term-l') {
      tempTrackColor.push('color');
    }
    if(stopStatus === 'bidr-l' || stopStatus === 'aft-l-term-l' || stopStatus === 'aft-u-term-l') {
      tempTrackColor.push('grey');
    }
    return tempTrackColor;
  }

  getStopStatus() {
    if(this.data.isUpperTerminus) {
      return 'u-term';
    } else if(this.data.isLowerTerminus) {
      return 'l-term';
    } else if(this.data.isNextAfterUpperTerminus && this.bound === 'up') {
      return 'aft-u-term-u';
    } else if(this.data.isNextAfterUpperTerminus && this.bound === 'low') {
      return 'aft-u-term-l';
    } else if(this.data.isNextAfterLowerTerminus && this.bound === 'up') {
      return 'aft-l-term-u';
    } else if(this.data.isNextAfterLowerTerminus && this.bound === 'low') {
      return 'aft-l-term-l';
    } else if(this.bound === 'up') {
      return 'bidr-u';
    } else if(this.bound === 'low') {
      return 'bidr-l';
    }
    return null;
  }
}
