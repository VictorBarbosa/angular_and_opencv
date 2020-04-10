import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { OpencvServiceService } from './services/opencv-service.service';
import { VideoComponent } from './components/video/video.component';
import { TesseractService } from './services/tesseract.service';


@NgModule({
  declarations: [
    AppComponent,
    BottomBarComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [OpencvServiceService, TesseractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
