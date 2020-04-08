import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { OpencvServiceService } from './services/opencv-service.service';

@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [OpencvServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
