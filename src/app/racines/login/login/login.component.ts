import { VehiclesService } from 'src/app/services/vehicles.service';
import { DataService } from './../../../services/data.service';
import { InterventionService } from './../../../services/intervention.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SocialUser } from 'angularx-social-login';
import { UtilisateurService } from './../../../services/utilisateur.service';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public email: string;
  public password: string;
  public connect: any;
  public recuperePass = false;
  public afficheNotifSuccee = false;
  public user: SocialUser;
  public afficheChargement: any;
  public afficheNotifDanger: any;
  public errorMail: any;
  public InputPassword: any;
  public messageErreur: any;
  public resultMe: any;
  public connectedNom: any;
  public connectedImage: any;
  public apiUrlImage = CONFIGURATION.apiUrlImage
  public dataVehicles: any;

  /* #################################    CONSTRUCTEUR    ################################## */
  constructor(
    private authApi: AuthService,
    private utilisateurApi: UtilisateurService,
    private interventionApi: InterventionService,
    private vehicleApi: VehiclesService,
    private router: Router,
    private modalService: NgbModal,
    private data: DataService
  ) {
    this.afficheNotifDanger = false;
    this.afficheChargement = false;
    this.errorMail = false;
    this.InputPassword = true;
    this.messageErreur = 'Erreur par defaut';
  }

  async ngOnInit() {

    // Initialize data vehicles
    this.vehicleApi.getAllVehiclesPublic().subscribe((resVehicles:any)=>{
      console.log(resVehicles.data);
      this.dataVehicles = resVehicles.data;
    });

    // Initialisation profil user
    this.data.currentNomConnected.subscribe(
      (resNom) => (this.connectedNom = resNom)
    );
    this.data.currentUrlImageConnected.subscribe(
      (resImage) => (this.connectedImage = resImage)
    );

    this.email = '';
    this.password = '';

    // if (await this.checkIfUserAuthenticated()) {
    //    this.user = this.authInstance.currentUser.get();
    // }
  }

  /* #################################    FUNCTION    ################################## */
  public proc_change_page(myroute: string) {
    console.log(myroute);
    this.router.navigate([myroute]);
  }

  /**
   * affiche le formulaire de recuperation mot de passe
   */
  public show() {
    this.recuperePass = true;
  }

  /**
   * changement mot de passe
   * envoie un email avec un mot de passe temoraire
   */
  public proc_pass() {
    this.utilisateurApi.resetPassword(this.email).subscribe((data) => {
      console.log('the data', data);
      this.recuperePass = false;
      this.afficheNotifSuccee = true;
    });
  }

  public proc_login() {
    if (this.errorMail === true) {
      // Error mail exists ...
      console.log('Erreur email ... ');
    } else {

      /* ################         Traitement login normal            ####################### */
      this.afficheChargement = true;
      console.log(
        'click login: ' + this.email + ' ' + this.password,
        localStorage.getItem('NextActualPage')
      );
      this.connect = { email: this.email, password: this.password };

      this.utilisateurApi
        .loginUtilisateur(this.connect)
        .subscribe(async (resultConnect: any) => {

          console.log('resultat con', resultConnect);
          localStorage.setItem('token', resultConnect.data);
          console.log([localStorage.getItem('pageActual'), localStorage.getItem('NextActualPage')]);

          switch (resultConnect.message) {
            case 'success': {

              /* ############  cas ou connexion ou on a deja fait l'intervention  ############## */
              if (localStorage.getItem('NextActualPage') === 'app-liste-mecano') {
                localStorage.setItem('pageActual', 'app-client-historique');

                // Payement commission avant

                // Insertion de l'intervention
                this.getInterventionLocal();
                let intervention = await this.getInterventionLocal();
                this.interventionApi.createIntervention(intervention).subscribe((resultInterventtion) => {
                  console.log(resultInterventtion);
                  localStorage.setItem('showLastIntervention', 'true');
                });

                setTimeout(() => {
                  this.router.navigate(['espace-client'])
                  this.modalService.dismissAll()
                  this.close.emit(null)
                }, 1900)

              }

              /* ############  cas 1  ############## */
              else if (localStorage.getItem('pageActual') !== 'app-accueil') {
                console.log('Dans le cas 1, ....  (different de accueil only)');
                localStorage.setItem('pageActual', 'app-client-accueil');
              }

              /* ############  cas 2  ############## */
              else {
                console.log('Dans le cas 2, .....  (app-client-accueil)');
                localStorage.setItem('pageActual', 'app-client-accueil');
              }

              setTimeout(() => {
                // Route pour le container (jouer sur la pageActual )
                localStorage.setItem('pageSection', 'composant')
                this.router.navigate(['espace-client'])
              }, 1900);

              // appel service
              this.proc_login_get_me(resultConnect);

                break;
            } 
            case 'password not same': {
                /*  ##########################    Erreur mot de passe     #############################  */
                this.messageErreur = 'Mot de passe est incorrect';
                this.afficheChargement = false;
                this.afficheNotifDanger = true;
                setTimeout(() => {
                  this.afficheNotifDanger = false;
                }, 3000);
                break;
            } 
            case 'user not in db': {
                /* ##########################    Utilisateur pas dans la BD     #############################  */
                this.messageErreur = 'L\'utilisateur spécifié ne possède pas un profil valide';
                this.afficheChargement = false;
                this.afficheNotifDanger = true;
                setTimeout(() => {
                  this.afficheNotifDanger = false;
                }, 3000);
              break;
          }
            default: {
                console.warn('############     case not identify      ############');
                /* ##########################    Autre erreur non gérer    #############################  */
                this.messageErreur = 'Autre erreur';
                this.afficheChargement = false;
                this.afficheNotifDanger = true;
                setTimeout(() => {
                  this.afficheNotifDanger = false;
                }, 3000);
                break;
          }
        }

        })
    }
  }

  private proc_login_get_me(resultConnect: any) {
    this.utilisateurApi.getUtilisateurMe().subscribe((result: any) => {
      console.log(result);
      this.resultMe = result;
      localStorage.setItem('userId', result.data.id);
      this.testConnect(resultConnect);

      // tableau storage
      let user = [];
      let userName = '';
      if (result.data.username === '' || result.data.username == null) {
        // Cas ou username n'existe pas
        userName = result.data.first_name + ' ' + result.data.last_name;
        let userData = {
          userName: result.data.first_name + ' ' + result.data.last_name,
          userRole: result.data.role,
          userFirstname: result.data.first_name,
          email: result.data.email,
          userLastname: result.data.last_name,
          userProvider: result.data.provider,
          userFirstnameGoogle: result.data.firstnamegoogle,
          userLastnameGoogle: result.data.lastnamegoogle,
          userFirstnameFb: result.data.firstnamefb,
          userLastnameFb: result.data.lastnamefb,
          userTimeOpening: result.data.timeOpening,
          userTimeClosing: result.data.timeClosing,
          userDayWorking: result.data.dayWorking,
          userRcis: result.data.rcis,
          userStat: result.data.stat,
          userSocietyName: result.data.societyName,
          userEnabled: result.data.enabled
        };
        user.push(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        // this.logoutDisabledAccount(result.data.enabled)
        this.data.changeNomConnected(userName);
        console.log('CHANGE NOM CONNECTED');
      } else {
        // Cas ou username existe normalement
        localStorage.setItem('userId', result.data.id);
        this.data.changeNomConnected(result.data.username);
        console.log('CHANGE NOM CONNECTED');

        let userData = {
          userName: result.data.username,
          userRole: result.data.role,
          userFirstname: result.data.first_name,
          email: result.data.email,
          userLastname: result.data.last_name,
          userProvider: result.data.provider,
          userFirstnameGoogle: result.data.firstnamegoogle,
          userLastnameGoogle: result.data.lastnamegoogle,
          userFirstnameFb: result.data.firstnamefb,
          userLastnameFb: result.data.lastnamefb,
          userTimeOpening: result.data.timeOpening,
          userTimeClosing: result.data.timeClosing,
          userDayWorking: result.data.dayWorking,
          userRcis: result.data.rcis,
          userStat: result.data.stat,
          userSocietyName: result.data.societyName,
          userEnabled: result.data.enabled
        };
        user.push(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        this.logoutDisabledAccount(result.data.enabled);
      }

      localStorage.setItem('connectedImageGarage', 'assets/images/garage-logo.jpg');

      if (result.data.logo === null || result.data.logo === '') {
        this.data.changeUrlImageConnected('assets/css/images/avatar.png');
        localStorage.setItem('connectedImage', 'assets/css/images/avatar.png');
        localStorage.setItem('connectedNom', result.data.username);
      } else {
        this.data.changeUrlImageConnected(
          this.apiUrlImage + result.data.logo
        );
        localStorage.setItem('connectedImage', this.apiUrlImage + result.data.logo);
        localStorage.setItem('connectedNom', result.data.username);
      }
      console.log(this.connectedImage);
      setTimeout(() => {
        console.log('Close chargement ...');
        this.afficheChargement = false;
        this.modalService.dismissAll();
        this.close.emit(null);
      }, 1000);
    });
  }

  // FONCTION STOP LOGIN USER DESACTIVE
  public logoutDisabledAccount(enabled: boolean) {
    if (enabled == false) {
      console.log('=====> compte désactivé')

      // procedure désable account
      this.afficheNotifDanger = true
      this.messageErreur = 'Ce compte a été désactivé'
      setTimeout(() => {
        this.router.navigateByUrl('accueil')
        localStorage.clear()
      }, 2000);

    } else {
      console.log('compte actif')
    }
  }

  private async testConnect(resultConnect: any) {
    if (resultConnect.message === 'success') {
      // localStorage.setItem('token', resultConnect.data);
      console.log([
        localStorage.getItem('pageActual'),
        localStorage.getItem('NextActualPage'),
      ]);

      /* ############  cas ou connexion ou on a deja fait l'intervention  ############## */
      if (localStorage.getItem('NextActualPage') === 'app-liste-mecano') {
        localStorage.setItem('pageActual', 'app-client-historique');

        // Payement commission sur le détail
        // Insertion de l'intervention
        this.getInterventionLocal();
        let intervention = await this.getInterventionLocal();
        console.log(intervention);
        this.interventionApi
          .createIntervention(intervention)
          .subscribe((resultInterventtion) => {
            console.log(resultInterventtion);
            localStorage.setItem('showLastIntervention', 'true');
          });

        this.router.navigate(['espace-client']);
        this.modalService.dismissAll();
        this.close.emit(null);
      } else if (localStorage.getItem('pageActual') !== 'app-accueil') {
        /* ############  cas 1  ############## */
        console.log('Dans le cas 1, ....  (different de accueil only)');
        localStorage.setItem('pageActual', 'app-client-accueil');
      } else {
        /* ############  cas 2  ############## */
        console.log('Dans le cas 2, .....  (app-client-accueil)');
        localStorage.setItem('pageActual', 'app-client-accueil');
      }

      localStorage.setItem('pageSection', 'composant');
      this.router.navigate(['espace-client']); // Route pour le container (jouer sur la pageActual )
    }
  }

  public proc_connec_google() {
    console.log('connection google...');
  }

  public onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  public validateEmail() {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.email.match(mailformat)) {
      this.errorMail = false;
      return true;
    } else {
      this.errorMail = true;
      return false;
    }
  }

  public verifEmail() {
    this.validateEmail();
  }

  /** Function toggle password */
  public toggleInputPassword() {
    if (this.InputPassword === true) {
      this.InputPassword = false;
    } else {
      this.InputPassword = true;
    }
  }

  public async getInterventionLocal() {

    // param  intervention   |    doit s'effectuer après Me |  id Vehicle not cars 
    let objectModele = JSON.parse(localStorage.getItem('selectVehicle'));
    let objectModeleBd =  this.vehicleApi.getVehicleByName(objectModele.model, this.dataVehicles);
    console.log(objectModeleBd);
    console.log(localStorage.getItem('userId')); // Requiert by API
    console.log(localStorage.getItem('SelectDiagnostic2'));
    let objectIntervention = JSON.parse(localStorage.getItem('selectInterventionMecano'));

    let intervention = {
      dateInterventionBegin: new Date(),
      dateInterventionEnd: new Date(),
      address: localStorage.getItem('selectAdresse'),
      problemDescription: localStorage.getItem('SelectProblemeDescription'),
      problemPhoto: localStorage.getItem('SelectProblemePhoto'),
      userId: Number(localStorage.getItem('userId')), // this.resultMe.data.id
      diagnostic1Id: Number(localStorage.getItem('SelectDiagnostic1Id')),
      diagnostic2Id: localStorage.getItem('SelectDiagnostic2Id'),
      diagnostic2: localStorage.getItem('selectDiagnostic2'),
      carId: localStorage.getItem('carId'),
      categoryId: 1,
      vehicleId: objectModeleBd.id,
      mechanicId: objectIntervention.mecano.id,
      statePayment: 'EN ATTENTE'
    };

    return intervention;
  }



}
