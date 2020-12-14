import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurService } from "../../services/utilisateur.service";
import { Subject } from 'rxjs';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { DatePipe } from '@angular/common';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.scss']
})
export class AdminUserManagementComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('user') user: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  // @ViewChild('confirmDisable') confirmeDisable: any  
  public userList: any = []

  public frenchDT: any
  public dtOptions: DataTables.Settings = {}
  public dtTrigger = new Subject()

  // Params before edit
  public userParams: any
  public userIdToEdit: any

  public userName: any
  public userRole: any
  public userEnabled: any
  public userFirstname: any
  public userLastname: any
  public userProvider: any
  public userEmail: any
  public userFirstnameGoogle: any
  public userLastnameGoogle: any
  public userFirstnameFb: any
  public userLastnameFb: any
  public userTimeOpening: any
  public userTimeClosing: any
  public userDayWorking: any
  public userRcis: any
  public userStat: any
  public userSocietyName: any
  public userCreatedAt: any
  public userUpdatedAt: any

  // variable check enabled disabled
  public checkForConfirmation: boolean
  public confirmeDisable: any

  constructor(
    private utilisateurService: UtilisateurService,
    private datePipe: DatePipe,
    private ngbModal: NgbModal
  ) {
    this.confirmeDisable = false
  }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.utilisateurService.getAllUser()
      .subscribe(res => {
        this.userList = res.data
        this.dtTrigger.next()
        console.log('user list load management', this.userList)
      })
  }

  ngOnChanges(): void {
    this.loadUserList()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.loadUserList()
  }

  public loadUserList() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.utilisateurService.getAllUser()
        .subscribe((res: any) => {
          this.userList = res.data
          this.dtTrigger.next()
          console.log('userList', this.userList)
        })
    })
  }

  // emit data for udpate
  public async emitDataBeforeEdit(param: any) {
    this.userParams = param
    this.userIdToEdit = param.id

    // Data pour affiche
    this.userName = param.username
    this.userFirstname = param.first_name
    this.userRole = param.role
    this.userEnabled = param.enabled
    this.userLastname = param.last_name
    this.userProvider = param.provider
    this.userEmail = param.email
    this.userFirstnameGoogle = param.firstnamegoogle
    this.userLastnameGoogle = param.lastnamegoogle
    this.userFirstnameFb = param.firstnamefb
    this.userLastnameFb = param.lastnamefb
    this.userTimeOpening = param.timeOpening
    this.userTimeClosing = param.timeClosing
    this.userDayWorking = param.dayWorking
    this.userRcis = param.rcis
    this.userStat = param.stat
    this.userSocietyName = param.societyName
    this.userCreatedAt = this.datePipe.transform(param.createdAt, 'dd MMMM yyyy')
    this.userUpdatedAt = this.datePipe.transform(param.updatedAt, 'dd MMMM yyyy')

    console.log([this.userParams, this.userIdToEdit, this.userCreatedAt, this.userUpdatedAt])

    if (this.userEnabled === false) {
      // afficher message et masquer bouton [false, true] 
      this.checkForConfirmation = true
      console.log(['userEnabled', this.userEnabled, this.checkForConfirmation])
    } else {
      // ne rien faire
      this.checkForConfirmation = false
      console.log(['userEnabled', this.userEnabled, this.checkForConfirmation])
    }
    await <any>this.ngbModal.open(this.user, { windowClass: 'my-modal-md' })
  }

  // checkout data to edit + confirmation
  public disableUser() {
    console.log('desable USER ID ' + this.userIdToEdit)
    // this.ngbModal.open(this.confirmeDisable)
    this.confirmeDisable = true
  }

  // update + reload
  public confirmeUpdate() {
    let body = {
      id: this.userIdToEdit,
      enabled: 0
    }
    this.utilisateurService.updateUtilisateur(body)
      .subscribe(res => {
        console.log(res)
        this.ngbModal.dismissAll()
        this.loadUserList()
        this.confirmeDisable = false
      })
  }

  public closeModal() {
    this.ngbModal.dismissAll()
    this.confirmeDisable = false
  }
}
