import { Diagnostic1Service } from './../../services/diagnostic1.service';
import { ListeVehicule } from './../../interfdata/data-vehicule';
import { ListeDiagnostic1 } from './../../interfdata/data-diagnostic1';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ListeOffre } from 'src/app/interfdata/data-listeOffre';

@Component({
  selector: 'app-liste-mecano-offre',
  templateUrl: './liste-mecano-offre.component.html',
  styleUrls: ['./liste-mecano-offre.component.scss'],
})
export class ListeMecanoOffreComponent implements OnInit {
  @ViewChild('detailIntervention') detailIntervention: any;
  @ViewChild('connect') connect: any;

  /* #################################    VARIABLE    ################################## */

  public ValueDiagnostic1: any;
  public ValueDiagnostic: any;

  public DataDiagnostic1: any;
  public DataDiagnostic2: any;
  public DataVehicule: any;
  public DataMarque: any;
  public DataModele: any;
  public DataOffre: any;

  public selectMecano: any;
  public selectDay: any;
  public selectHeure: any;
  public loadedMarque: any;

  // DYNAMIQUE DATA VARIABLE

  public contextHeader: any
  public interventionAdresse: any
  public vehicleBand: any
  public vehicleModel: any

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private diagnostic1Api: Diagnostic1Service
  ) { }

  async ngOnInit(): Promise<void> {
    this.modalService.dismissAll();
    this.DataDiagnostic1 = ListeDiagnostic1;
    this.DataOffre = ListeOffre;

    this.DataVehicule = ListeVehicule;
    this.DataMarque = await this.filtreMarque(this.DataVehicule);
    this.DataModele = [];

    this.ValueDiagnostic1 = { description: '', icone: '' };

    console.log(this.ValueDiagnostic1);
    if (localStorage.getItem('SelectDiagnostic1Id') == 'null') {
      this.ValueDiagnostic1 = {
        description: "Je sais ce qu'a ma voiture, je choisi mon prestataire",
        icone: 'wb_incandescent',
      };
    }

    // INIT DYNAMIQUE DATA 

    this.initializeVariable()
  }

  /* #################################    FONCTION     ################################## */

  public open_lg(content) {
    this.modalService.open(content, { windowClass: 'my-modal-lg' });
  }

  public open_md(content) {
    this.modalService.open(content, { windowClass: 'my-modal-md' });
    console.log(content);
  }

  /**
   * Function open specific detail tab
   */
  public open_md_detailIntervention(mecano, day, heure) {
    this.modalService.open(this.detailIntervention, {
      windowClass: 'my-modal-lg',
    });
    this.selectMecano = mecano;
    console.log(mecano);
    this.selectDay = day;
    this.selectHeure = heure;
  }

  /*
   * Function on close formulaire pop up de connection
   */
  public proc_close() {
    this.modalService.dismissAll();
    console.log(localStorage.getItem('token'));
    if (
      localStorage.getItem('token') !== '' &&
      localStorage.getItem('NextActualPage') === 'app-liste-mecano'
    ) {
      this.router.navigateByUrl('listeMecanoOffre');
    } else {
      // Route accueil de l'espace client
      this.router.navigate(['espace-client']);
    }
  }

  public onClose(value) {
    this.modalService.dismissAll();
  }

  public proc_route_accueil() {
    this.router.navigate(['accueil'])
    localStorage.clear()
  }

  // Callback Function filtre marque
  public async filtreMarque(liste) {
    let listeFiltre = [];
    for (let marque of liste) {
      if (listeFiltre.length == 0) {
        listeFiltre.push(marque);
      } else {
        let exist = false;
        for (let filtre of listeFiltre) {
          if (marque.marque == filtre.marque) {
            exist = true;
          }
        }
        if (exist == false) {
          listeFiltre.push(marque);
        }
      }
    }
    this.loadedMarque = false;
    return listeFiltre;
  }

  public initializeVariable() {
    // Affectation diagnostic1
    for (let diag1 of this.DataDiagnostic1) {
      if (diag1.id === Number(localStorage.getItem('SelectDiagnostic1Id'))) {
        this.ValueDiagnostic1 = diag1;
      }

      this.diagnostic1Api
        .getDiagnostic1sByIdPublic({ id: Number(localStorage.getItem('SelectDiagnostic1Id')) })
        .subscribe((resDiag1: any) => {
          console.log(resDiag1);
          this.ValueDiagnostic1 = resDiag1.data[0];
          console.log(this.ValueDiagnostic1);
        });

    }

    // Affectation vehicule et marque
    this.contextHeader = localStorage.getItem('diag2Header')
    this.vehicleBand = localStorage.getItem('selectBand')
    this.vehicleModel = localStorage.getItem('selectModel')
    this.interventionAdresse = localStorage.getItem('selectAdresse')
  }

  public proc_connexionSuiteAction(
    paramMecano: any,
    paramDay: any,
    paramHeure: any
  ) {

    let interventionDetail = {
      mecano: paramMecano,
      jour: paramDay,
      heure: paramHeure
    }

    // Set selected Mecano |  Heure
    setTimeout(() => {
      localStorage.setItem('selectInterventionMecano', JSON.stringify(interventionDetail));
    }, 1000);

    this.modalService.dismissAll();
    this.modalService.open(this.connect);
  }
}
