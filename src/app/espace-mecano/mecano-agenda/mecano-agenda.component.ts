import { DataService } from 'src/app/services/data.service';
import { InterventionService } from './../../services/intervention.service';
import { MecanoService } from './../../services/mechanics.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ListeOffre } from 'src/app/interfdata/data-listeOffre';

@Component({
  selector: 'app-mecano-agenda',
  templateUrl: './mecano-agenda.component.html',
  styleUrls: ['./mecano-agenda.component.scss']
})
export class MecanoAgendaComponent implements OnInit {
  @Output() changechat = new EventEmitter<any>();
  public mecanoActual: any;
  public dateShow: any;
  public agendaShow: any;
  public DataOffre: any;
  public listeInterventionMecano: any;
  public sizeIntervention: number;
  public active = 1;
  public emitedIntervention: any;
  public selectedIntervention: any;
  public selectedBeginInterv: Date;
  public selectedEndInterv: Date;
  public dateStart: any;
  public dateEnd: any;
  public hourOpen: any;
  public hourClose: any;
  public connectedImageGarage: any;

  constructor(
    private mecanoApi: MecanoService,
    private interventionApi: InterventionService,
    private data: DataService
    ) { }

  ngOnInit(): void {

    this.data.currentUrlImageGarage.subscribe((resImageGarage) => (this.connectedImageGarage = resImageGarage));

    if (localStorage.getItem('connectedImageGarage') !== null) {
      this.connectedImageGarage = localStorage.getItem('connectedImageGarage');
      console.log(this.connectedImageGarage);
    } else {
      this.connectedImageGarage = 'assets/images/garage-logo.jpg';
    }

    this.dateShow = new Date();
    this.sizeIntervention = 0;
    this.emitedIntervention = 0;

    // Initialisation only
    this.dateStart = new Date();
    this.dateEnd = new Date().setDate(this.dateStart.getDate() + 2);
    this.hourOpen = '08:00';
    this.hourClose = '16:00';

    this.DataOffre = ListeOffre;
    // Initialisation
    this.agendaShow = this.DataOffre[0];
    console.log(this.agendaShow);

    console.log(localStorage.getItem('userId'));

    // Get Agenda du mecano data à afficher   |  parametrable
    this.mecanoApi.getMecanoByUserId({userId: localStorage.getItem('userId')}).subscribe((resMecano: any)=>{
      console.log(resMecano);
      this.mecanoActual = resMecano.data[0];
      this.hourOpen = this.mecanoActual.hourOpen;
      this.hourClose = this.mecanoActual.hourClose;
      console.log(this.mecanoActual);

      this.interventionApi.getByMechanicIdInterventions({mechanicId: this.mecanoActual.id}).subscribe((resIntervention: any) => {
        this.listeInterventionMecano = resIntervention.data;
        console.log(resIntervention.data);
        this.sizeIntervention = resIntervention.data.length;
        console.log(this.sizeIntervention);
        console.log(this.listeInterventionMecano);
      });

    });

  }

  /**
   * fonction permettant de changer de chat 
   * en passant en parametre l id de l intervention
   * @param value 
   */
  changeDeChat(value: any) {
    console.log(value)
    this.changechat.emit(value);
  }

  public proc_emit_detailIntervention(param: any) {
    console.log('a savoir traitement  ...');
  }


  public proc_change_intervention(param: any) {
    console.log(param);
    this.emitedIntervention = param;
    console.log(this.listeInterventionMecano);

    for (const intervTemp of this.listeInterventionMecano) {
      if (intervTemp.id === param) {
        this.selectedIntervention = intervTemp;
        console.log(this.selectedIntervention);
        this.selectedBeginInterv = new Date(this.selectedIntervention.dateInterventionBegin);
        this.selectedEndInterv = new Date(this.selectedIntervention.dateInterventionEnd);
        console.log([this.selectedBeginInterv, this.selectedEndInterv]);
      }
    }

  }

}
