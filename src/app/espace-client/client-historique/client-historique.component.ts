import { Diagnostic1 } from './../../interfaces/diagnostic1';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListeVehicule } from './../../interfdata/data-vehicule';
import { ListeOffre } from './../../interfdata/data-listeOffre';
import { ListeDiagnostic2 } from './../../interfdata/data-diagnostic2';
import { ListeDiagnostic1 } from './../../interfdata/data-diagnostic1';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { ListeInterventionHistorique } from './../../interfdata/data-intervention-historique';
import { Component, OnInit, ViewChild,  Output, EventEmitter } from '@angular/core';
import { InterventionService } from 'src/app/services/intervention.service';
import { Diagnostic1Service } from 'src/app/services/diagnostic1.service';
import { Diagnostic2Service } from 'src/app/services/diagnostic2.service';

@Component({
  selector: 'app-client-historique',
  templateUrl: './client-historique.component.html',
  styleUrls: ['./client-historique.component.scss'],
})
export class ClientHistoriqueComponent implements OnInit {
  @Output() changechat = new EventEmitter<any>();
  @ViewChild('detailIntervention') detailIntervention: any;

  /* #################################    VARIABLE    ################################## */
  // public dtOptions: Promise<DataTables.Settings>;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject();
  public frenchDT: any;
  public ListeVoiture: any;
  public listeHistorique: any;
  public DataDiagnostic1: any;
  public DataDiagnostic2: any;
  public DataInterventionDefault: any;
  public DataInterventionReglage: any;
  public DataVehicule: any;
  public DataMarque: any;
  public DataModele: any;
  public DataOffre: any;
  public ValueDiagnostic1: any;
  public ValueDiagnostic2: any;
  public ValueDiagnostic: any;
  public ValueVehicule: any;
  public ValueMarque: any;
  public ValueImmatriculation: any;
  public ValueModele: any;
  public ValueAdresse: any;
  public selectMecano: any;
  public selectDay: any;
  public selectHeure: any;
  public showPaypal: any;
  public existImmatriculation: any;
  public intervention: any;
  public total: number;
  public selectHistorique: any;
  public existIntervention: boolean;

  // Variable property for star
  public title = 'star-angular';
  public stars = [1, 2, 3, 4, 5];
  public rating = 0;
  public hoverState = 0;   // param value Rating || Rating

  public afficheNote: boolean;
  public noteCommentaire: any;
  public amountPrice: any;
  public commentairePayment: any;
  public interventionPrice: any;

  // VARIABL MELM
  public header: any = localStorage.getItem('diag2Header')

  /* #################################    CONSTRUCTOR     ################################## */
  constructor(
    private modalService: NgbModal,
    private interventionApi: InterventionService,
    private diagnostic1Api: Diagnostic1Service,
    private diagnostic2Api: Diagnostic2Service
  ) {
    // Initialize on constructor
    this.selectHistorique =  {
      icone: 'wb_incandescent',
      description: 'Un problème est survenue.',
      model: 'Abarth Scorpion',
      address: 'Paris France',

    };
    this.existIntervention = false;
    this.DataInterventionDefault = { diagnostic1: {
      icone: 'wb_incandescent',
      description: 'Un problème est survenue.'
      }
    };
    console.log(this.DataInterventionDefault);
  }

  ngOnInit(): void {
    // Initialize de variable
    this.ValueDiagnostic1 = { description: '', icone: '' };
    this.ValueImmatriculation = '';
    this.ValueModele = '';
    this.ValueAdresse = '';
    this.selectMecano = { nom: '', adresse: '' };
    this.selectDay = '';
    this.selectHeure = '';
    this.total = 0;
    this.intervention = { id: 1, price: 50 };
    this.afficheNote = false;
    this.noteCommentaire = '';
    this.amountPrice = 0;
    this.commentairePayment = '';
    this.interventionPrice = 0;

    this.frenchDT = FrenchDataTables;
    this.dtOptions = { language: this.frenchDT };

    this.showPaypal = false;
    setTimeout(() => {
      this.showPaypal = true;
    }, 7000);
    this.DataInterventionDefault = { diagnostic1: {
      icone: 'wb_incandescent',
      description: 'Un problème est survenue.'
      }
    };

    // Change by requete
    //this.listeHistorique = ListeInterventionHistorique;

    this.interventionApi
      .getByUserInterventions({ userId: localStorage.getItem('userId') })
      .subscribe((resIntervention: any) => {
        console.log([resIntervention.data, ListeInterventionHistorique]);
        this.listeHistorique = resIntervention.data;

        // Traitement de notre liste
        let newValueTraitement = [];
        for (let value of this.listeHistorique) {
          if (value.vehicle.model === null) {
            value.vehicle['model'] = 'aucun';
          }

          if (value.diagnostic2 !== null) {
          }

          newValueTraitement.push(value);
        }

        setTimeout(() => {
          this.listeHistorique = newValueTraitement;
          console.log(newValueTraitement);
        }, 2000);
      });

    // Initialiser mode deconnecte en validation
    console.log(localStorage.getItem('selectInterventionMecano'));

    if (localStorage.getItem('showLastIntervention') === 'true') {
      console.log(
        '############################  Show intervention  #######################'
      );
      localStorage.setItem('showLastIntervention', 'false');
    }

    if ('selectInterventionMecano' in localStorage) {
      console.log('initialize exist ....');
      this.initializeVariableDetail();
    } else {
      console.log('NOT initialize exist ....');
    }
  }

  /* #################################    FONCTION     ################################## */
  /**
   * fonction permettant de changer de chat 
   * en passant en parametre l id de l intervention
   * @param value 
   */
  changeDeChat(value: any) {
    this.changechat.emit(value);
  }
  public initializeVariableDetail() {

    this.existIntervention = true;
    console.log('>>>>>>>>> Set exist == true , ............ '+this.existIntervention);

    this.ValueImmatriculation = localStorage.getItem('selectImmatriculation');
    this.ValueModele = localStorage.getItem('SelectModele');
    this.ValueAdresse = localStorage.getItem('selectAdresse');

    const mecano = JSON.parse(localStorage.getItem('selectInterventionMecano'));
    console.log(mecano);
    this.selectDay = mecano.jour;
    this.selectHeure = mecano.heure;
    this.selectMecano = { mecano: mecano.mecano };
    console.log(this.selectMecano);

    this.DataDiagnostic1 = ListeDiagnostic1;
    this.DataDiagnostic2 = ListeDiagnostic2;
    this.DataOffre = ListeOffre;

    this.DataVehicule = ListeVehicule;
    this.ValueDiagnostic1 = { description: '', icone: '' };

    for (let diag1 of this.DataDiagnostic1) {
      if (diag1.id === Number(localStorage.getItem('SelectDiagnostic1Id'))) {
        this.ValueDiagnostic1 = diag1;
      }
    }

    console.log(this.ValueDiagnostic1);
    if (localStorage.getItem('SelectDiagnostic1Id') == 'null') {
      this.ValueDiagnostic1 = {
        description: "Je sais ce qu'a ma voiture, je choisi mon prestataire",
        icone: 'wb_incandescent',
      };
    }
    
    setTimeout(() => {
      this.open_lg_detailIntervention();
    }, 750);
  }

  public open_lg_detailIntervention() {
    console.log(this.existIntervention);
    console.log('Click open specific detail ...');
    this.modalService.open(this.detailIntervention, {
      windowClass: 'my-modal-lg',
    });
  }

  public proc_emit_detailIntervention(param: any) {
    
    console.log(param);
    localStorage.setItem('interventionId', param.id)
    this.getPriceIntervention(param);

    this.rating = param.noteMec;
    this.hoverState = param.noteMec;

    this.existIntervention = true;      // Allow show variable

    // Traitment du données a afficher  ||  par defaut : last occurence
    this.DataInterventionDefault = param;
    console.log(this.DataInterventionDefault);

    let paramDiag1 = { id: param.diagnostic1Id };
    this.getValueWithAsync(paramDiag1);

    this.modalService.open(this.detailIntervention, {
      windowClass: 'my-modal-lg',
    });
  }

  public open_lg(content) {
    this.modalService.open(content, { windowClass: 'my-modal-lg' });
  }

  public proc_close() {
    this.modalService.dismissAll();
  }

  // Function returning Promise
  public resolveDiagnosticService(paramDiag1) {
    return this.diagnostic1Api.getDiagnostic1sById(paramDiag1).toPromise();
  }

  // Model Prototype : Call Synchronicall project
  public async getValueWithAsync(paramDiag1) {
    // Traitement Async
    const value = <any>await this.resolveDiagnosticService(paramDiag1);
    this.DataInterventionDefault.diagnostic1 = value.data[0];
    let existImmatriculation = false;

    if (this.DataInterventionDefault.vehicle.immatriculation === undefined) {
      this.existImmatriculation = true;
      console.log(existImmatriculation);console.log(this.existIntervention);
    } else {
      this.existImmatriculation = false;
    }
    console.log([
      'async result',
      value.data[0],
      this.DataInterventionDefault,
      this.DataInterventionDefault.vehicle.immatriculation,
    ]);

    // Set intervention variable
    //if (this.DataInterventionDefault.diagnostic1.description === 'Je sais ce qu\'à ma voiture') {
      await this.proc_traitDiagnostic2(this.DataInterventionDefault.diagnostic2);
    //}

    // Traitement en fonction de statePayment
    console.log(this.DataInterventionDefault.statePayment);
    if (this.DataInterventionDefault.statePayment === 'EN ATTENTE') {
      let priceCommission = 10; // Set payement commission
      this.amountPrice = priceCommission;
      this.intervention = {
        id: this.DataInterventionDefault.id,
        price: priceCommission,
      };
    } else {
      this.intervention = {
        id: this.DataInterventionDefault.id,
        price: this.DataInterventionDefault.diagnostic1.price,
      };
    }
    console.log([this.intervention, this.DataInterventionDefault]);

    // this.intervention = { id: 1, price: 50 };

    // console.log(['End function ...']);
  }

  // /*
  // * Suite traitement after payement OK
  // */
  // public proc_emitNewItemEvent(value) {
  //   let updateInterv = { id: this.DataInterventionDefault.id, statePayment: 'EN ATTENTE'  };
  //   console.log(updateInterv);

  //   // Change variable
  //   if (this.DataInterventionDefault.statePayment === 'EN ATTENTE') {
  //     this.amountPrice = 10; // Price check validation 
  //     updateInterv = { id: this.DataInterventionDefault.id, statePayment: 'EN COURS'  };
  //     this.DataInterventionDefault.statePayment = 'EN COURS';
  //   } else {
  //     updateInterv = { id: this.DataInterventionDefault.id, statePayment: 'EFFECTUE'  };
  //     this.DataInterventionDefault.statePayment = 'EFFECTUE';
  //   }

  //   // change in DB
  //   this.interventionApi.updateIntervention(updateInterv).subscribe((resIntervention) => {
  //     console.log(resIntervention);
  //   });
  // }


  public asyncFunctionDiagnostic2Id(paramDiag2) {
    return this.diagnostic2Api
      .getDiagnostic2sById({ id: paramDiag2 })
      .toPromise();
  }

  // Model Prototype : Success Call
  public async proc_traitDiagnostic2(traitDiagnostic2) {
    var diag2List = traitDiagnostic2.split(',', 10);
    console.log(traitDiagnostic2, diag2List);
    this.total = 0;

    for (let diag2 of diag2List) {
      const value = <any>await this.asyncFunctionDiagnostic2Id(diag2);
      console.log(['async result', value.data[0].price]);
      this.total = this.total + value.data[0].price;
    }

    this.DataInterventionDefault.diagnostic1.price = this.total;
    console.log(this.total, this.DataInterventionDefault);
    this.amountPrice = this.total;
    this.interventionPrice = this.total;
  }


  public proc_finish_payment(paramEvent) {
    console.warn('Not implemented');
  }


  public enter(i) {
    this.hoverState = i;
  }


  public leave(param) {
      this.hoverState = 0;
  }


  public updateRating(i) {
      console.log('Change score mechanic : ' + i);
      console.log(this.DataInterventionDefault);
      this.rating = i;

      let interventionUpdate = {
        id: this.DataInterventionDefault.id,
        noteMec: i
      }

      this.interventionApi.updateIntervention(interventionUpdate).subscribe((resIntervUpdate) => {
        console.log('Change Note Intervention .....');
      })

  }


  public proc_toggle_note() {
    console.log('Toggle this ....');
    if (this.afficheNote === true) {
      this.afficheNote = false;
    } else {
      this.afficheNote = true;
    }
  }


  public proc_set_note_commentaire() {
    console.log(this.noteCommentaire);

    let interventionUpdate = {
      id: this.DataInterventionDefault.id,
      noteComMec: this.noteCommentaire
    }

    this.interventionApi.updateIntervention(interventionUpdate).subscribe((resIntervUpdate) => {
      console.log('Change Note Commentaire Intervention .....');
    });

  }

  /**
   * Function get Price et qui permet de distinguer les different action
   */
  public async getPriceIntervention(param) {

    // Get Variable in database | Configuration
    console.log(param);

    if (param.statePayment === 'EN ATTENTE') {
      this.amountPrice = 10;
      this.commentairePayment = 'Payement de la commission Girlandcars';
      localStorage.setItem('commentairePayment', 'Payement de la commission Girlandcars');
    } else {
      if (param.diagnostic1Id !== 3) {
        this.amountPrice = param.diagnostic1.price;
        this.interventionPrice = param.diagnostic1.price;
      } else {
        if (param.diagnostic1.description === 'Je sais ce qu\'à ma voiture') {
          console.log(this.DataInterventionDefault);
          await this.proc_traitDiagnostic2(this.DataInterventionDefault.diagnostic2);
          console.log('Fin getPriceIntervention ...');
        }
        // Traitement
        this.amountPrice = param.diagnostic1.price;
        
      }
      this.commentairePayment = 'Payement du frais de votre réparation';
      localStorage.setItem('commentairePayment', 'Payement du frais de votre réparation');
      console.log(this.amountPrice);
    }

  }

  public proc_emit_afterUpdateIntervention(paramValue) {
    console.log(paramValue);
    this.DataInterventionDefault.statePayment = paramValue;
    if (paramValue === 'EN COURS') {
      this.amountPrice = this.interventionPrice;
    }


  }

}
