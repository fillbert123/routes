import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reykjavik';
  items: any[] = [];
  busStop: any;
  corridorList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getCorridorList();
    // this.getItemsFromFirebase();
    // this.getItemFromFirebase();
    // this.pushItemToFirebase();
    // this.updateItemOnFirebase();
    // this.deleteItemFromFirebase();
    // this.addStopDetailToFirebase();
  }

  getCorridorList() {
    this.firebaseService.getCorridorList().subscribe((data) => {
      this.corridorList = data.map((corridor: any) => {
        return {
          id: corridor.payload.doc.id, ...(corridor.payload.doc.data() as object)
        };
      });
    });
  }

  getCorridorColor(color: string) {
    return `var(--${color})`
  }

  addStopDetailToFirebase() {
    const stopDetailId = ['SDT001', 'SDT002', 'SDT003', 'SDT004', 'SDT005', 'SDT006', 'SDT007', 'SDT008', 'SDT009', 'SDT010', 'SDT011', 'SDT012', 'SDT013', 'SDT014', 'SDT015', 'SDT016', 'SDT017', 'SDT018', 'SDT019', 'SDT020', 'SDT021', 'SDT022'];
    const stopDetailData = [
      {busStopId :'STP001', busStopDirection :'SDR02', busStopCode :'01-01', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP002', busStopNextLow :'null'},
      {busStopId :'STP002', busStopDirection :'SDR01', busStopCode :'01-02', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP003', busStopNextLow :'STP001'},
      {busStopId :'STP003', busStopDirection :'SDR01', busStopCode :'01-03', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP004', busStopNextLow :'STP002'},
      {busStopId :'STP004', busStopDirection :'SDR01', busStopCode :'01-04', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP005', busStopNextLow :'STP003'},
      {busStopId :'STP005', busStopDirection :'SDR01', busStopCode :'01-05', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP006', busStopNextLow :'STP004'},
      {busStopId :'STP006', busStopDirection :'SDR01', busStopCode :'01-06', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP007', busStopNextLow :'STP005'},
      {busStopId :'STP007', busStopDirection :'SDR01', busStopCode :'01-07', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP008', busStopNextLow :'STP006'},
      {busStopId :'STP008', busStopDirection :'SDR01', busStopCode :'01-08', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP009', busStopNextLow :'STP007'},
      {busStopId :'STP009', busStopDirection :'SDR01', busStopCode :'01-09', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP010', busStopNextLow :'STP008'},
      {busStopId :'STP010', busStopDirection :'SDR01', busStopCode :'01-10', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP011', busStopNextLow :'STP009'},
      {busStopId :'STP011', busStopDirection :'SDR01', busStopCode :'01-11', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP012', busStopNextLow :'STP010'},
      {busStopId :'STP012', busStopDirection :'SDR01', busStopCode :'01-12', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP013', busStopNextLow :'STP011'},
      {busStopId :'STP013', busStopDirection :'SDR01', busStopCode :'01-13', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP014', busStopNextLow :'STP012'},
      {busStopId :'STP014', busStopDirection :'SDR01', busStopCode :'01-14', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP015', busStopNextLow :'STP013'},
      {busStopId :'STP015', busStopDirection :'SDR01', busStopCode :'01-15', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP016', busStopNextLow :'STP014'},
      {busStopId :'STP016', busStopDirection :'SDR01', busStopCode :'01-16', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP017', busStopNextLow :'STP015'},
      {busStopId :'STP017', busStopDirection :'SDR01', busStopCode :'01-17', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP018', busStopNextLow :'STP016'},
      {busStopId :'STP018', busStopDirection :'SDR01', busStopCode :'01-18', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP019', busStopNextLow :'STP017'},
      {busStopId :'STP019', busStopDirection :'SDR01', busStopCode :'01-19', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP021', busStopNextLow :'STP018'},
      {busStopId :'STP020', busStopDirection :'SDR02', busStopCode :'01-20', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'null', busStopNextLow :'STP019'},
      {busStopId :'STP021', busStopDirection :'SDR12', busStopCode :'01-21', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP022', busStopNextLow :'null'},
      {busStopId :'STP022', busStopDirection :'SDR12', busStopCode :'01-22', corridorId :'COR001', busStopIsRapid :false, busStopNextUp :'STP020', busStopNextLow :'null'}];
    stopDetailId.map((stopDetailId, index) => {
      console.log(stopDetailId);
      console.log(stopDetailData[index]);
      this.firebaseService.addBusStopDetail(stopDetailId, stopDetailData[index])
        .then(() => {
          console.log(stopDetailId + ' added to firebase');
        })
        .catch((error) => {
          alert(error);
        }
      )
    })
  }

  deleteItemFromFirebase() {
    this.firebaseService.deleteBusStop('STP015')
      .then(() => {
        alert('deleted');
      })
      .catch((error) => {
        alert(error);
      }
    )
  }

  getItemFromFirebase() {
    this.firebaseService.getBusStop('STP005').subscribe((busStop) => {
      this.busStop = busStop.data();
      console.log(this.busStop.busStopName);
    });
  }

  getItemsFromFirebase() {
    this.firebaseService.getCorridorList().subscribe((data) => {
      this.items = data.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        };
      });
    });
  }

  pushItemToFirebase() {
    // const id = 'STP015';
    // const data = {
    //   busStopName: 'Ddslfjdlks'
    // }
    const corridorId = ['COR002', 'COR003', 'COR004', 'COR005', 'COR006', 'COR007', 'COR008', 'COR009', 'COR010', 'COR011', 'COR012', 'COR013', 'COR014', 'COR015', 'COR016', 'COR017', 'COR018', 'COR019', 'COR020', 'COR021', 'COR022', 'COR023', 'COR024', 'COR025', 'COR026', 'COR027', 'COR028', 'COR029', 'COR030'];
    const corridorData = [
      {corridorName: 'Koridor 2', corridorTerminusLower: 'SDT023', corridorTerminusUpper: 'SDT042', corridorType: 'CTY01'},
      {corridorName: 'Koridor 2A', corridorTerminusLower: 'SDT046', corridorTerminusUpper: 'SDT071', corridorType: 'CTY02'},
      {corridorName: 'Koridor 3', corridorTerminusLower: 'SDT072', corridorTerminusUpper: 'SDT085', corridorType: 'CTY01'},
      {corridorName: 'Koridor 3F', corridorTerminusLower: 'SDT086', corridorTerminusUpper: 'SDT102', corridorType: 'CTY02'},
      {corridorName: 'Koridor 4', corridorTerminusLower: 'SDT103', corridorTerminusUpper: 'SDT119', corridorType: 'CTY01'},
      {corridorName: 'Koridor 4D', corridorTerminusLower: 'SDT120', corridorTerminusUpper: 'SDT141', corridorType: 'CTY02'},
      {corridorName: 'Koridor 5', corridorTerminusLower: 'SDT142', corridorTerminusUpper: 'SDT160', corridorType: 'CTY01'},
      {corridorName: 'Koridor 5C', corridorTerminusLower: 'SDT161', corridorTerminusUpper: 'SDT187', corridorType: 'CTY02'},
      {corridorName: 'Koridor 5D', corridorTerminusLower: 'SDT188', corridorTerminusUpper: 'SDT214', corridorType: 'CTY02'},
      {corridorName: 'Koridor 6', corridorTerminusLower: 'SDT215', corridorTerminusUpper: 'SDT234', corridorType: 'CTY01'},
      {corridorName: 'Koridor 6A', corridorTerminusLower: 'SDT235', corridorTerminusUpper: 'SDT256', corridorType: 'CTY02'},
      {corridorName: 'Koridor 6B', corridorTerminusLower: 'SDT257', corridorTerminusUpper: 'SDT276', corridorType: 'CTY02'},
      {corridorName: 'Koridor 6V', corridorTerminusLower: 'SDT277', corridorTerminusUpper: 'SDT293', corridorType: 'CTY02'},
      {corridorName: 'Koridor 7', corridorTerminusLower: 'SDT294', corridorTerminusUpper: 'SDT308', corridorType: 'CTY01'},
      {corridorName: 'Koridor 7F', corridorTerminusLower: 'SDT309', corridorTerminusUpper: 'SDT331', corridorType: 'CTY02'},
      {corridorName: 'Koridor 8', corridorTerminusLower: 'SDT332', corridorTerminusUpper: 'SDT357', corridorType: 'CTY01'},
      {corridorName: 'Koridor 9', corridorTerminusLower: 'SDT358', corridorTerminusUpper: 'SDT383', corridorType: 'CTY01'},
      {corridorName: 'Koridor 9A', corridorTerminusLower: 'SDT384', corridorTerminusUpper: 'SDT405', corridorType: 'CTY02'},
      {corridorName: 'Koridor 9C', corridorTerminusLower: 'SDT406', corridorTerminusUpper: 'SDT421', corridorType: 'CTY02'},
      {corridorName: 'Koridor 10', corridorTerminusLower: 'SDT422', corridorTerminusUpper: 'SDT444', corridorType: 'CTY01'},
      {corridorName: 'Koridor 10D', corridorTerminusLower: 'SDT445', corridorTerminusUpper: 'SDT463', corridorType: 'CTY02'},
      {corridorName: 'Koridor 10H', corridorTerminusLower: 'SDT464', corridorTerminusUpper: 'SDT480', corridorType: 'CTY02'},
      {corridorName: 'Koridor 11', corridorTerminusLower: 'SDT481', corridorTerminusUpper: 'SDT496', corridorType: 'CTY01'},
      {corridorName: 'Koridor 12', corridorTerminusLower: 'SDT497', corridorTerminusUpper: 'SDT519', corridorType: 'CTY01'},
      {corridorName: 'Koridor 13', corridorTerminusLower: 'SDT520', corridorTerminusUpper: 'SDT534', corridorType: 'CTY01'},
      {corridorName: 'Koridor 13C', corridorTerminusLower: 'SDT535', corridorTerminusUpper: 'SDT555', corridorType: 'CTY02'},
      {corridorName: 'Koridor 13D', corridorTerminusLower: 'SDT556', corridorTerminusUpper: 'SDT579', corridorType: 'CTY02'},
      {corridorName: 'Koridor L13E', corridorTerminusLower: 'SDT580', corridorTerminusUpper: 'SDT594', corridorType: 'CTY03'},
      {corridorName: 'Koridor 14', corridorTerminusLower: 'SDT595', corridorTerminusUpper: 'SDT603', corridorType: 'CTY01'}
    ];
    corridorId.map((corid, index) => {
      console.log(corid);
      console.log(corridorData[index]);
      this.firebaseService.addCorridor(corid, corridorData[index])
        .then(() => {
          console.log(corid + ' added to firebase');
        })
        .catch((error) => {
          alert(error);
        }
      )
    })
    // this.firebaseService.addBusStop(id, data)
    //   .then(() => {
    //     alert('added');
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   })
  }

  updateItemOnFirebase() {
    const id = 'STP011';
    const data = [
      {
        busStopName: 'Bundaran HI'
      }
    ]
    this.firebaseService.updateBusStop(id, data)
      .then(() => {
        alert('updated');
      })
      .catch((error) => {
        alert(error);
      })
  }
}
