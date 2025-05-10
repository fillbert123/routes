import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { KeysPipe } from './pipe/keys.pipe';
import { firebaseConfig } from './firebase-config';
import { TerminusSelectionComponent } from './component/terminus-selection/terminus-selection.component';
import { LoadingComponent } from './component/loading/loading.component';
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
import { RoutePreviewComponent } from './component/route-preview/route-preview.component';
import { LineOverviewComponent } from './component/line-overview/line-overview.component';
import { TrackOverviewComponent } from './component/track-overview/track-overview.component';
import { BannerComponent } from './component/banner/banner.component';
import { CorridorSelectionComponent } from './page/corridor-selection/corridor-selection.component';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import { ZoomControlComponent } from './component/zoom-control/zoom-control.component';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';

@NgModule({
  declarations: [
    AppComponent,
    KeysPipe,
    TerminusSelectionComponent,
    LoadingComponent,
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
    RoutePreviewComponent,
    LineOverviewComponent,
    TrackOverviewComponent,
    BannerComponent,
    CorridorSelectionComponent,
    PopUpComponent,
    ZoomControlComponent,
    ClickOutsideDirective
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