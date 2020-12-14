import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-message-prompt',
  templateUrl: './message-prompt.component.html',
  styleUrls: ['./message-prompt.component.scss']
})
export class MessagePromptComponent implements OnInit, OnChanges {

  @Input() title: any;
  @Input() message: any;
  @Output() yes: EventEmitter<any> = new EventEmitter();
  @Output() no: EventEmitter<any> = new EventEmitter();
  @Output() mclose: EventEmitter<any> = new EventEmitter();

  /* #################################    VARIABLE    ################################## */



  /* #################################    CONSTRUCTOR    ################################## */
  constructor() {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Configuration on change | Test validation message
  }


  ngOnInit(): void {

  }

  /* #################################    FUNCTION    ################################## */

  public proc_click_yes() {
    this.yes.emit(null);
  }

  public proc_click_no() {
    this.no.emit(null);
  }

  public proc_click_close() {
    this.mclose.emit(null);
  }

}
