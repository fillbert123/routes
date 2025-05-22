import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, query, where, getDocs } from 'firebase/firestore'
import { database } from '../firebase-config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) { }

  //start of new firebase service block

  async addData(collectionName: string, data: any, id: string) {
    return this.firestore.collection(collectionName).doc(id).set(data);
  }

  async getAllData(collectionName: string) {
    const getAllDataQuery = query(collection(database, collectionName));
    const querySnapshot = await getDocs(getAllDataQuery);
    const returnData: any = []
    querySnapshot.forEach((doc) => {
      returnData.push(doc.data());
    })
    return returnData;
  }

  async getDataByKey(collectionName: string, key: string, value: string) {
    const getDataByIdQuery = query(collection(database, collectionName), where(key, '==', value));
    const querySnapshot = await getDocs(getDataByIdQuery);
    const returnData: any = []
    querySnapshot.forEach((doc) => {
      returnData.push(doc.data());
    })
    return returnData;
  }

  //end of new firebase service block

  async getCorridorBusStopList(corridorId: string): Promise<any[]> {
    const getCorridorBusStopListQuery = query(collection(database, 'busStopDetail'), where('corridorId', '==', corridorId));
    const querySnapshot = await getDocs(getCorridorBusStopListQuery);
    const returnData: any = []
    querySnapshot.forEach((doc) => {
      returnData.push(doc.data());
    })
    return returnData;
  }
  
  async getBusStopDetail(busStopName: string): Promise<any[]> {
    const getBusStopDetailQuery = query(collection(database, 'busStopDetail'), where('busStopId', '==', busStopName));
    const querySnapshot = await getDocs(getBusStopDetailQuery);
    const returnData: any = []
    querySnapshot.forEach((doc) => {
      returnData.push(doc.data());
    })
    return returnData;
  }
  
  async getCorridorList() {
    const getCorridorListQuery = query(collection(database, 'corridor'));
    const querySnapshot = await getDocs(getCorridorListQuery);
    const returnData: any = []
    querySnapshot.forEach((doc) => {
      returnData.push(doc.data());
    })
    return returnData;
  }

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

  // getCorridorList() {
  //   return this.firestore.collection('corridor').snapshotChanges();
  // }
  
  getBusStop(id: string) {
    return this.firestore.collection('busStop').doc(id).get();
  }

  getBusStopDetailList() {
    return this.firestore.collection('busStopDetail').snapshotChanges();
  }

  // getBusStopDetail(id: string) {
  //   return this.firestore.collection('busStolDetail').doc(id).get();
  // }
  
  updateBusStop(id: string, data: any) {
    return this.firestore.collection('busStop').doc(id).update(data);
  }
  
  deleteBusStop(id: string) {
    return this.firestore.collection('busStop').doc(id).delete();
  }
}

// export async function getCorridorBusStopList(corridorId: string) {
//   const getCorridorBusStopListQuery = query(collection(database, 'busStopDetail'), where('corridorId', '==', corridorId));
//   const querySnapshot = await getDocs(getCorridorBusStopListQuery);
//   const returnData: any = []
//   querySnapshot.forEach((doc) => {
//     returnData.push(doc.data());
//   })
//   return returnData;
// }

// export async function getBusStopDetail(busStopName: string) {
//   const getBusStopDetailQuery = query(collection(database, 'busStopDetail'), where('busStopId', '==', busStopName));
//   const querySnapshot = await getDocs(getBusStopDetailQuery);
//   const returnData: any = []
//   querySnapshot.forEach((doc) => {
//     returnData.push(doc.data());
//   })
//   return returnData;
// }

// export async function getCorridorList() {
//   const getCorridorListQuery = query(collection(database, 'corridor'));
//   const querySnapshot = await getDocs(getCorridorListQuery);
//   const returnData: any = []
//   querySnapshot.forEach((doc) => {
//     returnData.push(doc.data());
//   })
//   return returnData;
// }
