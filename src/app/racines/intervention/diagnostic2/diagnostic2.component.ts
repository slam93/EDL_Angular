import { Diagnostic1 } from './../../../interfaces/diagnostic1';
import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-diagnostic2',
  templateUrl: './diagnostic2.component.html',
  styleUrls: ['./diagnostic2.component.scss']
})
export class Diagnostic2Component implements OnInit, OnChanges {

  @Input() diagnostic1: any;
  @Output() returnStep1: EventEmitter<any> = new EventEmitter();
  @Output() routeStep3: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */
  public listeDiagnostic2: any[];
  public listeSelectDiagnostic2: any[];

  public selectDiagnostic2: any;  // localstorage
  public diagnostic1Id: any;


  /* #################################  CONSCTRUCTOR  ################################## */
  constructor() {
    this.diagnostic1Id = 0;

    this.listeDiagnostic2 = [
      {id: 1, description: 'Un voyant s\'allume j\'ai besoin d\'un type 1 ', diag1Id: 1 },
      {id: 2, description: 'J\'entends un bruit inconnue (type1) ... ', diag1Id: 1},
      {id: 3, description: 'Un voyant s\'allume j\'ai besoin d\'un type 2 ', diag1Id: 2},
      {id: 4, description: 'J\'entends un bruit inconnue (type2) ... ', diag1Id: 2},
      {id: 5, description: 'Un voyant s\'allume j\'ai besoin d\'un type 3 ', diag1Id: 3},
      {id: 6, description: 'J\'entends un bruit inconnue (type3) ... ', diag1Id: 3},
    ];

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.diagnostic1);

    this.proc_getByDiag1Id(this.listeDiagnostic2, this.diagnostic1);

  }

  ngOnInit(): void {

    let localDiag1Id = localStorage.getItem('Diagnostic1Id');

    if(localDiag1Id !== null){
      this.diagnostic1Id = localDiag1Id;
    }

  }

  /* #################################  FUNCTION  ################################## */

  public proc_getByDiag1Id(listeDiag2: any[], diag1Id) {
    this.listeSelectDiagnostic2 = [];
    for (const diag2 of listeDiag2) {
      if (diag1Id === diag2.diag1Id) {
        this.listeSelectDiagnostic2.push(diag2);
      }
    }
  }

  public proc_clic_diag2() {
    this.routeStep3.emit();
  }

  public proc_return_step1() {
    this.returnStep1.emit();
  }

}
