import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OpencvServiceService } from '../../services/opencv-service.service';
import { TesseractService } from '../../services/tesseract.service';


@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss']
})
export class BottomBarComponent implements OnInit {


  @Output() stream = new EventEmitter<MediaStream>();
  constructor(private opencvService: OpencvServiceService, private tess: TesseractService) { }
  ngOnInit(): void { }
  turnOnCam = () => this.opencvService.startVideo(true, false);


}
