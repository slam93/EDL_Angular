import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comp-calendar',
  templateUrl: './comp-calendar.component.html',
  styleUrls: ['./comp-calendar.component.scss']
})
export class CompCalendarComponent implements OnInit, OnChanges {

  @Input() dateStart: Date;
  @Input() dateEnd: Date;
  @Input() hourOpen: any;
  @Input() hourClose: any;
  @Input() listInterventionAgenda: any;
  @Output() changeIntervention: EventEmitter<any> = new EventEmitter();

  /* ########################################       VARIABLE         ######################################################## */

  public listDayIntervention = [];
  public listHour = [];
  public dateStartShow: Date;
  public dateEndShow: Date;
  public hourOpenTrait = [];
  public hourCloseTrait = [];
  public idInterventionSelected: any;


  /* ########################################       CONSTRUCTOR         ######################################################## */
  constructor() { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const DateEndTrait = new Date(this.dateEnd);
    console.log([this.dateStart, DateEndTrait]);
    this.dateStartShow = this.dateStart;
    this.dateEndShow = DateEndTrait;
    this.hourCloseTrait = this.traitHourString(this.hourClose);
    this.hourOpenTrait = this.traitHourString(this.hourOpen);
    this.idInterventionSelected = 0;

    await this.createDayIntervention(this.dateStart, DateEndTrait, this.hourOpen, this.hourClose);

    console.log(this.listDayIntervention);
    await this.affectDateIntervention(this.listDayIntervention, this.listInterventionAgenda);
  }


  ngOnInit(): void {
    console.log(this.listInterventionAgenda);
  }


  /* ########################################       FUNCTION         ######################################################## */

  public createDayIntervention(paramDateStart: Date, paramDateEnd: Date, paramHourOpen, paramHourClose) {

    const open = this.traitHourString(paramHourOpen);
    const close = this.traitHourString(paramHourClose);

    // Creation Tableau heure
    let num = 0;
    this.listHour = [];
    for (num = open[0]; num <= close[0]; num++) {
      const hourTemp: string = Number(num) + ':00';
      this.listHour.push({heure: hourTemp, disponible: false, id: 0});
    }
    console.log(this.listHour);

    console.log(paramDateStart, paramDateEnd);
    const monthStart = paramDateStart.getUTCMonth() + 1;
    const dayStart = paramDateStart.getUTCDate();
    const yearStart = paramDateStart.getUTCFullYear();

    const dayEnd = paramDateEnd.getUTCDate();
    const yearEnd = paramDateEnd.getUTCFullYear();
    const monthEnd = paramDateEnd.getUTCMonth() + 1;


    // Creation tableau jour
    if (monthStart === monthEnd ) {

      // case meme month to show
      let num1 = 0;
      this.listDayIntervention = [];
      for (num1 = dayStart; num1 <= dayEnd; num1++) {
        const dayTemp = new Date(yearStart + '-' + monthStart + '-' + num1);
        const ListTempHour = this.listHour;
        const dayIntervention = {
              day: dayTemp,
              intervention: ListTempHour
              
          };
        this.listDayIntervention.push(dayIntervention);
      }

      console.log(this.listDayIntervention);

    } else if (monthStart !== monthEnd) {

        if (monthStart < monthEnd) {

        // Get last day of month
        const lastDayMonth = new Date(yearStart, monthStart, 0);
        const lastdayEnd = lastDayMonth.getUTCDate();
        const lastyearEnd = lastDayMonth.getUTCFullYear();
        const lastmonthEnd = lastDayMonth.getUTCMonth() + 1;

        // Add pour le premier mois
        let num2 = 0;
        for (num2 = dayStart; num2 <= lastdayEnd + 1; num2++) {
          const dayTemp = new Date(yearStart + '-' + monthStart + '-' + num2);
          const dayIntervention = {
                day: dayTemp,
                intervention: this.listHour
                
            };
          console.log(dayIntervention);
          this.listDayIntervention.push(dayIntervention);
        }

        // Add days second mois
        let num3 = 0;
        for (num3 = 1; num3 <= dayEnd; num3++) {
          const dayTemp = new Date(yearEnd + '-' + monthEnd + '-' + num3);
          const dayIntervention = {
                day: dayTemp,
                intervention: this.listHour
                
            };
          console.log(dayIntervention);
          this.listDayIntervention.push(dayIntervention);
        }
      } else {
        console.log('Paramètre invalide ...');
      }

    } else {

      // encore à traiter
      console.log('Erreur : Encore à traiter ..., ( parametre invalide ) ');

    }

  }


  public affectDateIntervention( paramlistDayInterven: any, paramlistAgendaInterven: any) {
    console.log('Fun : ...........    Debut function afterDateIntervention      ...........');

    console.log([paramlistDayInterven.length, paramlistAgendaInterven.length, paramlistAgendaInterven]);
    console.log([paramlistDayInterven, this.listDayIntervention]);

    for (const intervention of paramlistAgendaInterven) {

      const paramDateStart = new Date(intervention.dateInterventionBegin);
      const paramDateEnd = new Date(intervention.dateInterventionEnd);

      console.log([paramDateStart, paramDateEnd]);

      const monthStart = paramDateStart.getUTCMonth() + 1;
      const dayStart = paramDateStart.getUTCDate();
      const yearStart = paramDateStart.getUTCFullYear();
      const hourStart = paramDateStart.getHours() - 3; //  -3 a cause du fuseau horaire

      const dayEnd = paramDateEnd.getUTCDate();
      const yearEnd = paramDateEnd.getUTCFullYear();
      const monthEnd = paramDateEnd.getUTCMonth() + 1;
      const hourEnd = paramDateEnd.getHours() - 3;   //  -3 a cause du fuseau horaire

      for (const dayInterv of paramlistDayInterven) {
        console.log('#######################################################################################');
        const dayIntervTrait = new Date(dayInterv.day);
        const monthIntervTemp = dayIntervTrait.getUTCMonth() + 1;
        const dayIntervTemp = dayIntervTrait.getUTCDate();
        const yearIntervTemp = dayIntervTrait.getUTCFullYear();

        console.warn(yearIntervTemp +'==='+ yearStart +'&&'+ monthIntervTemp +'==='+ monthStart +'&&'+ dayIntervTemp+'==='+ dayStart);
        if (yearIntervTemp === yearStart && monthIntervTemp === monthStart && dayIntervTemp === dayStart) {

          let newHourInterv = this.returnListHour(this.hourOpen, this.hourClose);
          console.log([newHourInterv, dayInterv.intervention]);

          for ( const hourInterv of newHourInterv ) {
            const hourTemp  = this.traitHourString(hourInterv.heure);
            console.log([this.hourOpenTrait, this.hourCloseTrait, hourTemp]);
            console.warn(hourStart +'<='+ Number(hourTemp[0]) +'&&'+ Number(hourTemp[0]) +'<='+ hourEnd);
            if ( hourStart <= Number(hourTemp[0]) && Number(hourTemp[0]) <= hourEnd  ) {
              //console.warn(hourStart +'<='+ Number(hourTemp[0]) +'&&'+ Number(hourTemp[0]) +'<='+ hourEnd);
              hourInterv.disponible = true;
              hourInterv.id = intervention.id;
              console.log('#############  Affectation Heure true');   // intervention.id
            }
          }
          console.log([newHourInterv, dayInterv.intervention]);
          dayInterv.intervention = newHourInterv;
        }
        console.log(paramlistDayInterven);
      }
    }
    console.log('Fun : ...........    Fin function afterDateIntervention      ...........');

  }


  public traitHourString(paramHour) {
    return paramHour.split(':', 3);
  }


  public returnListHour(paramHourOpen, paramHourClose) {
    const open = this.traitHourString(paramHourOpen);
    const close = this.traitHourString(paramHourClose);
    // Creation Tableau heure
    let num = 0;
    let listHour = [];
    for (num = open[0]; num <= close[0]; num++) {
      const hourTemp: string = Number(num) + ':00';
      listHour.push({heure: hourTemp, disponible: false});
    }
    console.log(listHour);
    return listHour;
  }


  // Increment date to show 
  public proc_increment_date() {

    this.dateStartShow.setDate(this.dateStartShow.getDate() + 1);
    this.dateEndShow.setDate(this.dateEndShow.getDate() + 1);
    console.log([this.dateStartShow, this.dateEndShow]);
    this.listDayIntervention = []; this.listHour = [];
    this.createDayIntervention(this.dateStartShow, this.dateEndShow, this.hourOpen, this.hourClose);
    this.affectDateIntervention(this.listDayIntervention, this.listInterventionAgenda);

  }

  public proc_decrement_date() {

    this.dateStartShow.setDate(this.dateStartShow.getDate() - 1);
    this.dateEndShow.setDate(this.dateEndShow.getDate() - 1);
    console.log([this.dateStartShow, this.dateEndShow]);
    this.listDayIntervention = []; this.listHour = [];
    this.createDayIntervention(this.dateStartShow, this.dateEndShow, this.hourOpen, this.hourClose);
    this.affectDateIntervention(this.listDayIntervention, this.listInterventionAgenda);

  }


  public proc_show_intervention(id_value: any, hour: any) {
    console.log('Id intervention : ' , id_value);
    console.log('Id intervention  hour: ' , hour);

    // let hours = hour.getHours()
    let hours = this.traitHourString(hour.heure)
    let myDate = new Date(id_value.day)

    myDate = new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), hours[0], 0, 0);
    console.log(myDate)


    localStorage.setItem('date', JSON.stringify({'day':myDate, 'heure':hours[0]}))
    this.idInterventionSelected = id_value;
    this.changeIntervention.emit(id_value);
  }

  // console.log('Id intervention : ' , id_value);
  //   console.log('Id intervention  hour: ' , hour);
  //   // let hours = hour.getHours()
  //   let hours = this.traitHourString(hour)
  //   let myDate = new Date(id_value.day.getFullYear(), id_value.day.getMonth(), id_value.day.getDate(), hours[0], 0, 0); 

    
  //   localStorage.setItem('date', JSON.stringify({'day':id_value.day, 'heure':hour}))
  //   this.idInterventionSelected = id_value;
  //   this.changeIntervention.emit(id_value);

}
