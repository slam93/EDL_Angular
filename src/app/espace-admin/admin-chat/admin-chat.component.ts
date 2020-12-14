import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.scss']
})
export class AdminChatComponent implements OnInit {
  public listeChat: any;
  public dtOptions: DataTables.Settings = {};
  public frenchDT: any;
  public dtTrigger = new Subject();
  constructor(private chatApi: ChatService) { }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables;
    this.dtOptions = { language: this.frenchDT, destroy: true };
    // 0 pour l admin
    this.chatApi.getChatByidreceiver({ idreceiver: 0 }).subscribe((listeChat: any) => {
      this.listeChat = listeChat.data;
      console.log('this.listeChat', this.listeChat);
      this.dtTrigger.next();
    });
  }
  public emitList(subscritpion) {
    console.log('emit Sub', subscritpion)
  }

}
