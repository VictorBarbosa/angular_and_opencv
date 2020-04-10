import { Injectable } from '@angular/core';
import { createWorker } from 'tesseract.js';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
@Injectable({
  providedIn: 'root'
})
export class TesseractService {

  private _worker: Tesseract.Worker;
  private get worker(): Tesseract.Worker {
    return this._worker;
  }
  private set worker(v: Tesseract.Worker) {
    this._worker = v;
  }


  constructor() {
    ;
    this.worker = createWorker();

    // Called as early as possible
    (async () => {
      await this.worker.load();
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
    })();
  }


  recognize(image: string | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | CanvasRenderingContext2D | File | Blob | ImageData | Buffer):
    Observable<any> {
    return new Observable(x => {
      // tslint:disable-next-line: no-unused-expression
      // tslint:disable-next-line: no-shadowed-variable

      
      (async (image) => {
        const { data: { text } } = await this.worker.recognize(image);
        x.next(text);
      })(image);
    });
  }
}
