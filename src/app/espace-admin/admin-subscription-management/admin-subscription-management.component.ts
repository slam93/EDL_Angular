import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { SubscriptionsService } from '../../services/subscriptions.service';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-admin-subscription-management',
  templateUrl: './admin-subscription-management.component.html',
  styleUrls: ['./admin-subscription-management.component.scss']
})
export class AdminSubscriptionManagementComponent implements OnInit, OnDestroy {

  @ViewChild('subs') subs: any

  public dtTrigger = new Subject()
  public frenchDT: any
  public dtOptions: DataTables.Settings = {}

  public listSubscriptions: any = []

  // param SUB
  public subscriptionParams: any

  public subscriptionName: any
  public subscriptionType: any
  public subscriptionPrice: any
  public subscriptionDateBegin: any
  public subscriptionDateEnd: Date
  public subscriptionUsername: any
  public subscriptionEmail: any
  public subscriptionCreation: any

  // controle date expiration
  public dateEnd: any
  public checkDate: any

  constructor(
    private subscriptionService: SubscriptionsService,
    private ngbModal: NgbModal,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.loadSubscriptionList()
  }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next()
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }
  
  public loadSubscriptionList() {
    this.subscriptionService.getAllSubscription()
      .subscribe((res: any) => {
        this.listSubscriptions = res.data
        console.log('listSubscriptions management', this.listSubscriptions)
        this.dtTrigger.next()
      })
  }

  public async emitDetailSubscription(param: any) {
    this.subscriptionParams = param
    console.log('subscriptionParams', this.subscriptionParams)

    this.subscriptionName = param.category.description
    this.subscriptionType = param.category.typeCategories
    this.subscriptionPrice = param.category.price
    this.subscriptionDateBegin = this.datePipe.transform(param.dateBegin, 'dd MMMM yyyy')
    this.subscriptionDateEnd = param.dateEnd
    this.subscriptionUsername = param.user.username
    this.subscriptionEmail = param.user.email
    this.subscriptionCreation = this.datePipe.transform(param.user.createdAt, 'dd MMMM yyyy')

    let dateNow = new Date() //date 2
    let dateEnd = new Date(this.subscriptionDateEnd) //date1
    this.dateBeforeEnd(dateNow, dateEnd)

    await <any>this.ngbModal.open(this.subs, { windowClass: 'my-modal-md' })
  }

  // Fonction controle date
  public dateBeforeEnd(date2: Date, date1: Date) {
    const diff = date1.valueOf() - date2.valueOf()
    let dateEnd = Math.ceil(diff / (1000 * 3600 * 24))
    this.dateEnd = dateEnd
    console.log('dateEnd', this.dateEnd)
    if (this.dateEnd > 0) {
      this.checkDate = true
    } else {
      this.dateEnd = -(this.dateEnd)
      this.checkDate = false
    }
  }

  public closeModal() {
    this.ngbModal.dismissAll()
  }
}
