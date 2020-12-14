import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comp-categorie',
  templateUrl: './comp-categorie.component.html',
  styleUrls: ['./comp-categorie.component.scss']
})
export class CompCategorieComponent implements OnInit, OnChanges  {

  @Input() categorie: any;
  @Output() changeSubscription: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.categorie);
  }

  ngOnInit(): void {
  }


  public proc_decourvrir_abonnement(paramCat) {
    localStorage.setItem('categorieId', paramCat.id);
    this.changeSubscription.emit(paramCat);
    console.log(paramCat);
  }


  public proc_emit_afterUpdateIntervention(value) {
    console.log(value);
  }


}
