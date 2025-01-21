import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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
import { LoadingComponent } from './component/loading/loading.component';
import { SvgPlaygroundComponent } from './svg-playground/svg-playground.component';
import { SystemMapComponent } from './component/system-map/system-map.component';
import { SidePanelComponent } from './component/side-panel/side-panel.component';
import { ListComponent } from './component/list/list.component';
import { ListItemComponent } from './component/list-item/list-item.component';
import { CommandBarComponent } from './component/command-bar/command-bar.component';
import { HomeComponent } from './page/home/home.component';
import { SearchResultComponent } from './page/search-result/search-result.component';
import { CorridorDetailComponent } from './page/corridor-detail/corridor-detail.component';
import { ChipComponent } from './component/chip/chip.component';
import { IconComponent } from './component/icon/icon.component';
import { StopDetailComponent } from './page/stop-detail/stop-detail.component';
import { SelectComponent } from './component/select/select.component';
import { RoutePreviewComponent } from './component/route-preview/route-preview.component';
import { LineOverviewComponent } from './component/line-overview/line-overview.component';
import { TrackOverviewComponent } from './component/track-overview/track-overview.component';
import { ChipSelectionComponent } from './component/chip-selection/chip-selection.component';
import { BannerComponent } from './component/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    CorridorListComponent,
    CorridorIconComponent,
    BottomsheetComponent,
    TerminusSelectionComponent,
    LineDetailComponent,
    ButtonComponent,
    LoadingComponent,
    SvgPlaygroundComponent,
    SystemMapComponent,
    SidePanelComponent,
    ListComponent,
    ListItemComponent,
    CommandBarComponent,
    HomeComponent,
    SearchResultComponent,
    CorridorDetailComponent,
    ChipComponent,
    IconComponent,
    StopDetailComponent,
    SelectComponent,
    RoutePreviewComponent,
    LineOverviewComponent,
    TrackOverviewComponent,
    ChipSelectionComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}