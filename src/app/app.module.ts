import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { KeysPipe } from './pipe/keys.pipe';

const firebaseConfig = {
  apiKey: "AIzaSyC4815XN4YxsnwapctCLIMgSyPOicU2_Y8",
  authDomain: "reykjavik-47907.firebaseapp.com",
  projectId: "reykjavik-47907",
  storageBucket: "reykjavik-47907.appspot.com",
  messagingSenderId: "43955062786",
  appId: "1:43955062786:web:9f5763c18c045c10147f1b"
};

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }