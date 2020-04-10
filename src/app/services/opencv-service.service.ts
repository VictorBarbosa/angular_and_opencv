import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const cv;
declare const Utils;

@Injectable({
  providedIn: 'root'
})
export class OpencvServiceService {

  private _videoMediaStream: MediaStream;
  public get videoMediaStream(): MediaStream {
    return this._videoMediaStream;
  }
  public set videoMediaStream(v: MediaStream) {
    this._videoMediaStream = v;
  }

  constructor() { }
  public startVideo(video?: boolean, audio?: boolean, peerIdentity?: string) {
    navigator.mediaDevices.getUserMedia({ audio, video, peerIdentity }).then((stream: MediaStream) => {
      this.videoMediaStream = stream;
    });
  }



  detectFace(video: HTMLVideoElement, canvasOutput: HTMLCanvasElement) {
    video.width = 250;
    video.height = 250;
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const cap = new cv.VideoCapture(video);
    const faces = new cv.RectVector();
    const classifier = new cv.CascadeClassifier();

    const faceCascadeFile = 'assets/haar/haarcascade_frontalface_default.xml';
    const faceCascadePath = 'haarcascade_frontalface_default.xml';

    const utils = new Utils('errorMessage');

    utils.createFileFromUrl(faceCascadePath, faceCascadeFile, () => {
      classifier.load(faceCascadePath); // in the callback, load the cascade from file


      const FPS = 60;
      function processVideo() {
        try {
          const begin = Date.now();
          // start processing.
          cap.read(src);
          src.copyTo(dst);
          cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
          // detect faces.
          classifier.detectMultiScale(gray, faces, 1.5, 3, 0);

          // draw faces.
          for (let i = 0; i < faces.size(); ++i) {
            const face = faces.get(i);
            const point1 = new cv.Point(face.x, face.y);
            const point2 = new cv.Point(face.x + face.width, face.y + face.height);
            cv.rectangle(dst, point1, point2, [255, 255, 0, 255]);
          }
          cv.imshow(canvasOutput, dst);
          // schedule the next one.
          let delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, 0);
        } catch (err) { }
      }

      // schedule the first one.
      setTimeout(processVideo, 0);
    });

  }
  grayVideo(video: HTMLVideoElement, canvasOutput: HTMLCanvasElement) {
    video.width = 250;
    video.height = 250;
    const src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    const gray = new cv.Mat();
    const cap = new cv.VideoCapture(video);
    function processVideo() {
      try {

        // start processing.
        cap.read(src);
        src.copyTo(dst);
        cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
        // detect faces.
        cv.imshow(canvasOutput, gray);


        setTimeout(processVideo, 0);
      } catch (err) { }
    }
    // schedule the first one.
    setTimeout(processVideo, 0);
  }

}
