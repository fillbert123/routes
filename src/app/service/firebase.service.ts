import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  addBusStop(id: string, data: any) {
    return this.firestore.collection('busStop').doc(id).set(data);
  }
  
  getBusStopList() {
    return this.firestore.collection('busStop').snapshotChanges();
  }

  getCorridorList() {
    return this.firestore.collection('corridor').snapshotChanges();
  }
  
  getBusStop(id: string) {
    return this.firestore.collection('busStop').doc(id).get();
  }
  
  updateBusStop(id: string, data: any) {
    return this.firestore.collection('busStop').doc(id).update(data);
  }
  
  deleteBusStop(id: string) {
    return this.firestore.collection('busStop').doc(id).delete();
  }
}
