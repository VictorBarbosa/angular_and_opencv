import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacedetectComponent } from './components/facedetect/facedetect.component';
import { TesseractComponent } from './components/tesseract/tesseract.component';


const routes: Routes = [
  { path: 'facedetect', component: FacedetectComponent },
  { path: 'tesseract', component: TesseractComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
