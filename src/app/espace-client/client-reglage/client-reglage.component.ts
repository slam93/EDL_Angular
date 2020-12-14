import { MecanoService } from './../../services/mechanics.service';
import { DataService } from './../../services/data.service';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
import { EnumRole } from './../../interfdata/enum-role';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';

@Component({
  selector: 'app-client-reglage',
  templateUrl: './client-reglage.component.html',
  styleUrls: ['./client-reglage.component.scss'],
})
export class ClientReglageComponent implements OnInit {
  @Output() changeContainer: EventEmitter<any> = new EventEmitter();
  @Output() changeOnload: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public cheminLogo: any;
  public fileToUpload: any;
  public fileToUploadGarage: any;
  public userActual: any;
  public userActualEdit: any;
  public mechanicActualEdit: any;
  public mechanicActual: any;
  public profileForm: any;
  public garageForm: any;
  public profileFormPassword: any;
  public afficheNotifSuccee: any;
  public afficheNotifFailed: any;
  public afficheNotifSucceeG: any;
  public afficheNotifFailedG: any;
  public afficheNotifSucceeP: any;
  public afficheNotifFailedP: any;
  public enumRole = EnumRole;
  public selectRole: any;
  public roleUser: any;
  public connectedNom: any;
  public connectedImage: any;
  public connectedImageGarage: any;
  public apiUrlImage = CONFIGURATION.apiUrlImage   // Parametre API Global

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private fb: FormBuilder,
    public utilisateurApi: UtilisateurService,
    public mechanicApi: MecanoService,
    private data: DataService
  ) {}

  ngOnInit(): void {

    // Initialisation profil user
    this.data.currentNomConnected.subscribe((resNom) => (this.connectedNom = resNom));
    this.data.currentUrlImageConnected.subscribe((resImage) => (this.connectedImage = resImage));
    this.data.currentUrlImageGarage.subscribe((resImageGarage) => (this.connectedImageGarage = resImageGarage));

    if (localStorage.getItem('connectedImage') !== null) {
      this.connectedImage = localStorage.getItem('connectedImage');
      console.log(this.connectedImage);
    }

    if (localStorage.getItem('connectedImageGarage') !== null) {
      this.connectedImageGarage = localStorage.getItem('connectedImageGarage');
      console.log(this.connectedImageGarage);
    }

    // Initialisation variable
    this.cheminLogo = 'assets/css/images/avatar.png';
    this.afficheNotifFailed = false;
    this.afficheNotifSuccee = false;
    this.afficheNotifFailedG = false;
    this.afficheNotifSucceeG = false;
    this.afficheNotifFailedP = false;
    this.afficheNotifSucceeP = false;

    // Affectation du variable actuel utiliser
    this.utilisateurApi.getUtilisateurMe().subscribe((resUser: any) => {
      console.log(resUser);

      this.userActual = {
        id: resUser.data.id,
        username: resUser.data.username,
        last_name: resUser.data.last_name,
        first_name: resUser.data.first_name,
        email: resUser.data.email,
        role: resUser.data.role,
        password: resUser.data.password,
        provider: resUser.data.provider,
        logo: resUser.data.logo,
      };
      //this.userActualEdit = this.userActual;

      this.profileForm = this.fb.group({
        firstName: [resUser.data.first_name, Validators.required],
        lastName: [resUser.data.last_name, Validators.required],
        userName: [resUser.data.username, Validators.required],
        // roleUser: [resUser.data.role, Validators.required],
        email: [resUser.data.email, [Validators.required, Validators.email]],
        logo: [''],
        enabled: [true],
      });

      this.garageForm = this.fb.group({
        garageName: ['', Validators.required],
        garageAddress: ['', Validators.required],
        garageOpen: ['', Validators.required],
        garageClose: ['', Validators.required],
        garageLogo: [''],
      });

      if (resUser.data.role === 'MECANO' ) {
        this.selectRole = 'MECANO';
        this.mechanicApi.getMecanoByUserId({userId : resUser.data.id}).subscribe((resMechanic: any) => {
          this.mechanicActual = resMechanic.data[0];
          this.garageForm.get('garageName').setValue(resMechanic.data[0].name);
          this.garageForm.get('garageAddress').setValue(resMechanic.data[0].address);
          this.garageForm.get('garageOpen').setValue(resMechanic.data[0].hourOpen);
          this.garageForm.get('garageClose').setValue(resMechanic.data[0].hourClose);
          console.log([this.garageForm, this.selectRole]);
        });

      } else {
        console.log('Non mecano donc aucun requete  ....');
      }


      this.profileFormPassword = this.fb.group(
        {
          password: ['', [Validators.minLength(6)]],
          verifPassword: [''],
        },
        {
          validator: this.MustMatch('password', 'verifPassword'),
        }
      );
    });


  }

  /**  #################################    FUNCTION    ################################## */

  // Checking file upload via function
  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload, files);
  }


  /** ##################       FUNCTION PROFIL Champ SUBMIT      ##########################   */
  public onSubmit() {

    if (this.fileToUpload !== undefined) {
      const formData = new FormData();
      formData.append('data', this.fileToUpload);

      this.utilisateurApi
        .uploadImageUtilisateur(formData)
        .subscribe((resImage: any) => {

          this.userActualEdit = {
            id: this.userActual.id,
            username: this.profileForm.value.userName,
            first_name: this.profileForm.value.firstName,
            last_name: this.profileForm.value.lastName,
            // role: this.profileForm.value.roleUser,
            email: this.profileForm.value.email,
            logo: resImage.nameFile,
          };

          this.utilisateurApi
            .updateUtilisateur(this.userActualEdit)
            .subscribe((valueRes) => {
              console.log([valueRes, this.userActualEdit]);
              // if success affiche message success and erreur
              if (valueRes) {
                this.afficheNotifSuccee = true;
                this.data.changeNomConnected(this.profileForm.value.userName);
                this.data.changeUrlImageConnected(this.apiUrlImage + resImage.nameFile);
                localStorage.setItem('connectedImage', this.apiUrlImage + resImage.nameFile);
                console.log(this.connectedImage);
                console.log("CHANGE NOM CONNECTED");
                setTimeout(() => {
                  this.afficheNotifSuccee = false;
                  this.changeOnload.emit();
                  console.log(this.connectedNom);
                }, 2000);
              }
            });
        });
      } else {

        this.userActualEdit = {
          id: this.userActual.id,
          username: this.profileForm.value.userName,
          first_name: this.profileForm.value.firstName,
          last_name: this.profileForm.value.lastName,
          email: this.profileForm.value.email,
        };

        // Modification sans photo
        this.utilisateurApi
            .updateUtilisateur(this.userActualEdit)
            .subscribe((valueRes) => {
              console.log([valueRes, this.userActualEdit]);
              if (valueRes) {
                this.afficheNotifSuccee = true;
                this.data.changeNomConnected(this.profileForm.value.userName);
                console.log("CHANGE NOM CONNECTED");
                setTimeout(() => {
                  this.afficheNotifSuccee = false;
                  this.changeOnload.emit();
                  console.log(this.connectedNom);
                }, 2000);
              }
            });
      }
  }


  /** ##################       FUNCTION PASSWORD SUBMIT      ##########################   */
  public onSubmitPassword() {
    if (this.profileFormPassword.value.password !== '') {
      this.userActualEdit = {
        id: this.userActual.id,
        password: this.profileFormPassword.value.password,
      };
      this.utilisateurApi
        .updateUtilisateur(this.userActualEdit)
        .subscribe((valueRes) => {
          if (valueRes) {
            this.afficheNotifSucceeP = true;
            setTimeout(() => {
              this.afficheNotifSucceeP = false;
              this.changeOnload.emit();
              console.log({ data: valueRes, message: 'Changement password avec Succées ....'});
            }, 2000);
          }
        });
    }
  }


  /** ##################       FUNCTION GARAGE SUBMIT      ##########################   */
  public onGarageSubmit() {
    console.warn([this.garageForm.value, this.fileToUploadGarage, this.userActual]);

    if (this.fileToUploadGarage !== undefined) {
      console.log('Change photo ....');
      const formData = new FormData();
      formData.append('data', this.fileToUploadGarage);
      console.log(formData, this.fileToUploadGarage);

      this.mechanicApi
        .uploadImageMechanic(formData)
        .subscribe((resImage: any) => {
            console.log({data: resImage, message: 'Upload Photo garage'});
            this.mechanicActualEdit = {
              id: this.mechanicActual.id,
              name: this.garageForm.value.garageName,
              address: this.garageForm.value.garageAddress,
              hourOpen: this.garageForm.value.garageOpen,
              hourClose: this.garageForm.value.garageClose,
              logo: resImage.nameFile
            };

            this.mechanicApi
            .updateMecano(this.mechanicActualEdit)
            .subscribe((valueRes) => {
              console.log({data: valueRes, message: 'Update mecano  ....'});
              // if success affiche message success and erreur
              if (valueRes) {
                this.afficheNotifSucceeG = true;
                this.data.changeNomConnected(this.profileForm.value.userName);
                this.data.changeUrlImageGarage(this.apiUrlImage + resImage.nameFile);
                localStorage.setItem('connectedImageGarage', this.apiUrlImage + resImage.nameFile);
                console.log(this.connectedImage);
                console.log('CHANGE NOM CONNECTED');
                setTimeout(() => {
                  this.afficheNotifSucceeG = false;
                  this.changeOnload.emit();
                }, 2000);
              }
            });
        });
      } else {
        console.log('No Change photo ....');
        this.mechanicActualEdit = {
          id: this.mechanicActual.id,
          name: this.garageForm.value.garageName,
          address: this.garageForm.value.garageAddress,
          hourOpen: this.garageForm.value.garageOpen,
          hourClose: this.garageForm.value.garageClose
        };

        // Modification sans photo
        this.mechanicApi
            .updateMecano(this.mechanicActualEdit)
            .subscribe((valueRes) => {
              console.log({data: valueRes, message: 'Update mecano  ....'});
              // if success affiche message success and erreur
              if (valueRes) {
                this.afficheNotifSucceeG = true;
                this.data.changeNomConnected(this.profileForm.value.userName);
                setTimeout(() => {
                  this.afficheNotifSucceeG = false;
                  this.changeOnload.emit();
                }, 2000);
              }
            });
      }
  }


  /** ##################       FUNCTION MUSTMATCH SUBMIT      ##########################   */
  public MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  /** ##################       FUNCTION ONCHANGEROLE      ##########################   */
  public async onChangeRole(event, deviceValue) {
    console.log(event, deviceValue.value);
    localStorage.setItem('SelectRole', deviceValue.value);
    this.selectRole = deviceValue.value;
  }


  /** ##################       FUNCTION IMAGE USER      ##########################   */
  public proc_emit_cropped(value) {
    const imageName = 'image-name.png';
    const imageFile = new File([value], imageName, { type: 'image/png' });

    this.fileToUpload = imageFile;
    console.log(this.fileToUpload);
  }


/** ##################       FUNCTION  IMAGE  GARAGE      ##########################   */
  public proc_emit_garage_cropped(value) {
    const imageName = 'image-name.png';
    const imageFile = new File([value], imageName, { type: 'image/png' });
    this.fileToUploadGarage = imageFile;
    console.log(this.fileToUploadGarage);
  }


}
