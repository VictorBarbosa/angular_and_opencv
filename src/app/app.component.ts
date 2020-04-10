import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpencvServiceService } from './services/opencv-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stream: MediaStream;
  ngOnInit(): void {

  }
  passStream(mediaStream: MediaStream) {

    this.stream = mediaStream;
    
  }
}
