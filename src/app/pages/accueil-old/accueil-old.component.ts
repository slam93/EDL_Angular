import { ListeVehicule } from './../../interfdata/data-vehicule';
import { ListeDiagnostic1 } from './../../interfdata/data-diagnostic1';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';

import {
  NgbModalConfig,
  NgbModal,
  NgbPanelChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { SectionsService } from 'src/app/services/sections.service';
import { Diagnostic2Service } from 'src/app/services/diagnostic2.service';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil-old.component.html',
  styleUrls: ['./accueil-old.component.scss'],
  providers: [NgbModalConfig, NgbModal, NgbAccordionConfig],
})
export class AccueilOldComponent implements OnInit {

  @ViewChild('connect') connect: any;

  @ViewChild('suscribe') suscribe: any;

  @ViewChild('option2') option2: any;

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  /* #################################    VARIABLE    ################################## */
  public listeActionAccueil: any[];
  public selectDiagnostic1: any; // localstorage
  public actualStep: any;
  public fileToUpload: File = null;
  public showStep1: boolean;
  public showErreurStep1: boolean;
  public showStep2: boolean;
  public showErreurStep2: boolean;
  public showLogin: boolean;
  public DataDiagnostic1: any;
  public DataDiagnostic2: any;
  public DataListeDiagnostic2: any;
  public DataSection: any = [];
  public DataVehicule: any;
  public DataMarque: any;
  public DataModele: any;
  public problemeDescription: any;
  public problemePhoto: any;
  public vehiculeMarque: any;
  public vehiculeModele: any;
  public vehiculeImmatriculation: any;
  public interventionAdresse: any;
  public problemePhoto2: any;
  public vehiculeMarque2: any;
  public vehiculeModele2: any;
  public vehiculeImmatriculation2: any;
  public interventionAdresse2: any;
  public selectDiag2: any;
  public selectModel: any;
  public loadedMarque = true;
  public listeFilterModel: any;
  public options = {
    componentRestrictions: {
      country: ['FR'],
    },
  };

  // VARIABLE DB data Dynamic
  public listSection: any = []
  public imageSection: any = []
  public apiUrlImage = CONFIGURATION.apiUrlImage
  public sectionId: any
  public listeDiagnosic2: any = []
  public listSkillLoaded: any = []

  public showRightMenu: boolean

  /* #################################  CONSCTRUCTOR  ################################## */
  constructor(
    private swPush: SwPush,
    //  private newsletterService: NewsletterService,
    private router: Router,
    private config: NgbModalConfig,
    private configAccordion: NgbAccordionConfig,
    private modalService: NgbModal,
    private sectionService: SectionsService,
    private diagnostic2Service: Diagnostic2Service,
    private skillService: SkillService
  ) {
    this.actualStep = 1

    config.backdrop = 'static'
    config.keyboard = false

    configAccordion.closeOthers = true
    configAccordion.type = 'info'
  }

  async ngOnInit(): Promise<void> {
    localStorage.setItem('pageActual', 'app-accueil')
    // console.log(localStorage.getItem('token'));

    this.showErreurStep1 = false
    this.showErreurStep2 = false
    this.showStep1 = false
    this.showStep2 = false
    this.showLogin = false
    this.interventionAdresse = 'Paris France';

    // Data à fournir via WS
    this.DataDiagnostic1 = ListeDiagnostic1

    this.DataVehicule = ListeVehicule; // Change server
    this.DataMarque = await this.filtreMarque(this.DataVehicule);
    this.listeFilterModel = this.DataVehicule;
    this.DataModele = [];

    this.closeNav();

    this.listeActionAccueil = [
      {
        id: 1,
        description: 'Je souhaite de l\'aide, je ne sais pas ce qu\'a ma voiture',
      },
      {
        id: 2,
        description: 'Je sais ce qu\'a ma voiture, je choisi mon prestataire',
      },
      {
        id: 3,
        description: 'Je suis prestataire auto, je m\'inscris à G&C'
      }
    ];

    this.selectDiagnostic1 = { id: 0, description: 'vide' };
    this.actualStep = 1;

    this.selectDiag2 = [];
    // console.log(this.selectDiag2);

    // DATA DYNAMIQUE ++++++++++++++++++++++++++++

    this.loadSection()
  }

  public proc_change_page(myroute: string) {
    this.router.navigate([myroute]);
  }

  public proc_set_diagnostic1(diag1) {
    this.selectDiagnostic1 = diag1;
    this.actualStep = 2;

    // Add propriete necessaire
    localStorage.setItem('Diagnostic1Id', this.selectDiagnostic1.id);
    localStorage.setItem(
      'Diagnostic1Action',
      this.selectDiagnostic1.description
    );
  }

  public proc_routeStep(istep) {
    this.actualStep = istep;
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);

    const formData = new FormData();
    formData.append('Utilisateurid', localStorage.getItem('id'));
    formData.append('avatar', this.fileToUpload);
  }

  // Ouverture et fermeture de modal
  public open_lg(content) {
    this.modalService.open(content, { windowClass: 'my-modal-lg' });
  }

  public open_md(content) {
    this.modalService.open(content, { windowClass: 'my-modal-md' });
    // console.log(content);
  }

  public open_md_connect() {
    this.modalService.open(this.connect);
  }

  public open_mdSuscribe() {
    this.modalService.open('suscribe', { windowClass: 'my-modal-md' });
  }

  public open_md_client_suscribe() {
    localStorage.setItem('role', 'CLIENT');
    this.modalService.open(this.suscribe, { windowClass: 'my-modal-md' });
  }

  public open_md_mecano_suscribe() {
    localStorage.setItem('role', 'MECANO');
    this.modalService.open(this.suscribe, { windowClass: 'my-modal-md' });
  }


  public open_lg_option2() {
    this.modalService.open(this.option2, { windowClass: 'my-modal-lg' });
    this.proc_selectOption();
  }

  public openNav() {
    document.getElementById('nav').style.width = '80%';
  }

  public closeNav() {
    document.getElementById('nav').style.width = '0';
  }

  public openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  public closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }

  public beforeChange($event: NgbPanelChangeEvent) { }

  public delete(param) {
    // console.log('clic ferme ...');
    this.onClose('');
  }

  // Methode to close Modal
  public onClose(event) {
    this.modalService.dismissAll();
    this.showStep1 = false;
    this.showStep2 = false;
    // console.log('Click dismiss all ...');
  }

  // Affiche du container Step1
  public click_spet1(SelectDiagnostic1Id) {
    localStorage.setItem('SelectDiagnostic1Id', SelectDiagnostic1Id);
    localStorage.setItem('selectDiagnostic2', null);
    this.showStep1 = true;
  }

  // check probleme description/photo
  public click_showSpet2() {
    // // console.log([this.problemeDescription, this.problemePhoto]);
    localStorage.setItem('SelectProblemeDescription', this.problemeDescription);
    localStorage.setItem('SelectProblemePhoto', this.problemePhoto);
    if (
      (this.problemeDescription !== undefined &&
        this.problemeDescription !== '') ||
      (this.problemePhoto !== undefined && this.problemePhoto !== '')
    ) {
      this.showStep2 = true;
    } else {
      // Affichage erreur
      this.showErreurStep1 = true;
      setTimeout(() => {
        this.showErreurStep1 = false;
      }, 2000);
    }
  }

  public checkUserConnected() {
    const token = localStorage.getItem('token');
    return token;
  }

  /**
   * Fonction ou on finit de configurer les recherches par rapport à notre vehicule
   */
  public async proc_listeMecano() {
    const objModel = await this.proc_modele_liste(this.selectModel, this.DataVehicule);
    console.log(localStorage.getItem('selectModel'));
    if (localStorage.getItem('selectModel') === null) {
      localStorage.setItem('selectModel', JSON.stringify(objModel));
      console.log('Select Vehicule === null donc affection valeur input ... ');
    } else {
      this.DataModele = JSON.stringify(localStorage.getItem('selectModel'));
    }

    // Verification validation Immatriculation / Modele
    let existImmatriculation = false;
    if (this.vehiculeImmatriculation !== undefined) {
      if (this.vehiculeImmatriculation !== '') {
        existImmatriculation = true;
        console.log('existImmatriculation true');
      }
    }

    let existModele = false;
    if (this.DataModele.length !== 0) {
      existModele = true;
      console.log('existModele');
    }

    setTimeout(() => {
      if (existImmatriculation === true || existModele === true) {
        // console.log('Critere valide , un des condition est vrais');
        const mytoken = this.checkUserConnected();
        localStorage.setItem('selectAdresse', this.interventionAdresse);
        localStorage.setItem(
          'selectImmatriculation',
          this.vehiculeImmatriculation
        );
        localStorage.setItem('NextActualPage', 'app-liste-mecano'); // app-liste-offre
        localStorage.setItem('pageActual', 'app-liste-offre-disponible');
        this.modalService.dismissAll();

        setTimeout(() => {
          this.open_md_connect();
        }, 500);
      } else {
        // console.log('Critere invalide');
        this.showErreurStep2 = true;
        setTimeout(() => {
          this.showErreurStep2 = false;
        }, 2000);
      }
    }, 1000);
  }

  // Callback Function filtre marque
  public async filtreMarque(liste) {
    const listeFiltre = [];
    for (const marque of liste) {
      // tslint:disable-next-line:triple-equals
      if (listeFiltre.length == 0) {
        listeFiltre.push(marque);
      } else {
        let exist = false;
        for (const filtre of listeFiltre) {
          // tslint:disable-next-line:triple-equals
          if (marque.marque == filtre.marque) {
            exist = true;
          }
        }
        // tslint:disable-next-line:triple-equals
        if (exist == false) {
          listeFiltre.push(marque);
        }
      }
    }
    this.loadedMarque = false;
    return listeFiltre;
  }

  public async onChangeMarque($event, deviceValue) {
    this.DataModele = await this.filtreModele(
      deviceValue.value,
      this.DataVehicule
    );
    this.listeFilterModel = this.DataModele;
    localStorage.setItem('selectBand', this.vehiculeMarque);
  }

  // Callback Function filtre marque
  public async filtreModele(marqueValue, liste) {
    const listeFiltre = [];
    for (const modele of liste) {
      if (modele.marque === marqueValue) {
        listeFiltre.push(modele);
      }
    }
    return listeFiltre;
  }

  public async onChangeModele($event, deviceValue) {
    // console.log(this.vehiculeModele);
    localStorage.setItem('selectModel', deviceValue.value);
    this.selectModel = deviceValue.value;
  }

  // Function traitement
  public async proc_DataDiagnostic2(listeDataDiagnosic2) {
    let tabContainer = [];
    // console.log(this.DataSection);
    for (let section of this.DataSection) {
      let tabSection = [];
      for (let diagno2 of listeDataDiagnosic2) {
        if (diagno2.section === section.description) {
          tabSection.push(diagno2);
        }
      }
      tabContainer.push({ section, tabSection });
    }
    // console.log(tabContainer);
    return tabContainer;
  }

  public proc_clickImage() { }

  /*
   * Function on close formulaire pop up de connection
   */
  public proc_close() {
    this.modalService.dismissAll();
    // console.log(localStorage.getItem('token'));
    if (
      localStorage.getItem('token') == null &&
      localStorage.getItem('NextActualPage') !== 'app-liste-mecano'
    ) {
      this.modalService.dismissAll();
    } else if (
      localStorage.getItem('token') == null &&
      localStorage.getItem('NextActualPage') === 'app-liste-mecano'
    ) {
      this.router.navigateByUrl('listeMecanoOffre');
    } else if (localStorage.getItem('token') !== null) {
      // Route accueil de l'espace client
      this.router.navigate(['espace-client']);
    } else {
      this.modalService.dismissAll();
    }
  }

  public handleAddressChange(address: Address) {
    // console.log(address);
    // console.log('change ...');
  }

  // Validation d'une inscription
  public proc_inscriptionValide() {
    this.modalService.dismissAll();
    // Affichage notification
  }

  public proc_modele_liste(paramModel, paramListe) {
    console.log(['Debut call proc_modele_liste', paramListe]);
    for (const modeleTemp of paramListe) {
      console.log(modeleTemp.model + " === " + paramModel);
      if (modeleTemp.model === paramModel) {
        console.log(true);
        return modeleTemp;
      }
    }
    console.log('Fin call proc_modele_liste');
    return null;
  }


  public proc_selectOption() {
    // Get option2 || Default 3
    localStorage.setItem('SelectDiagnostic1Id', '3')
    localStorage.setItem('diag2Header', 'Je sais ce qu\'a ma voiture, je choisis mon prestataire')
    console.log('Set select control ...')
  }


  public proc_emit_immatriculation(value) {
    console.log(['Initiate value with  ...', value]);
    this.vehiculeImmatriculation = value.immatriculation;
    this.vehiculeMarque = value.band;
    this.vehiculeModele = value.model;
    localStorage.setItem('selectBand', value.band);
    localStorage.setItem('selectModel', value.model);
    localStorage.setItem('selectModel', JSON.stringify(value));
  }


  public proc_emit_change_marque(value) {
    console.log('emit marque ...');
    console.log(value);
    this.listeFilterModel = value;
  }


  public proc_emit_change_modele(value) {
    // add selectModel    |  option change here get from liste
    console.log(value);
    let mymodel = this.proc_modele_liste(value, this.listeFilterModel);
    localStorage.setItem('selectModel', JSON.stringify(mymodel));
  }

  // DATA DYNAQUE ==============================
  /**
   * loadSection
   */
  public loadSection() {
    this.sectionService.publicGetAllSection()
      .subscribe((res: any) => {
        this.listSection = res.data
        console.log('listSection', this.listSection)
        for (let i = 0; i < this.listSection.length; i++) {
          this.imageSection[i] = this.apiUrlImage + res.data[i].image
        }
      })
  }

  /**
 * showFormular
 */
  public showRightFormular($event) {
    let number = Number(localStorage.getItem('numberDiag2'))
    if (number == 0) {
      this.showRightMenu = false
    } else {
      this.showRightMenu = true
    }
  }

  /**
  * closeModalDiagnostic2
  */
  public closeModalDiagnostic2() {
    this.modalService.dismissAll()
    localStorage.clear()
    this.showRightMenu = false
  }
}
