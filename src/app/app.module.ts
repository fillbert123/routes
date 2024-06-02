import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { KeysPipe } from './pipe/keys.pipe';
import { CorridorListComponent } from './component/corridor-list/corridor-list.component';
import { CorridorIconComponent } from './component/corridor-icon/corridor-icon.component';
import { BottomsheetComponent } from './component/bottomsheet/bottomsheet.component';
import { firebaseConfig } from './firebase-config';
import { TerminusSelectionComponent } from './component/terminus-selection/terminus-selection.component';
import { LineDetailComponent } from './component/line-detail/line-detail.component';
import { ButtonComponent } from './component/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    CorridorListComponent,
    CorridorIconComponent,
    BottomsheetComponent,
    TerminusSelectionComponent,
    LineDetailComponent,
    ButtonComponent
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
export class AppModule {}