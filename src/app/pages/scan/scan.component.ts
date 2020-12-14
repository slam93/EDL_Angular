import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {
  NgbModalConfig,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LocationService} from '../../services/location.service';
import {HelpersService} from '../../services/helpers.service';
import {CONFIGURATION} from '../../interfdata/data-configuration';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {
  @ViewChild('connect') connect: any;
  @ViewChild('reinitiale') reinitiale: any;
  public scannerEnabled: boolean = true;
  public messageErreur: string;
  public location: any;
  public registerForm: FormGroup;
  public reinitialiseForm: FormGroup;
  public submitted = false;
  public submittedReinitiale = false;
  public afficheChargement: any;
  public afficheNotifDanger: any;
  apiURL = CONFIGURATION.apiURL;
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    public locationService: LocationService,
    public helpersService: HelpersService
  ) {
    this.afficheChargement = false;
    this.afficheNotifDanger = false;
    this.messageErreur = '';
    this.location = this.locationService.getLocation();
  }
  ngOnInit(): void {
  this.registerForm = this.formBuilder.group({
      numeros: ['', Validators.required]
    });
  this.reinitialiseForm = this.formBuilder.group({
    code_sejour: ['', Validators.required],
    password: ['', Validators.required]
    });
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    console.log($event);
  }

  public open_md(content) {
    this.modalService.open(content, { windowClass: 'my-modal-xs' });
  }

  public close_modal(){
    this.modalService.dismissAll();
  }

  public envoie_num(){
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.afficheChargement = true;
    const url = this.apiURL + 'getAppartementNum/' + this.registerForm.value.numeros;
    this.helpersService.getHelper(url).subscribe((data) => {
      this.afficheChargement = false;
      if (data.success){
        localStorage.setItem('numAppartement', this.registerForm.value.numeros);
        this.router.navigateByUrl('appartement');
        this.modalService.dismissAll();
      }else{
        this.messageErreur = data.message;
        this.afficheNotifDanger = true;
        setTimeout(() => {
          this.afficheNotifDanger = false;
        }, 2000);
      }
    });
  }

  public envoie_reinitialise(){
    this.submittedReinitiale = true;
    if (this.reinitialiseForm.invalid) {
      return;
    }
    this.afficheChargement = true;
    const url = this.apiURL + 'reinitialisation';
    this.helpersService.postHelper(this.reinitialiseForm.value, url).subscribe((data) => {
      this.afficheChargement = false;
      if (data.success){
        localStorage.setItem('numAppartement', data.data.appartment.numeros);
        this.router.navigateByUrl('appartement');
        this.modalService.dismissAll();
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

