import { VehiclesService } from 'src/app/services/vehicles.service';
import { Router } from '@angular/router';
import { InterventionService } from './../../services/intervention.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListeOffre } from './../../interfdata/data-listeOffre';
import { ListeDiagnostic1 } from './../../interfdata/data-diagnostic1';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Diagnostic1Service } from 'src/app/services/diagnostic1.service';
import { SkillService } from 'src/app/services/skill.service';
import { MecanoService } from "../../services/mechanics.service";

@Component({
  selector: 'app-liste-offre-disponible',
  templateUrl: './liste-offre-disponible.component.html',
  styleUrls: ['./liste-offre-disponible.component.scss'],
})
export class ListeOffreDisponibleComponent implements OnInit {

  @ViewChild('detailIntervention') detailIntervention: any;
  @Output() changeContainer: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */

  public ValueDiagnostic1: any;
  public DataDiagnostic1: any;
  // public DataVehicule: any;
  // public DataMarque: any;
  // public DataModele: any;
  public DataOffre: any;
  public dataVehicles: any;

  public loadedMarque: any;
  public selectMecano: any;
  public selectDay: any;
  public selectHeure: any;

  // ===================== variable data dynamique
  public listSkillbyDiagnostic2: any = []
  public listUserId: any = []
  public listMechanics: any = []

  public contextHeader: any
  public interventionAdresse: any
  public vehicleBand: any
  public vehicleModel: any

  public listeInterventionMecano: any = []
  public dateStart: any
  public dateEnd: any
  public hourOpen: any
  public hourClose: any

  public mechanicId: any
  public mechanicName: any
  public mechanicAdresse: any
  public diagnostic2Price: any
  public diagnostic2Description: any
  public vehicleId: any
  public userMech: any
  public arrayDiagnostic2: any

  /* #################################    CONSTRUCTOR    ################################## */
  constructor(
    private modalService: NgbModal,
    private diagnostic1Api: Diagnostic1Service,
    private interventionService: InterventionService,
    private vehicleApi: VehiclesService,
    private router: Router,
    private skillService: SkillService,
    private mechanicsService: MecanoService
  ) {
    this.ValueDiagnostic1 = { description: '', icone: '' };
  }

  async ngOnInit(): Promise<void> {

    // Initialize data vehicles
    this.vehicleApi.getAllVehiclesPublic().subscribe((resVehicles: any) => {
      console.log(resVehicles.data);
      this.dataVehicles = resVehicles.data;
    })

    this.DataDiagnostic1 = ListeDiagnostic1

    // this.DataMarque = await this.filtreMarque(this.DataVehicule);
    // this.DataModele = [];

    // Affectation des variables
    this.ValueDiagnostic1 = { description: '', icone: '' };

    console.log(this.ValueDiagnostic1)

    // ==================== data dynamique ==============
    this.loadListOffer()
    this.initializeVariable() // => dymanic !!!! 
    this.contextHeader = localStorage.getItem('diag2Header')

    this.dateStart = new Date()
    this.dateEnd = new Date().setDate(this.dateStart.getDate() + 2)
    this.hourOpen = '08:00'
    this.hourClose = '16:00'
  }

  /* #################################    FONCTION    ################################## */
  // Callback Function filtre marque
  public async filtreMarque(liste) {
    let listeFiltre = [];
    for (let marque of liste) {
      if (listeFiltre.length === 0) {
        listeFiltre.push(marque);
      } else {
        let exist = false;
        for (let filtre of listeFiltre) {
          if (marque.marque === filtre.marque) {
            exist = true;
          }
        }
        if (exist === false) {
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
      console.log('Affectation value diagnostic1 ...');
      if (diag1.id === Number(localStorage.getItem('SelectDiagnostic1Id'))) {
        this.ValueDiagnostic1 = diag1;
      }

      this.diagnostic1Api
        .getDiagnostic1sById({ id: Number(localStorage.getItem('SelectDiagnostic1Id')) })
        .subscribe((resDiag1: any) => {
          console.log(resDiag1);
          this.ValueDiagnostic1 = resDiag1.data[0];
          console.log(this.ValueDiagnostic1);
        });

    }

    // Affectation vehicule et marque
    this.vehicleBand = localStorage.getItem('selectBand')
    this.vehicleModel = localStorage.getItem('selectModel')
    this.interventionAdresse = localStorage.getItem('selectAdresse')
  }

  public proc_route_accueil() {
    console.log('Clic route accueil ...');
    this.changeContainer.emit('app-client-accueil')
    localStorage.removeItem('selectDiagnostic2')
    localStorage.removeItem('numberDiag2')
  }

  public async proc_connexionSuiteAction(
    paramMecano: any,
    paramDay: any,
    paramHeure: any
  ) {
    console.log('Create intervention .... ');

    let interventionDetail = {
      mecano: paramMecano,
      jour: paramDay,
      heure: paramHeure
    }

    // Set selected Mecano |  Heure

    localStorage.setItem('selectInterventionMecano', JSON.stringify(interventionDetail));

    // Insertion de l'intervention
    let intervention = await this.getInterventionLocal();
    console.log(intervention);
    this.interventionService.createIntervention(intervention).subscribe((resultInterventtion) => {

      //   Configuration  last intervention
      console.log(resultInterventtion);
      localStorage.setItem('showLastIntervention', 'true');

      //   Change container manual   |   Mettre fonction
      localStorage.setItem('container', '2');
      localStorage.setItem('pageActual', 'app-client-historique');

    });


    setTimeout(() => {
      this.changeContainer.emit('app-client-historique');
      console.log('Go to liste ...');
      this.modalService.dismissAll();
      console.log([localStorage.getItem('container'), localStorage.getItem('pageActual')]);
    }, 1500);

  }


  public async getInterventionLocal() {
    // param  intervention   |    doit s'effectuer après Me
    console.log(localStorage.getItem('SelectDiagnostic1Id'));
    let objectDiagnostic1Id = 0;
    if (Number(localStorage.getItem('SelectDiagnostic1Id')) !== 3) {
      objectDiagnostic1Id = Number(localStorage.getItem('SelectDiagnostic1Id'));
    } else {
      // Je sais ce qu'a ma voiture    |  check value in BD 
      objectDiagnostic1Id = 3;
    }

    // let objectModele = await JSON.parse(localStorage.getItem('selectVehicle'));
    // let objectModele = localStorage.getItem('selectVehicle');
    // console.log([objectModele.model, this.dataVehicles]);
    let objectModeleBd = this.vehicleApi.getVehicleByName(localStorage.getItem('selectVehicle'), this.dataVehicles);
    let objectIntervention = await JSON.parse(localStorage.getItem('selectInterventionMecano'));
    let objectDiagnostic2 = localStorage.getItem('selectDiagnostic2');
    let stringDiag2 = '';
    for (let diagnostic2 of objectDiagnostic2) {
      stringDiag2 = stringDiag2 + diagnostic2 + ' ';
    }

    let intervention = {
      dateInterventionBegin: new Date(),
      dateInterventionEnd: new Date(),
      address: localStorage.getItem('selectAdresse'),
      problemDescription: localStorage.getItem('SelectProblemeDescription'),
      problemPhoto: localStorage.getItem('SelectProblemePhoto'),
      userId: Number(localStorage.getItem('userId')),
      diagnostic1Id: Number(localStorage.getItem('SelectDiagnostic1Id')),
      diagnostic2Id: localStorage.getItem('selectDiagnostic2'),
      diagnostic2: stringDiag2,
      carId: localStorage.getItem('carId'),
      categoryId: 1,
      vehicleId: objectModeleBd.id,
      mechanicId: objectIntervention.mecano.id,
      statePayment: 'EN ATTENTE'
    };
    console.log(intervention);

    return intervention;
  }


  /**
   * Function open specific detail tab
   */
  public open_md_detailIntervention(mecano, day, heure) {
    this.modalService.open(this.detailIntervention, { windowClass: 'my-modal-lg' });
    this.selectMecano = mecano;
    this.selectDay = day;
    this.selectHeure = heure;
  }

  public proc_close() {
    this.modalService.dismissAll();
  }

  /**
   * loadListOffer
   */
  public loadListOffer() {
    let dataDiagnostic2Id = (localStorage.getItem('selectDiagnostic2')).split(',')
    let body = {
      diagnostic2Id: dataDiagnostic2Id
    }

    this.skillService.publicGetSkillsByDiagnostic2Selected(body)
      .subscribe((res: any) => {
        this.listSkillbyDiagnostic2 = res.data
        console.log('listSkillbyDiagnostic2', this.listSkillbyDiagnostic2)
        for (let i = 0; i < this.listSkillbyDiagnostic2.length; i++) {
          this.listUserId[i] = res.data[i].userId

          let body = {
            userId: this.listUserId[i]
          }
          this.mechanicsService.getMecanoByUserId(body)
            .subscribe((res: any) => {
              this.listMechanics[i] = res.data
              console.log('listMechanics', this.listMechanics)
            })

          this.interventionService.getByMechanicIdInterventions({ mechanicId: this.listUserId[i] })
            .subscribe((resIntervention: any) => {
              this.listeInterventionMecano = resIntervention.data
              console.log('listeInterventionMecano', this.listeInterventionMecano)
            })
        }
      })
  }

  /**
   * showPopupInvervention
   */
  public async showPopupInvervention(param: any) {
    console.log(param)
    this.mechanicsService.getMecanoByUserId({ userId: param.userId })
      .subscribe((res: any) => {
        this.mechanicId = res.data[0].id
        this.mechanicName = res.data[0].name
        this.mechanicAdresse = res.data[0].address
      })

    this.diagnostic2Price = param.diagnostic2.price
    this.diagnostic2Description = param.diagnostic2.description
    this.userMech = param.userId
    this.arrayDiagnostic2 = param.diagnostic2Id
    this.vehicleId = param.vehicleId

    let day  = JSON.parse(localStorage.getItem('date'))
    this.selectDay = day.day
    this.selectHeure = day.heure
    await <any>this.modalService.open(this.detailIntervention, { windowClass: 'my-modal-lg' })
  }

  /**
   * addIntervention
   */
  public addIntervention() {
    let body = {
      dateInterventionBegin: this.selectDay,
      dateInterventionEnd: this.selectDay,
      address: localStorage.getItem('selectAdresse'),
      problemDescription: localStorage.getItem('diag2Header'),
      userMec: this.userMech,
      statePayment: 'EN ATTENTE',
      diagnostic2: this.arrayDiagnostic2,
      userId: localStorage.getItem('userId'),
      mechanicId: this.mechanicId,
      vehicleId: this.vehicleId,
      noteMec: 1
    }

    this.interventionService.createIntervention(body)
      .subscribe((resultInterventtion) => {
        //   Configuration  last intervention
        console.log(resultInterventtion);
        localStorage.setItem('showLastIntervention', 'true')

        //   Change container manual   |   Mettre fonction
        localStorage.setItem('container', '2')
        localStorage.setItem('pageActual', 'app-client-historique')
      })

      setTimeout(() => {
        this.changeContainer.emit('app-client-historique')
        console.log('Go to liste ...')
        this.modalService.dismissAll()
        console.log([localStorage.getItem('container'), localStorage.getItem('pageActual')])
      }, 1500)
  }

}
