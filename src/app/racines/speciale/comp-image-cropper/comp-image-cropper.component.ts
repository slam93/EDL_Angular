import { Dimensions } from './../ngx-image-cropper/src/lib/interfaces/dimensions.interface';
import { ImageTransform } from './../ngx-image-cropper/src/lib/interfaces/image-transform.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-comp-image-cropper',
  templateUrl: './comp-image-cropper.component.html',
  styleUrls: ['./comp-image-cropper.component.scss']
})
export class CompImageCropperComponent implements OnInit {

  @Output() changeCropped: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  imageChangedEvent: any = '';
  croppedImage: any = '';


  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
  ) { }

  ngOnInit(): void {
  }


  /* #################################    FUNCTION    ################################## */

  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  public imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedImage = event.base64;
    const block = event.base64.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];
    const blob = this.b64toBlob(realData, contentType, 512);

    // var formDataToUpload = new FormData(form);
    // formDataToUpload.append("image", blob);
    console.log(blob);
    this.changeCropped.emit(blob);
  }

  public imageLoaded() {
    // show cropper  
  }

  public cropperReady() {
    // cropper ready
  }

  public loadImageFailed() {
    // show message
  }

  public dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }


  public b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;

  }


}
