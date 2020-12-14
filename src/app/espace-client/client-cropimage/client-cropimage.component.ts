import { Dimensions } from './../../racines/speciale/ngx-image-cropper/src/lib/interfaces/dimensions.interface';
import { ImageTransform } from './../../racines/speciale/ngx-image-cropper/src/lib/interfaces/image-transform.interface';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-client-cropimage',
    templateUrl: './client-cropimage.component.html',
    styleUrls: ['./client-cropimage.component.scss']
})
export class ClientCropimageComponent implements OnInit {

    public imageChangedEvent: any = '';
    public croppedImage: any = '';
    public canvasRotation = 0;
    public rotation = 0;
    public scale = 1;
    public showCropper = false;
    public containWithinAspectRatio = false;
    public transform: ImageTransform = {};
    public imageURL: string;
    public amountPrice: any;

    // Variable property for star
    public title = 'star-angular';
    public stars = [1, 2, 3, 4, 5];
    public rating = 0;
    public hoverState = 0;

    public dateStart: any;
    public dateEnd: any;
    public hourOpen: any;
    public hourClose: any;

    constructor() { }

    ngOnInit(): void {
        this.amountPrice = 15;
        // Initialisation only
        this.dateStart = new Date();
        this.dateEnd = new Date().setDate(this.dateStart.getDate() + 2);
        this.hourOpen = '08:00';
        this.hourClose = '16:00';
    }

    enter(i) {
        this.hoverState = i;
    }

    leave(param) {
        this.hoverState = 0;
    }

    updateRating(i) {
        console.log(i);
        this.rating = i;
    }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        console.log(event);
    }

    imageLoaded() {
        this.showCropper = true;
        console.log('Image loaded');
    }

    cropperReady(sourceImageDimensions: Dimensions) {
        console.log('Cropper ready', sourceImageDimensions);
    }

    loadImageFailed() {
        console.log('Load failed');
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }


    flipHorizontal() {
        this.transform = {
            ...this.transform,
            flipH: !this.transform.flipH
        };
    }

    flipVertical() {
        this.transform = {
            ...this.transform,
            flipV: !this.transform.flipV
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    toggleContainWithinAspectRatio() {
        this.containWithinAspectRatio = !this.containWithinAspectRatio;
    }

    updateRotation() {
        this.transform = {
            ...this.transform,
            rotate: this.rotation
        };
    }

}
