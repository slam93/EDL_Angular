import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SubscriptionsService } from "../../services/subscriptions.service";
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-subscriber-list',
  templateUrl: './admin-subscriber-list.component.html',
  styleUrls: ['./admin-subscriber-list.component.scss']
})
export class AdminSubscriberListComponent implements OnInit {

  @Input() listSubscriptions: any = []
  @Output() detailSubscriptions: EventEmitter<any> = new EventEmitter()

  // FK
  public userIdSub: any
  public userName: any = []
  public listUser: any
  public categoryIdSub: any

  public dtOptions: DataTables.Settings = {}
  public frenchDT: any
  public dtTrigger = new Subject()
  public userNumber: number

  public checkDate: any = []

  constructor(
    private subscriptionService: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.subscriptionService.getAllSubscription()
      .subscribe((res: any) => {
        console.log(res, res.data.length)
        this.listSubscriptions = res.data

        for (let i = 0; i < res.data.length; i++) {
          let date = new Date()
          if (date > new Date(res.data[i].dateEnd)) {
            this.checkDate[i] = true
          } else {
            this.checkDate[i] = false
          }
        }

        console.log('listSubscriptions', this.listSubscriptions)
        this.dtTrigger.next()
      })
  }

  public emitList(subscritpion) {
    console.log('emit Sub', subscritpion)
    this.detailSubscriptions.emit(subscritpion)
  }
}
