import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './service/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'reykjavik';
  items: any[] = [];
  busStop: any;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getItemsFromFirebase();
    // this.getItemFromFirebase();
    // this.pushItemToFirebase();
    // this.updateItemOnFirebase();
    // this.deleteItemFromFirebase();
  }

  deleteItemFromFirebase() {
    this.firebaseService.deleteBusStop('STP015')
      .then(() => {
        alert('deleted');
      })
      .catch((error) => {
        alert(error);
      })
  }

  getItemFromFirebase() {
    this.firebaseService.getBusStop('STP005').subscribe((busStop) => {
      this.busStop = busStop.data();
      console.log(this.busStop.busStopName);
    });
  }

  getItemsFromFirebase() {
    this.firebaseService.getBusStopList().subscribe((data) => {
      this.items = data.map((item: any) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as object)
        };
      });
    });
  }

  pushItemToFirebase() {
    const id = 'STP015';
    const data = {
      busStopName: 'Ddslfjdlks'
    }
    this.firebaseService.addBusStop(id, data)
      .then(() => {
        alert('added');
      })
      .catch((error) => {
        alert(error);
      })
  }

  updateItemOnFirebase() {
    const id = 'STP011';
    const data = {
      busStopName: 'Bundaran HI'
    }
    this.firebaseService.updateBusStop(id, data)
      .then(() => {
        alert('updated');
      })
      .catch((error) => {
        alert(error);
      })
  }
}
