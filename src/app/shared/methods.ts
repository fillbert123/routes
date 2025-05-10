import { FirebaseService } from '../service/firebase.service';

export function isMobile() {
  return window.innerWidth < 480;
}

export function addDataToFirebase(data: any, collection: string, firebaseService: FirebaseService) {
  data.forEach((item) => {
    firebaseService.addData(collection, item, item.id).then(() => {
      console.log(item.id + ' added to ' + collection + ' collection');
    }).catch((error) => {
      console.log(item.id + ' error when added to ' + collection + ' collection: ', error);
    })
  })
}

export function getDataFromFirebase(collection: string, firebaseService: FirebaseService) {
  firebaseService.getAllData(collection).then((response) => {
    console.log('response', response);
  })
}

export function getDataFromDatabaseByKey(key: string, value: string, collection: string, firebaseService: FirebaseService) {
  firebaseService.getDataByKey(collection, key, value).then((response) => {
    console.log('response', response);
  })
}