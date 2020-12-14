import { VehiclesService } from 'src/app/services/vehicles.service';
import { ListeDiagnostic1 } from './../../interfdata/data-diagnostic1';
import {
  NgbModalConfig,
  NgbAccordionConfig,
  NgbModal,
  NgbPanelChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { ListeVehicule } from 'src/app/interfdata/data-vehicule';
import { SectionsService } from 'src/app/services/sections.service';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';

@Component({
  selector: 'app-client-accueil',
  templateUrl: './client-accueil.component.html',
  styleUrls: ['./client-accueil.component.scss'],
})
export class ClientAccueilComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY =
    'BP_dAafsAaiYHnU1mD1sPu6Sr3fQkmIfbxrJvsZjF2ZnDOh_8ZO8CWjrwBaKm4-hhVvXVFRwBaR6Iqv8iLsGYYg';

  @ViewChild('option2') option2: any;
  @ViewChild('connect') connect: any;
  @Output() changeContainer: EventEmitter<any> = new EventEmitter();

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
  public vehiculeMarque2: any;
  public vehiculeModele2: any;
  public vehiculeImmatriculation2: any;
  public interventionAdresse2: any;
  public selectDiag2: any;
  public selectModele: any;
  public loadedMarque = true;
  public intervention: any;
  public listeFilterModel: any;
  public dataVehicle: any;

  // VARIABLE DB data Dynamic
  public listSection: any = []
  public imageSection: any = []
  public apiUrlImage = CONFIGURATION.apiUrlImage

  public showRightMenu: boolean

  /* #################################  CONSCTRUCTOR  ################################## */
  constructor(
    private swPush: SwPush,
    //  private newsletterService: NewsletterService,
    private router: Router,
    private config: NgbModalConfig,
    private configAccordion: NgbAccordionConfig,
    private modalService: NgbModal,
    private vehicleApi: VehiclesService,
    private sectionService: SectionsService,
  ) {
    this.actualStep = 1;

    config.backdrop = 'static';
    config.keyboard = false;
    configAccordion.closeOthers = true;
    configAccordion.type = 'info';
  }

  async ngOnInit(): Promise<void> {
    this.showErreurStep1 = false;
    this.showErreurStep2 = false;
    this.showStep1 = false;
    this.showStep2 = false;
    this.showLogin = false;

    // Data à fournir via WS
    this.DataDiagnostic1 = ListeDiagnostic1;

    this.DataVehicule = ListeVehicule;
    this.DataMarque = await this.filtreMarque(this.DataVehicule);
    this.DataModele = [];

    // this.closeNav();

    this.listeActionAccueil = [
      {
        id: 1,
        description: "Je souhaite de l'aide, je ne sais pas ce qu'a ma voiture",
      },
      {
        id: 2,
        description: "Je sais ce qu'a ma voiture, je choisi mon prestataire",
      },
      { id: 3, description: "Je suis prestataire auto, je m'inscris à G&C" },
    ];

    this.selectDiagnostic1 = { id: 0, description: 'vide' };
    this.actualStep = 1;

    this.selectDiag2 = [];
    console.log(this.selectDiag2);

    // ================ DATA DYNAMIQUE INIT ==================================

    this.loadSection()

    // =========================================================================

  }

  /* #################################  FUNCTION  ################################## */
  public proc_change_page(myroute: string) {
    this.router.navigate([myroute]);
  }

  public proc_set_diagnostic1(diag1) {
    this.selectDiagnostic1 = diag1;
    this.actualStep = 2;

    // Add propriete necessaire
    localStorage.setItem('Diagnostic1Id', this.selectDiagnostic1.id)
    localStorage.setItem(
      'Diagnostic1Action',
      this.selectDiagnostic1.description
    );
  }

  public proc_routeStep(istep) {
    this.actualStep = istep
  }

  public handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0)

    const formData = new FormData()
    formData.append('Utilisateurid', localStorage.getItem('id'))
    formData.append('avatar', this.fileToUpload)
  }

  public open_lg(content) {
    this.modalService.open(content, { windowClass: 'my-modal-lg' })
  }

  public open_lg_option2() {
    this.modalService.open(this.option2, { windowClass: 'my-modal-lg' })
    this.proc_selectOption()
  }

  public open_md(content) {
    this.modalService.open(content, { windowClass: 'my-modal-md' })
    console.log(content);
  }

  public open_md_connect() {
    this.modalService.open(this.connect)
  }

  public open_mdSuscribe() {
    this.modalService.open('suscribe', { windowClass: 'my-modal-md' })
  }

  public openNav() {
    document.getElementById('nav').style.width = '80%'
  }

  // public closeNav() {
  //   document.getElementById('nav').style.width = '0';
  // }

  public beforeChange($event: NgbPanelChangeEvent) { }

  public delete(param) {
    console.log('clic ferme ...')
    this.onClose('')
  }

  // Methode to close Modal
  public onClose(event) {
    this.modalService.dismissAll()
    this.showStep1 = false
    this.showStep2 = false
    console.log('Click dismiss all ...')
  }

  // Affiche du container Step1
  public click_spet1(SelectDiagnostic1Id) {
    localStorage.setItem('SelectDiagnostic1Id', SelectDiagnostic1Id)
    localStorage.setItem('selectDiagnostic2', null)
    this.showStep1 = true
  }

  // check probleme description/photo
  public click_showSpet2() {
    // // console.log([this.problemeDescription, this.problemePhoto]);
    localStorage.setItem('SelectProblemeDescription', this.problemeDescription)
    localStorage.setItem('SelectProblemePhoto', this.problemePhoto)
    if (
      (this.problemeDescription !== undefined &&
        this.problemeDescription !== '') ||
      (this.problemePhoto !== undefined && this.problemePhoto !== '')
    ) {
      this.showStep2 = true
    } else {
      // Affichage erreur
      this.showErreurStep1 = true
      setTimeout(() => {
        this.showErreurStep1 = false
      }, 2000)
    }
  }

  public checkUserConnected() {
    const token = localStorage.getItem('token')
    return token;
  }

  /**
   * Fonction ou on finit de configurer les recherches par rapport à notre vehicule
   */
  public async proc_listeMecano() {

    console.log([this.selectModele, this.DataVehicule])
    const objModel = await this.proc_modele_liste(
      this.selectModele,
      this.DataVehicule
    );

    console.log(localStorage.getItem('selectModel')) 

    if (localStorage.getItem('selectModel') === null) {
      localStorage.setItem('selectModel', JSON.stringify(objModel))
      console.log('Select Vehicule === null donc affection valeur input ... ')
    } else {
      this.DataModele = JSON.stringify(localStorage.getItem('selectModel'))
    }

    // Verification validation Immatriculation / Modele
    let existImmatriculation = false
    if (this.vehiculeImmatriculation !== undefined) {
      if (this.vehiculeImmatriculation !== '') {
        existImmatriculation = true
        console.log('existImmatriculation true')
      }
    }

    let existModele = false
    if (this.DataModele.length !== 0) {
      existModele = true
      console.log('existModele')
    }

    setTimeout(() => {
      if (existImmatriculation === true || existModele === true) {
        // console.log('Critere valide , un des condition est vrais');
        const mytoken = this.checkUserConnected()
        localStorage.setItem('selectAdresse', this.interventionAdresse)
        localStorage.setItem(
          'selectImmatriculation',
          this.vehiculeImmatriculation
        );
        localStorage.setItem('NextActualPage', 'app-liste-mecano') // app-liste-offre
        localStorage.setItem('pageActual', 'app-liste-offre-disponible')
        this.modalService.dismissAll()

        setTimeout(() => {
          this.changeContainer.emit('app-liste-offre-disponible')
        }, 500)
      } else {
        // console.log('Critere invalide');
        this.showErreurStep2 = true
        setTimeout(() => {
          this.showErreurStep2 = false
        }, 2000)
      }
    }, 1000)

  }

  // Callback Function filtre marque
  public async filtreMarque(liste) {
    const listeFiltre = [];
    for (const marque of liste) {
      // tslint:disable-next-line:triple-equals
      if (listeFiltre.length == 0) {
        listeFiltre.push(marque)
      } else {
        let exist = false
        for (const filtre of listeFiltre) {
          // tslint:disable-next-line:triple-equals
          if (marque.marque == filtre.marque) {
            exist = true
          }
        }
        // tslint:disable-next-line:triple-equals
        if (exist == false) {
          listeFiltre.push(marque)
        }
      }
    }
    this.loadedMarque = false
    return listeFiltre
  }

  public async onChangeMarque($event, deviceValue) {
    this.DataModele = await this.filtreModele(
      deviceValue.value,
      this.DataVehicule
    );
    localStorage.setItem('selectBand', this.vehiculeMarque) 
  }

  // Callback Function filtre marque
  public async filtreModele(marqueValue, liste) {
    const listeFiltre = [] 
    for (const modele of liste) {
      if (modele.marque === marqueValue) {
        listeFiltre.push(modele)
      }
    }
    return listeFiltre
  }

  public async onChangeModele($event, deviceValue) {
    console.log(this.vehiculeModele)
    this.selectModele = deviceValue.value
    localStorage.setItem('SelectModele', deviceValue.value)
  }

  public proc_clickImage() { }
  
  /*
   * Function on close formulaire pop up de connection
   */
  public proc_close() {
    this.modalService.dismissAll()

    if (
      localStorage.getItem('token') !== '' &&
      localStorage.getItem('NextActualPage') === 'app-liste-mecano'
    ) {
      this.router.navigateByUrl('listeMecanoOffre')
    } else {
      // Route accueil de l'espace client
      this.router.navigate(['espace-client'])
    }
  }

  public proc_modele_liste(paramModel, paramListe) {
    // console.log('init project ...') 
    for (const modeleTemp of paramListe) {
      if (modeleTemp.modele === paramModel) {
        // console.log(modeleTemp) 
        return modeleTemp
      }
    }
    return null
  }

  public proc_selectOption() {
    // Get option2 || Default 3
    localStorage.setItem('SelectDiagnostic1Id', '3')
    console.log('Set select control ...')
    localStorage.setItem('diag2Header', 'Je sais ce qu\'a ma voiture, je choisis mon prestataire')
  }

  public proc_emit_immatriculation(value) {
    console.log(['Initiate value with  ...', value])
    this.vehiculeImmatriculation = value.immatriculation
    this.vehiculeMarque = value.band
    this.vehiculeModele = value.model
    localStorage.setItem('selectBand', value.band)
    localStorage.setItem('selectModel', value.model) // ???? inutile
    localStorage.setItem('selectModel', JSON.stringify(value))
  }

  public proc_emit_change_marque(value) {
    console.log('emit marque ...')
    console.log(value)
    this.listeFilterModel = value
  }


  public proc_emit_change_modele(value) {
    console.log(value)
    localStorage.setItem('selectModel', value)
    //this.vehicleApi.getVehicleByName(value, this.dataVehicle) 
  }


  public proc_finish_payment(value) {
    console.log(value) 
  }

  // DATA DYNAMIQUE ===========================
  /**
 * loadSection
 */
  public loadSection() {
    this.sectionService.getAllSection()
      .subscribe((res: any) => {
        this.listSection = res.data
        console.log('listSection', this.listSection)
        for (let i = 0; i < this.listSection.length; i++) {
          this.imageSection[i] = this.apiUrlImage + res.data[i].image
        }
      })
  }

  /**
   * closeModalDiagnostic2
   */
  public closeModalDiagnostic2() {
    this.modalService.dismissAll()
    localStorage.removeItem('selectDiagnostic2')
    localStorage.removeItem('numberDiag2')
    localStorage.removeItem('diag2Header')
    localStorage.removeItem('selectBand')
    localStorage.removeItem('selectModel')
    this.showRightMenu = false
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
}
