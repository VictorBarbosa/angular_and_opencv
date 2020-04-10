import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { OpencvServiceService } from 'src/app/services/opencv-service.service';

@Component({
  selector: 'app-facedetect',
  templateUrl: './facedetect.component.html',
  styleUrls: ['./facedetect.component.scss']
})
export class FacedetectComponent implements OnInit {

  @ViewChild('hiddenVideo', { static: true }) hiddenVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasOutPut', { static: true }) canvasOutPut: ElementRef<HTMLCanvasElement>;
  constructor(private opencvService: OpencvServiceService) { }
  ngOnInit(): void {
    this.faceDetectOn();
  }
  faceDetectOn() {

    if (this.opencvService.videoMediaStream) {
      this.hiddenVideo.nativeElement.srcObject = this.opencvService.videoMediaStream;
      this.opencvService.detectFace(this.hiddenVideo.nativeElement, this.canvasOutPut.nativeElement);
    }

  }

}
