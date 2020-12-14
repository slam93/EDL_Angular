import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  /* #################################    VARIABLE    ################################## */
  public container: string;
  public pageActual: string;
  public pageSection: string;
  public username: string;
  public numberMessage: number;
  public numberNotification: number;
  public connectedNom: any;
  public connectedImage: any;
  public interventionSelected: any;

  public userRole: any;
  public userRoleMecano: any;
  public userRoleClient: any;

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(private router: Router, private data: DataService) {
    // Pages default initialisation
    this.pageSection = 'pages'; //   pages |  composant  |   app-client-accueil
    // this.pageActual = 'app-client-accueil';
    // this.pageActual = 'app-liste-offre-disponible';

    // localStorage.setItem('pageActual', 'app-client-accueil');
    localStorage.setItem('pageSection', 'pages');
    this.username = 'unkown';

    this.numberMessage = 0;
    this.numberNotification = 0;

    console.log(localStorage.getItem('container'));
    if (localStorage.getItem('container') == null) {
      this.container = 'container1';
      localStorage.setItem('container', '1');
    }
  }

  ngOnInit(): void {

    // get role ADMIN
    this.userRole = this.userRoleMecano = this.userRoleClient = false;
    setTimeout(() => {
      this.getRoleAdmin();
    }, 1000);

    // Initialisation profil user
    this.data.currentNomConnected.subscribe(
      (resNom) => (this.connectedNom = resNom)
    );
    this.data.currentUrlImageConnected.subscribe(
      (resImage) => (this.connectedImage = resImage)
    );

    // Configuration de chargement de page
    if (localStorage.getItem('connectedImage') !== null) {
      this.connectedImage = localStorage.getItem('connectedImage');
    }

    if (localStorage.getItem('connectedNom') !== null) {
      this.connectedNom = localStorage.getItem('connectedNom');
    }

    console.log(localStorage.getItem('pageActual'));
    if (localStorage.getItem('pageActual') === 'app-client-historique') {
      this.container = 'container2';
      localStorage.setItem('container', '2');
    }
    console.log(localStorage.getItem('pageActual'));

    setTimeout(() => {
      console.log(this.connectedImage);
    }, 5000);

    this.pageActual = localStorage.getItem('pageActual');
    console.log(localStorage.getItem('pageActual'), this.container);

    // Set container on chargement
    this.setContainerLocalStorage();

    // get username connected
    this.changeOnload('param');
    console.log(
      localStorage.getItem('container'),
      localStorage.getItem('pageActual')
    );
  }

  /* ##########################################     FUNCTION     ###############################################*/

  public setContainerLocalStorage() {
    let valContainer = localStorage.getItem('container');

    switch (valContainer) {
      case '1': {
        this.container = 'container1';
        break;
      }
      case '2': {
        this.container = 'container2';
        break;
      }
      default: {
        this.container = 'container1';
        break;
      }
    }
  }

  public changeContainer(value: string) {
    this.pageActual = value;
    console.log('Change container here ', this.pageActual);
    localStorage.setItem('pageActual', this.pageActual);
    this.ngOnInit();
  }

  public changechat(value: any) {
    this.interventionSelected = value;
    this.ngOnInit();
  }

  public proc_clickDeconnexion() {
    this.router.navigate(['']);
    localStorage.removeItem('token');
    setTimeout(() => {
      localStorage.removeItem('token');
      localStorage.clear();
      console.log('Deconnexion en cours  ......');
    }, 1000);
  }

  public proc_route_set(componentName: string, containerNum: number) {
    console.log(componentName);
    this.pageActual = componentName;
    localStorage.setItem('pageActual', componentName);
    if (containerNum === 1) {
      this.container = 'container1';
      localStorage.setItem('container', '1');
    }
    if (containerNum === 2) {
      this.container = 'container2';
      localStorage.setItem('container', '2');
    }
  }

  public changeOnload(param: any) {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log([user.userName, user.userRole]);
    this.username = user.userName;
    setTimeout(() => {
      this.username = user.userName;
    }, 500);
    console.log('appel function ChangeOnload ...', this.connectedNom);
    //this.data.changeNomConnected(localStorage.getItem('username'));
  }

  /**
   * Function get Type User
   */
  public getRoleAdmin() {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log([user.userName, user.userRole]);

    let userRole = user.userRole;
    if (userRole === 'ADMIN') {
      this.userRole = true;
      this.userRoleClient = this.userRoleMecano = false;
    } else if (userRole === 'MECANO') {
      this.userRoleMecano = true;
      this.userRole = this.userRoleClient = false;
    } else if (userRole === 'CLIENT') {
      this.userRoleClient = true;
      this.userRole = this.userRoleMecano = false;
    } else {
      console.warn('Probleme : Role non existant  ....');
    }
  }
}
