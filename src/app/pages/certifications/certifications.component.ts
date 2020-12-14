import {Component, OnInit, ViewChild} from '@angular/core';
import {LocationService} from '../../services/location.service';
import {HelpersService} from '../../services/helpers.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';
import * as _ from 'lodash';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss']
})
export class CertificationsComponent implements OnInit {

  @ViewChild('signaturePad') signaturePad: SignaturePad;
  public dataAppartement: any;
  public pieces: any;
  public location: any;
  public langue: any;
  public user: any;
  public type: any;
  public numAppart: any;
  public signalisation: any;
  public signature: any;
  public groupSignal: any;
  public errorSignature: boolean;
  apiURL = CONFIGURATION.apiURL;
  public options: object = {
    'canvasWidth': (innerWidth < 767)?0:500,
    'canvasHeight':(innerWidth < 767)?0:300,
  };
  constructor(
    public locationService: LocationService,
    public helpersService: HelpersService,
  ) {
    this.location = this.locationService.getLocation();
    this.type = 'ENTREE';
    this.signature = '';
    this.errorSignature = false;
  }

  async ngOnInit(): Promise<void> {
    this.dataAppartement = await JSON.parse(localStorage.getItem('dataAppartement'));
    this.user = await JSON.parse(localStorage.getItem('dataUser'));
    this.numAppart = localStorage.getItem('numAppartement');
    this.langue = (localStorage.getItem('langue') == null ? 'FR' : localStorage.getItem('langue'));
    this.pieces = this.dataAppartement.pieces;
    this.getSignalisation();
    this.signaturePad.set('minWidth', 3);
    this.signaturePad.clear();
  }

  private getSignalisation(){
    const url = this.apiURL + 'getSignalisationType';
    const params = {type: this.type, userId: this.user.id , appartmentId: this.dataAppartement.id};
    this.helpersService.postHelper(params, url).subscribe((data) => {
      const groupSignal =
        _(data.data)
          .groupBy('pieceId')
          .map((objs, key) => ({
            pieceId: key,
            incident: objs.length }))
          .value();
      this.groupSignal = groupSignal;
      this.signalisation = data.data;
    });
  }
  public deleteSignal(id){
    const url = this.apiURL + 'deleteSignalisation';
    const params = {
      signalisationId: id,
      userId: this.user.id ,
      appartmentId: this.dataAppartement.id
    };
    this.helpersService.postHelper(params, url).subscribe((data) => {
      if (data.success){
        this.getSignalisation();
      }
    });
  }
  public signalisationExist(pieceId){
    const exist = this.groupSignal.find((item)=>item.pieceId == pieceId);
    return exist;
  }
  drawComplete() {
    this.signature = this.signaturePad.toDataURL();
  }
  clearSignature(){
    this.signaturePad.clear();
    this.errorSignature = false;
  }
  postCertification(){
    if(this.signature === ''){
      this.errorSignature = true;
    }else{
      const url = this.apiURL + 'addCertification';
      const params = {
        signature: this.signature,
        appartmentId: this.dataAppartement.id,
        userId: this.user.id,
        type: this.type
      };
      console.log(params)
      this.helpersService.postHelper(params, url).subscribe((data) => {
        console.log(data)
      });
    }
  }
}
