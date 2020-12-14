import {Component, OnInit, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';
import {HelpersService} from '../../services/helpers.service';

@Component({
  selector: 'app-signalisation',
  templateUrl: './signalisation.component.html',
  styleUrls: ['./signalisation.component.scss']
})
export class SignalisationComponent implements OnInit, OnChanges {
  @Input() equipment: any;
  @Input() pieceSelect: any;
  @Input() user: any;
  @Input() type: any;
  @Input() numAppart: any;
  @Output() signals: EventEmitter<any> = new EventEmitter<any>();
  public registerForm: FormGroup;
  public equipementPiece: any;
  public piecesSelect: any;
  public location: any;
  public submitted = false;
  public afficheChargement: any;
  public afficheNotifDanger: any;
  public messageErreur: string;
  public langue: any;
  public typeEtat: any;
  public users: any;
  public numAppartement: any;
  apiURL = CONFIGURATION.apiURL;
  constructor(
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    public helpersService: HelpersService
  ) {
    this.afficheChargement = false;
    this.afficheNotifDanger = false;
    this.messageErreur = '';
    this.location = this.locationService.getLocation();
    this.langue = (localStorage.getItem('langue') == null ? 'FR' : localStorage.getItem('langue'));
  }

  ngOnInit(): void {
    const pieceName = (this.langue === 'FR') ? this.piecesSelect.name_FR : this.piecesSelect.name_EN;
    this.registerForm = this.formBuilder.group({
      piece: [pieceName],
      explication: [''],
      equipmentId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      etat: ['', Validators.required],
    });
  }

  ngOnChanges(): void {
    this.equipementPiece = this.equipment;
    this.piecesSelect = this.pieceSelect;
    this.numAppartement = this.numAppart;
    this.users = this.user;
    this.typeEtat = this.type;
    console.log('piecesSelect', this.piecesSelect);
    console.log('equipementPiece', this.equipementPiece);
  }

  public signalisation() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.afficheChargement = true;
    const url = this.apiURL + 'addSignalisation';
    const equipmentSelect = this.equipment.find((item) => item.id == this.registerForm.value.equipmentId);
    const params = {
      userId: this.users.id,
      appartmentId: this.piecesSelect.appartmentId,
      pieceId: this.piecesSelect.id,
      equipmentId: this.registerForm.value.equipmentId,
      quantity: this.registerForm.value.quantity,
      etat: this.registerForm.value.etat,
      explication: this.registerForm.value.explication,
      type: this.typeEtat,
      price: parseFloat(equipmentSelect.price_equipment) * parseFloat(this.registerForm.value.quantity),
      majore : 0
    };
    this.helpersService.postHelper(params, url).subscribe((data) => {
      this.afficheChargement = false;
      if (data.success){
        this.signals.emit();
      }else{
        this.messageErreur = data.message;
        this.afficheNotifDanger = true;
        setTimeout(() => {
          this.afficheNotifDanger = false;
        }, 2000);
      }
    });

  }


}
