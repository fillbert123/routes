import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FirebaseService } from '../service/firebase.service';
import { DocumentChange, DocumentData } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../../styles.scss',
    './app.component.scss'
  ]
})
export class AppComponent {
  title = 'reykjavik';
  items: any[] = [];
  busStop: any;
  corridorList: any[] = [];
  busStopDetailList: any[] = [];
  busStopList: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.getCorridorList();
    // this.getBusStopDetailList();
    // this.getBusStopList();
    // this.getItemsFromFirebase();
    // this.getItemFromFirebase();
    // this.pushItemToFirebase();
    // this.updateItemOnFirebase();
    // this.deleteItemFromFirebase();
    // this.addStopDetailToFirebase();
  }

  async getCorridorList() {
    this.firebaseService.getCorridorList().subscribe((data) => {
      this.corridorList = data.map((corridor: any) => {
        return {
          id: corridor.payload.doc.id, ...(corridor.payload.doc.data() as object)
        }
      })
    })
  }

  getBusStopDetailList() {
    this.firebaseService.getBusStopDetailList().subscribe((data) => {
      this.busStopDetailList = data.map((busStopDetail: any) => {
        return {
          id: busStopDetail.payload.doc.id, ...(busStopDetail.payload.doc.data() as object)
        }
      })
    })
  }

  getBusStopList() {
    this.firebaseService.getBusStopList().subscribe((data) => {
      this.busStopList = data.map((busStop: any) => {
        return {
          id: busStop.payload.doc.id, ...(busStop.payload.doc.data() as object)
        }
      })
    })
  }
  
  pushItemToFirebase() {
    // const id = 'STP015';
    // const data = {
    //   busStopName: 'Ddslfjdlks'
    // }
    
    // const bsId = [
    //   'STP001', 'STP002', 'STP003', 'STP004', 'STP005', 'STP006', 'STP007', 'STP008', 'STP009', 'STP010', 'STP011', 'STP012', 'STP013', 'STP014', 'STP015', 'STP016', 'STP017', 'STP018', 'STP019', 'STP020', 'STP021', 'STP022', 'STP023', 'STP024', 'STP025', 'STP026', 'STP027', 'STP028', 'STP029', 'STP030', 'STP031', 'STP032', 'STP033', 'STP034', 'STP035', 'STP036', 'STP037', 'STP038', 'STP039', 'STP040', 'STP041', 'STP042', 'STP043', 'STP044', 'STP045', 'STP046', 'STP047', 'STP048', 'STP049', 'STP050', 'STP051', 'STP052', 'STP053', 'STP054', 'STP055', 'STP056', 'STP057', 'STP058', 'STP059', 'STP060', 'STP061', 'STP062', 'STP063', 'STP064', 'STP065', 'STP066', 'STP067', 'STP068', 'STP069', 'STP070', 'STP071', 'STP072', 'STP073', 'STP074', 'STP075', 'STP076', 'STP077', 'STP078', 'STP079', 'STP080', 'STP081', 'STP082', 'STP083', 'STP084', 'STP085', 'STP086', 'STP087', 'STP088', 'STP089', 'STP090', 'STP091', 'STP092', 'STP093', 'STP094', 'STP095', 'STP096', 'STP097', 'STP098', 'STP099', 'STP100', 'STP101', 'STP102', 'STP103', 'STP104', 'STP105', 'STP106', 'STP107', 'STP108', 'STP109', 'STP110', 'STP111', 'STP112', 'STP113', 'STP114', 'STP115', 'STP116', 'STP117', 'STP118', 'STP119', 'STP120', 'STP121', 'STP122', 'STP123', 'STP124', 'STP125', 'STP126', 'STP127', 'STP128', 'STP129', 'STP130', 'STP131', 'STP132', 'STP133', 'STP134', 'STP135', 'STP136', 'STP137', 'STP138', 'STP139', 'STP140', 'STP141', 'STP142', 'STP143', 'STP144', 'STP145', 'STP146', 'STP147', 'STP148', 'STP149', 'STP150', 'STP151', 'STP152', 'STP153', 'STP154', 'STP155', 'STP156', 'STP157', 'STP158', 'STP159', 'STP160', 'STP161', 'STP162', 'STP163', 'STP164', 'STP165', 'STP166', 'STP167', 'STP168', 'STP169', 'STP170', 'STP171', 'STP172', 'STP173', 'STP174', 'STP175', 'STP176', 'STP177', 'STP178', 'STP179', 'STP180', 'STP181', 'STP182', 'STP183', 'STP184', 'STP185', 'STP186', 'STP187', 'STP188', 'STP189', 'STP190', 'STP191', 'STP192', 'STP193', 'STP194', 'STP195', 'STP196', 'STP197', 'STP198', 'STP199', 'STP200', 'STP201', 'STP202', 'STP203', 'STP204', 'STP205', 'STP206', 'STP207', 'STP208', 'STP209', 'STP210', 'STP211', 'STP212', 'STP213', 'STP214', 'STP215', 'STP216', 'STP217', 'STP218', 'STP219', 'STP220', 'STP221', 'STP222', 'STP223', 'STP224', 'STP225', 'STP226', 'STP227', 'STP228', 'STP229'
    // ];
    // const bsData = [
    //   {busStopName: 'Blok M'}, {busStopName: 'Kejaksaan Agung'}, {busStopName: 'Masjid Agung'}, {busStopName: 'Bundaran Senayan'}, {busStopName: 'Gelora Bung Karno'}, {busStopName: 'Polda'}, {busStopName: 'Bendungan Hilir'}, {busStopName: 'Karet'}, {busStopName: 'Dukuh Atas'}, {busStopName: 'Tosari'}, {busStopName: 'Bundaran HI'}, {busStopName: 'MH Thamrin'}, {busStopName: 'Kebon Sirih'}, {busStopName: 'Monumen Nasional'}, {busStopName: 'Harmoni'}, {busStopName: 'Sawah Besar'}, {busStopName: 'Mangga Besar'}, {busStopName: 'Taman Sari'}, {busStopName: 'Glodok'}, {busStopName: 'Kota'}, {busStopName: 'Kali Besar'}, {busStopName: 'Museum Sejarah Jakarta'}, {busStopName: 'Pulo Gadung'}, {busStopName: 'Bermis'}, {busStopName: 'Pulo Mas'}, {busStopName: 'Perintis Kemerdekaan'}, {busStopName: 'Pedongkelan'}, {busStopName: 'Cempaka Mas'}, {busStopName: 'Sumur Batu'}, {busStopName: 'Cempaka Baru'}, {busStopName: 'Pasar Cempaka Putih'}, {busStopName: 'Rawa Selatan'}, {busStopName: 'Galur'}, {busStopName: 'Pasar Senen'}, {busStopName: 'Senen Raya'}, {busStopName: 'RSPAD'}, {busStopName: 'Pejambon'}, {busStopName: 'Gambir'}, {busStopName: 'Istiqlal'}, {busStopName: 'Juanda'}, {busStopName: 'Pecenongan'}, {busStopName: 'Balai Kota'}, {busStopName: 'Gambir 2'}, {busStopName: 'Kwitang'}, {busStopName: 'Petojo'}, {busStopName: 'Roxy'}, {busStopName: 'Grogol'}, {busStopName: 'Jelambar'}, {busStopName: 'Damai'}, {busStopName: 'Taman Kota'}, {busStopName: 'Jembatan Gantung'}, {busStopName: 'Pulo Nangka'}, {busStopName: 'Jembatan Baru'}, {busStopName: 'Rawa Buaya'}, {busStopName: 'Sumur Bor'}, {busStopName: 'Pesakih'}, {busStopName: 'Kalideres'}, {busStopName: 'Grogol Reformasi'}, {busStopName: 'Tanjung Duren'}, {busStopName: 'Kota Bambu'}, {busStopName: 'Kemanggisan'}, {busStopName: 'Petamburan'}, {busStopName: 'Senayan'}, {busStopName: 'Pasar Pulo Gadung'}, {busStopName: 'Pemuda Merdeka'}, {busStopName: 'Layur'}, {busStopName: 'Pemuda Rawamangun'}, {busStopName: 'Velodrome'}, {busStopName: 'Kayu Jati'}, {busStopName: 'Rawamangun'}, {busStopName: 'Simpang Pramuka'}, {busStopName: 'Pramuka Sari'}, {busStopName: 'Utan Kayu'}, {busStopName: 'Pasar Genjing'}, {busStopName: 'Flyover Pramuka'}, {busStopName: 'Manggarai'}, {busStopName: 'Pasar Rumput'}, {busStopName: 'Halimun'}, {busStopName: 'Galunggung'}, {busStopName: 'Flyover Kuningan'}, {busStopName: 'Setiabudi'}, {busStopName: 'Kuningan Madya'}, {busStopName: 'Karet Kuningan'}, {busStopName: 'Rasuna Said'}, {busStopName: 'Kuningan'}, {busStopName: 'Patra Kuningan'}, {busStopName: 'Ancol'}, {busStopName: 'Pademangan'}, {busStopName: 'Gunung Sahari'}, {busStopName: 'Jembatan Merah'}, {busStopName: 'Pasar Baru Timur'}, {busStopName: 'Lapangan Banteng'}, {busStopName: 'Senen Sentral'}, {busStopName: 'Pal Putih'}, {busStopName: 'Kramat Sentiong'}, {busStopName: 'Salemba'}, {busStopName: 'Paseban'}, {busStopName: 'Matraman'}, {busStopName: 'Tegalan'}, {busStopName: 'Kesatrian'}, {busStopName: 'Matraman Baru'}, {busStopName: 'Bali Mester'}, {busStopName: 'Jatinegara'}, {busStopName: 'Kampung Melayu'}, {busStopName: 'Bidara Cina'}, {busStopName: 'Gelanggang Remaja'}, {busStopName: 'Cawang Baru'}, {busStopName: 'Cawang'}, {busStopName: 'Cawang Sentral'}, {busStopName: 'Cawang Cililitan'}, {busStopName: 'PGC'}, {busStopName: 'Cililitan'}, {busStopName: 'Ragunan'}, {busStopName: 'Simpang Ragunan'}, {busStopName: 'Jati Barat'}, {busStopName: 'Jati Padang'}, {busStopName: 'Pejaten'}, {busStopName: 'Buncit Indah'}, {busStopName: 'Warung Jati'}, {busStopName: 'Warung Buncit'}, {busStopName: 'Duren Tiga'}, {busStopName: 'Mampang Prapatan'}, {busStopName: 'Underpass Kuningan'}, {busStopName: 'Denpasar'}, {busStopName: 'Widya Chandra'}, {busStopName: 'Semanggi'}, {busStopName: 'Tegal Mampang'}, {busStopName: 'Rawa Barat'}, {busStopName: 'Pasar Santa'}, {busStopName: 'Kampung Rambutan'}, {busStopName: 'Tanah Merdeka'}, {busStopName: 'Flyover Raya Bogor'}, {busStopName: 'Trikora'}, {busStopName: 'Pasar Induk'}, {busStopName: 'Kramat Jati'}, {busStopName: 'Utan Kayu Rawamangun'}, {busStopName: 'Pemuda Pramuka'}, {busStopName: 'Kayu Putih Rawasari'}, {busStopName: 'Pulo Mas Bypass'}, {busStopName: 'Cempaka Putih'}, {busStopName: 'Pasar Baru'}, {busStopName: 'Lebak Bulus'}, {busStopName: 'Pondok Pinang'}, {busStopName: 'Underpass Lebak Bulus'}, {busStopName: 'Pondok Indah'}, {busStopName: 'Tanah Kusir'}, {busStopName: 'Bungur'}, {busStopName: 'Kebayoran'}, {busStopName: 'Simprug'}, {busStopName: 'Permata Hijau'}, {busStopName: 'Arteri'}, {busStopName: 'Pos Pengumben'}, {busStopName: 'Kelapa Dua Sasak'}, {busStopName: 'Kebon Jeruk'}, {busStopName: 'Duri Kepa'}, {busStopName: 'Kedoya Panjang'}, {busStopName: 'Kedoya'}, {busStopName: 'Tomang Raya'}, {busStopName: 'Tarakan'}, {busStopName: 'Pinang Ranti'}, {busStopName: 'Makasar'}, {busStopName: 'Ciliwung'}, {busStopName: 'Cikoko'}, {busStopName: 'Tebet Eco Park'}, {busStopName: 'Pancoran Tugu'}, {busStopName: 'Pancoran'}, {busStopName: 'Tegal Parang'}, {busStopName: 'Simpang Kuningan'}, {busStopName: 'Kali Grogol'}, {busStopName: 'Jembatan Besi'}, {busStopName: 'Jembatan Dua'}, {busStopName: 'Jembatan Tiga'}, {busStopName: 'Penjaringan'}, {busStopName: 'Pluit'}, {busStopName: 'Tanjung Priok'}, {busStopName: 'Mambo'}, {busStopName: 'Koja'}, {busStopName: 'Walikota Jakarta Utara'}, {busStopName: 'Plumpang'}, {busStopName: 'Sunter Kelapa Gading'}, {busStopName: 'Sunter Boulevard Barat'}, {busStopName: 'Kodamar'}, {busStopName: 'Simpang Cempaka'}, {busStopName: 'Pisangan'}, {busStopName: 'Flyover Jatinegara'}, {busStopName: 'Pedati Prumpung'}, {busStopName: 'Kebon Nanas'}, {busStopName: 'Halim'}, {busStopName: 'Simpang Cawang'}, {busStopName: 'Stasiun Jatinegara'}, {busStopName: 'Pasar Enjo'}, {busStopName: 'Flyover Cipinang'}, {busStopName: 'Cipinang'}, {busStopName: 'Stasiun Klender'}, {busStopName: 'Klender'}, {busStopName: 'Kampung Sumur'}, {busStopName: 'Buaran'}, {busStopName: 'Simpang Buaran'}, {busStopName: 'Flyover Pondok Kopi'}, {busStopName: 'Penggilingan'}, {busStopName: 'Walikota Jakarta Timur'}, {busStopName: 'Pulo Gebang'}, {busStopName: 'Sunter Karya'}, {busStopName: 'Sunter Utara'}, {busStopName: 'Danau Sunter'}, {busStopName: 'Danau Agung'}, {busStopName: 'Landasan Pacu'}, {busStopName: 'Mangga Dua'}, {busStopName: 'Mangga Dua Raya'}, {busStopName: 'Bandengan'}, {busStopName: 'Pluit Selatan'}, {busStopName: 'Pakin'}, {busStopName: 'Gedong Panjang'}, {busStopName: 'Ciledug'}, {busStopName: 'Puri Beta 2'}, {busStopName: 'Puri Beta 1'}, {busStopName: 'Pertukangan Utara'}, {busStopName: 'JORR'}, {busStopName: 'Swadarma'}, {busStopName: 'Cipulir'}, {busStopName: 'Seskoal'}, {busStopName: 'Kebayoran Lama'}, {busStopName: 'Velbak'}, {busStopName: 'Mayestik'}, {busStopName: 'CSW'}, {busStopName: 'Tanah Tinggi'}, {busStopName: 'Kemayoran'}, {busStopName: 'Jembatan Item'}, {busStopName: 'Jakarta International Stadium'}
    // ];
    // bsId.map((bsId, index) => {
    //   console.log(bsId);
    //   console.log(bsData);
    //   this.firebaseService.addBusStop(bsId, bsData[index])
    //     .then(() => {
    //       console.log(bsId + ' added to firebase');
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // })

    const bsdId = 
    ['SDT460', 'SDT461', 'SDT462', 'SDT463', 'SDT464', 'SDT465', 'SDT466', 'SDT467', 'SDT468', 'SDT469', 'SDT470', 'SDT471', 'SDT472', 'SDT473', 'SDT474', 'SDT475', 'SDT476']
    const bsdData = 
[{busStopId :'Tanjung Priok', busStopDirection :'terminus', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Pademangan', busStopNextLow :null, corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Pademangan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Gunung Sahari', busStopNextLow :'Tanjung Priok', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Gunung Sahari', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Jembatan Merah', busStopNextLow :'Pademangan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Jembatan Merah', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Pasar Baru Timur', busStopNextLow :'Gunung Sahari', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Pasar Baru Timur', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Pasar Baru', busStopNextLow :'Jembatan Merah', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Pasar Baru', busStopDirection :'low', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Juanda', busStopNextLow :null, corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Juanda', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Pecenongan', busStopNextLow :'Pasar Baru Timur', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Pecenongan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Petojo', busStopNextLow :'Juanda', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Petojo', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Tarakan', busStopNextLow :'Pecenongan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Tarakan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Tomang Raya', busStopNextLow :'Petojo', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Tomang Raya', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Kota Bambu', busStopNextLow :'Tarakan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Kota Bambu', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Kemanggisan', busStopNextLow :'Tomang Raya', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Kemanggisan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Petamburan', busStopNextLow :'Kota Bambu', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Petamburan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Senayan', busStopNextLow :'Kemanggisan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Senayan', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Gelora Bung Karno', busStopNextLow :'Petamburan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Gelora Bung Karno', busStopDirection :'bidirectional', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :'Bundaran Senayan', busStopNextLow :'Senayan', corridorIcon :'H', corridorColor :'grey'}, {busStopId :'Bundaran Senayan', busStopDirection :'terminus', busStopCode :'null', corridorId :'Koridor 10H', busStopIsRapid :false, busStopNextUp :null, busStopNextLow :'Gelora Bung Karno', corridorIcon :'H', corridorColor :'grey'}]
    bsdId.map((bsdId, index) => {
      console.log(bsdId);
      console.log(bsdData[index]);
      this.firebaseService.addBusStopDetail(bsdId, bsdData[index])
        .then(() => {
          console.log(bsdId + ' added to firebase');
        })
        .catch((error) => {
          alert(error);
        }
      )
    })

    // const intId = ['INT001', 'INT002', 'INT003', 'INT004', 'INT005', 'INT006', 'INT007', 'INT008', 'INT009', 'INT010', 'INT011', 'INT012', 'INT013', 'INT014', 'INT015', 'INT016', 'INT017', 'INT018', 'INT019', 'INT020'];
    // const intData = [{interchangePair: 'ICP001', interchangeBusStop: 'Dukuh Atas'}, {interchangePair: 'ICP001', interchangeBusStop: 'Galunggung'}, {interchangePair: 'ICP002', interchangeBusStop: 'Bendungan Hilir'}, {interchangePair: 'ICP002', interchangeBusStop: 'Semanggi'}, {interchangePair: 'ICP003', interchangeBusStop: 'Kejaksaan Agung'}, {interchangePair: 'ICP003', interchangeBusStop: 'CSW'}, {interchangePair: 'ICP004', interchangeBusStop: 'Cempaka Mas'}, {interchangePair: 'ICP004', interchangeBusStop: 'Simpang Cempaka'}, {interchangePair: 'ICP005', interchangeBusStop: 'Pasar Senen'}, {interchangePair: 'ICP005', interchangeBusStop: 'Senen Sentral'}, {interchangePair: 'ICP006', interchangeBusStop: 'Grogol'}, {interchangePair: 'ICP006', interchangeBusStop: 'Grogol Reformasi'}, {interchangePair: 'ICP007', interchangeBusStop: 'Flyover Pramuka'}, {interchangePair: 'ICP007', interchangeBusStop: 'Matraman'}, {interchangePair: 'ICP008', interchangeBusStop: 'Simpang Pramuka'}, {interchangePair: 'ICP008', interchangeBusStop: 'Pemuda Pramuka'}, {interchangePair: 'ICP009', interchangeBusStop: 'Underpass Kuningan'}, {interchangePair: 'ICP009', interchangeBusStop: 'Simpang Kuningan'}, {interchangePair: 'ICP010', interchangeBusStop: 'Kebayoran'}, {interchangePair: 'ICP010', interchangeBusStop: 'Velbak'}];
    
    // intId.map((intId, index) => {
    //   console.log(intId);
    //   console.log(intData[index]);
    //   this.firebaseService.addInterchange(intId, intData[index])
    //     .then(() => {
    //       console.log(intId + ' added to firebase');
    //     })
    //     .catch((error) => {
    //       alert(error);
    //     }
    //   )
    // })

//     const codId = ['COR001', 'COR002', 'COR003', 'COR004', 'COR005', 'COR006', 'COR007', 'COR008', 'COR009', 'COR010', 'COR011', 'COR012', 'COR013', 'COR014', 'COR015', 'COR016', 'COR017', 'COR018', 'COR019', 'COR020', 'COR021', 'COR022', 'COR023', 'COR024', 'COR025', 'COR026', 'COR027', 'COR028', 'COR029', 'COR030'];
//     const corData = [
// {corridorName: 'Koridor 1', corridorTerminusLower: 'Blok M', corridorTerminusUpper: 'Kota', corridorType: 'Main', corridorIcon: '1', corridorColor: 'red'},{corridorName: 'Koridor 2', corridorTerminusLower: 'Pulo Gadung', corridorTerminusUpper: 'Monumen Nasional', corridorType: 'Main', corridorIcon: '2', corridorColor: 'blue'},{corridorName: 'Koridor 2A', corridorTerminusLower: 'Pulo Gadung', corridorTerminusUpper: 'Rawa Buaya', corridorType: 'Extension', corridorIcon: 'A', corridorColor: 'blue'},{corridorName: 'Koridor 3', corridorTerminusLower: 'Kalideres', corridorTerminusUpper: 'Monumen Nasional', corridorType: 'Main', corridorIcon: '3', corridorColor: 'yellow'},{corridorName: 'Koridor 3F', corridorTerminusLower: 'Kalideres', corridorTerminusUpper: 'Gelora Bung Karno', corridorType: 'Extension', corridorIcon: 'F', corridorColor: 'yellow'},{corridorName: 'Koridor 4', corridorTerminusLower: 'Pulo Gadung', corridorTerminusUpper: 'Galunggung', corridorType: 'Main', corridorIcon: '4', corridorColor: 'purple'},{corridorName: 'Koridor 4D', corridorTerminusLower: 'Pulo Gadung', corridorTerminusUpper: 'Patra Kuningan', corridorType: 'Extension', corridorIcon: 'D', corridorColor: 'purple'},{corridorName: 'Koridor 5', corridorTerminusLower: 'Ancol', corridorTerminusUpper: 'Kampung Melayu', corridorType: 'Main', corridorIcon: '5', corridorColor: 'brown'},{corridorName: 'Koridor 5C', corridorTerminusLower: 'Juanda', corridorTerminusUpper: 'Cililitan', corridorType: 'Extension', corridorIcon: 'C', corridorColor: 'brown'},{corridorName: 'Koridor 5D', corridorTerminusLower: 'Ancol', corridorTerminusUpper: 'Cililitan', corridorType: 'Extension', corridorIcon: 'D', corridorColor: 'brown'},{corridorName: 'Koridor 6', corridorTerminusLower: 'Ragunan', corridorTerminusUpper: 'Galunggung', corridorType: 'Main', corridorIcon: '6', corridorColor: 'green'},{corridorName: 'Koridor 6A', corridorTerminusLower: 'Ragunan', corridorTerminusUpper: 'Balai Kota', corridorType: 'Extension', corridorIcon: 'A', corridorColor: 'green'},{corridorName: 'Koridor 6B', corridorTerminusLower: 'Ragunan', corridorTerminusUpper: 'Balai Kota', corridorType: 'Extension', corridorIcon: 'B', corridorColor: 'green'},{corridorName: 'Koridor 6V', corridorTerminusLower: 'Ragunan', corridorTerminusUpper: 'Gelora Bung Karno', corridorType: 'Extension', corridorIcon: 'V', corridorColor: 'green'},{corridorName: 'Koridor 7', corridorTerminusLower: 'Kampung Rambutan', corridorTerminusUpper: 'Kampung Melayu', corridorType: 'Main', corridorIcon: '7', corridorColor: 'magenta'},{corridorName: 'Koridor 7F', corridorTerminusLower: 'Kampung Rambutan', corridorTerminusUpper: 'Juanda', corridorType: 'Extension', corridorIcon: 'F', corridorColor: 'magenta'},{corridorName: 'Koridor 8', corridorTerminusLower: 'Lebak Bulus', corridorTerminusUpper: 'Pasar Baru', corridorType: 'Main', corridorIcon: '8', corridorColor: 'pink'},{corridorName: 'Koridor 9', corridorTerminusLower: 'Pinang Ranti', corridorTerminusUpper: 'Pluit', corridorType: 'Main', corridorIcon: '9', corridorColor: 'cyan'},{corridorName: 'Koridor 9A', corridorTerminusLower: 'Cililitan', corridorTerminusUpper: 'Kali Grogol', corridorType: 'Extension', corridorIcon: 'A', corridorColor: 'cyan'},{corridorName: 'Koridor 9C', corridorTerminusLower: 'Pinang Ranti', corridorTerminusUpper: 'Bundaran Senayan', corridorType: 'Extension', corridorIcon: 'C', corridorColor: 'cyan'},{corridorName: 'Koridor 10', corridorTerminusLower: 'Tanjung Priok', corridorTerminusUpper: 'PGC', corridorType: 'Main', corridorIcon: '10', corridorColor: 'grey'},{corridorName: 'Koridor 10D', corridorTerminusLower: 'Tanjung Priok', corridorTerminusUpper: 'Kampung Rambutan', corridorType: 'Extension', corridorIcon: 'D', corridorColor: 'grey'},{corridorName: 'Koridor 10H', corridorTerminusLower: 'Tanjung Priok', corridorTerminusUpper: 'Bundaran Senayan', corridorType: 'Extension', corridorIcon: 'H', corridorColor: 'grey'},{corridorName: 'Koridor 11', corridorTerminusLower: 'Kampung Melayu', corridorTerminusUpper: 'Pulo Gebang', corridorType: 'Main', corridorIcon: '11', corridorColor: 'teal'},{corridorName: 'Koridor 12', corridorTerminusLower: 'Tanjung Priok', corridorTerminusUpper: 'Penjaringan', corridorType: 'Main', corridorIcon: '12', corridorColor: 'cobalt'},{corridorName: 'Koridor 13', corridorTerminusLower: 'Ciledug', corridorTerminusUpper: 'Tegal Mampang', corridorType: 'Main', corridorIcon: '13', corridorColor: 'orange'},{corridorName: 'Koridor 13C', corridorTerminusLower: 'Puri Beta 2', corridorTerminusUpper: 'Dukuh Atas', corridorType: 'Extension', corridorIcon: 'C', corridorColor: 'orange'},{corridorName: 'Koridor 13D', corridorTerminusLower: 'Puri Beta 2', corridorTerminusUpper: 'Ragunan', corridorType: 'Extension', corridorIcon: 'D', corridorColor: 'orange'},{corridorName: 'Koridor L13E', corridorTerminusLower: 'Senen Raya', corridorTerminusUpper: 'Flyover Kuningan', corridorType: 'Rapid', corridorIcon: 'LE', corridorColor: 'orange'},{corridorName: 'Koridor 14', corridorTerminusLower: 'Senen Raya', corridorTerminusUpper: 'Jakarta International Stadium', corridorType: 'Main', corridorIcon: '14', corridorColor: 'midnight'}
//     ];
//     codId.map((corId, index) => {
//       console.log(corId);
//       console.log(corData[index]);
//       this.firebaseService.addCorridor(corId, corData[index])
//         .then(() => {
//           console.log(corId + ' added to firebase');
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//     })

    // this.firebaseService.addBusStop(id, data)
    //   .then(() => {
    //     alert('added');
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   })
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
