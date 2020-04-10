import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  @ViewChild('vid', { static: true }) vid: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasOutPut', { static: true }) canvasOutPut: ElementRef<HTMLCanvasElement>;


  private _stream: MediaStream;

  // change data to use getter and setter
  @Input()
  set stream(value: MediaStream) {
    debugger
    if (value) {
      this._stream = value;
      this.vid.nativeElement.srcObject = value;
      this.vid.nativeElement.play();
    }



  }

  get stream() {
    debugger
    // get the latest value from _data BehaviorSubject
    return this._stream;
  }

  constructor() {

    // Do other stuffs

    //  this.stream = new Observable<MediaStream>();
  }
  ngOnInit(): void {
   
  }

}
