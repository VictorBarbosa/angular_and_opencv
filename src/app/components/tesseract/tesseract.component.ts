import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpencvServiceService } from 'src/app/services/opencv-service.service';
import { TesseractService } from '../../services/tesseract.service';

@Component({
  selector: 'app-tesseract',
  templateUrl: './tesseract.component.html',
  styleUrls: ['./tesseract.component.scss']
})
export class TesseractComponent implements OnInit {

  @ViewChild('hiddenVideo', { static: true }) hiddenVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasOutPut', { static: true }) canvasOutPut: ElementRef<HTMLCanvasElement>;
  msg: string;
  constructor(private opencvService: OpencvServiceService, private tesseract: TesseractService) { }


  ngOnInit(): void {

    this.startCam();
  }
  startCam() {
    if (!this.opencvService.videoMediaStream) {
      this.opencvService.startVideo(true, false);
    }
    setTimeout(() => {
      this.hiddenVideo.nativeElement.srcObject = this.opencvService.videoMediaStream;

      this.opencvService.grayVideo(this.hiddenVideo.nativeElement, this.canvasOutPut.nativeElement);
    }, 2000);
  }
  takePicture() {
    if (!this.opencvService.videoMediaStream) {
      this.startCam();
    }
    this.tesseract.recognize(this.canvasOutPut.nativeElement).subscribe(x => {
      if (x !== '') {
        this.msg = x;
      }
    });
  }
}
