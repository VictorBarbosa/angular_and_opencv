import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OpencvServiceService } from './services/opencv-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   implements OnInit {

  @ViewChild("vid", { static: true }) vid: ElementRef<HTMLVideoElement>;
  @ViewChild("canvasOutPut", { static: true }) canvasOutPut: ElementRef<HTMLCanvasElement>;
  constructor(private opencvService: OpencvServiceService) { }

  ngOnInit(): void {
    this.opencvService.startVideo(true, false).subscribe(x => {
      this.vid.nativeElement.srcObject = x;
      this.vid.nativeElement.play();
    }
    );

  }
  DetectFace() {
    this.opencvService.detectFace(<HTMLVideoElement>this.vid.nativeElement, <HTMLCanvasElement>this.canvasOutPut.nativeElement)

  }
}
