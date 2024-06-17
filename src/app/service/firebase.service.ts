import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { database } from '../firebase-config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  addBusStop(id: string, data: any) {
    return this.firestore.collection('busStop').doc(id).set(data);
  }

  addBusStopDetail(id: string, data: any) {
    return this.firestore.collection('busStopDetail').doc(id).set(data);
  }

  addCorridor(id: string, data: any) {
    return this.firestore.collection('corridor').doc(id).set(data);
  }

  addInterchange(id: string, data: any) {
    return this.firestore.collection('interchange').doc(id).set(data);
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

  getBusStopDetailList() {
    return this.firestore.collection('busStopDetail').snapshotChanges();
  }

  getBusStopDetail(id: string) {
    return this.firestore.collection('busStolDetail').doc(id).get();
  }
  
  updateBusStop(id: string, data: any) {
    return this.firestore.collection('busStop').doc(id).update(data);
  }
  
  deleteBusStop(id: string) {
    return this.firestore.collection('busStop').doc(id).delete();
  }
}

export async function getCorridorBusStopList(corridorId: string) {
  const getCorridorBusStopListQuery = query(collection(database, 'busStopDetail'), where('corridorId', '==', corridorId));
  const querySnapshot = await getDocs(getCorridorBusStopListQuery);
  const returnData: any = []
  querySnapshot.forEach((doc) => {
    returnData.push(doc.data());
  })
  return returnData;
}

export async function getBusStopDetail(busStopName: string) {
  const getBusStopDetailQuery = query(collection(database, 'busStopDetail'), where('busStopId', '==', busStopName));
  const querySnapshot = await getDocs(getBusStopDetailQuery);
  const returnData: any = []
  querySnapshot.forEach((doc) => {
    returnData.push(doc.data());
  })
  return returnData;
}

export async function getCorridorList() {
  const getCorridorListQuery = query(collection(database, 'corridor'));
  const querySnapshot = await getDocs(getCorridorListQuery);
  const returnData: any = []
  querySnapshot.forEach((doc) => {
    returnData.push(doc.data());
  })
  return returnData;
}
