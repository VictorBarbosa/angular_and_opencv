import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
declare const cv;
declare const Utils;
const constraints = {
  'qvga': { width: { exact: 320 }, height: { exact: 240 } },
  'vga': { width: { exact: 640 }, height: { exact: 480 } }
};
@Injectable({
  providedIn: 'root'
})
export class OpencvServiceService {
  constructor() { }

  public startVideo(video?: boolean, audio?: boolean, peerIdentity?: string): Observable<MediaStream> {
    return new Observable(x => {
      navigator.mediaDevices.getUserMedia({ audio, video, peerIdentity }).then((stream: MediaStream) => {
        x.next(stream);
      })
    })
  }

  detectFace(video: HTMLVideoElement, canvasOutput: HTMLCanvasElement) {
    video.width = 250;
    video.height = 250;




    let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let dst = new cv.Mat(video.height, video.width, cv.CV_8UC4);
    let gray = new cv.Mat();
    let cap = new cv.VideoCapture(video);
    let faces = new cv.RectVector();
    let classifier = new cv.CascadeClassifier();

    let faceCascadeFile = "assets/haar/haarcascade_frontalface_default.xml"
    let faceCascadePath = "haarcascade_frontalface_default.xml"

    let utils = new Utils('errorMessage');

    utils.createFileFromUrl(faceCascadePath, faceCascadeFile, () => {
      classifier.load(faceCascadePath); // in the callback, load the cascade from file


      // const FPS = 240;
      function processVideo() {
        try {
          let begin = Date.now();
          // start processing.
          cap.read(src);
          src.copyTo(dst);
          cv.cvtColor(dst, gray, cv.COLOR_RGBA2GRAY, 0);
          // detect faces.
          classifier.detectMultiScale(gray, faces, 2.0, 3, 0);

          // draw faces.
          for (let i = 0; i < faces.size(); ++i) {
            let face = faces.get(i);
            let point1 = new cv.Point(face.x, face.y);
            let point2 = new cv.Point(face.x + face.width, face.y + face.height);
            cv.rectangle(dst, point1, point2, [255, 255, 0, 255]);
          }
          cv.imshow(canvasOutput, dst);
          // schedule the next one.
          // let delay = 1000 / FPS - (Date.now() - begin);
          setTimeout(processVideo, 0);
        } catch (err) {
          debugger
          //  utils.printError(err);
        }
      };

      // schedule the first one.
      setTimeout(processVideo, 0);
    });

  }

}
