import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  @Output() returnStep2: EventEmitter<any> = new EventEmitter();
  @Output() routeStep4: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public proc_return_step2() {
    this.returnStep2.emit();
  }

  public proc_clic_envoyeCom() {
    this.routeStep4.emit();
  }


}
