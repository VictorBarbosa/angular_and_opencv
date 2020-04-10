import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { OpencvServiceService } from '../../services/opencv-service.service';
import { AppComponent } from '../../app.component';
import { Observable } from 'rxjs';
import { TesseractService } from '../../services/tesseract.service';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {


  @Output() stream = new EventEmitter<MediaStream>();
  constructor(private opencvService: OpencvServiceService, private tess: TesseractService) { }
  ngOnInit(): void {

  }

  /**
   *
   */

  detectFace() {
    //  this.opencvService.detectFace(<HTMLVideoElement>this.vid.nativeElement, <HTMLCanvasElement>this.canvasOutPut.nativeElement);
  }
  turnOnCam() {

   
    this.opencvService.startVideo(true, false).subscribe((stream: MediaStream) => {
      this.stream.emit(stream);
    });

    // const image = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
    // this.tess.recognize(image).subscribe(x => {
    //
    // });

  }

}
