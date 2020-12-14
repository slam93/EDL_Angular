import { Component, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { Subject } from 'rxjs';
import { Diagnostic2Service } from "../../services/diagnostic2.service";
import { SectionsService } from "../../services/sections.service"
import { DataTableDirective } from 'angular-datatables';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-diagnostic2-management',
  templateUrl: './admin-diagnostic2-management.component.html',
  styleUrls: ['./admin-diagnostic2-management.component.scss']
})
export class AdminDiagnostic2ManagementComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @ViewChild('actionDiagnostic2') actionDiagnostics: any
  @ViewChild('confirmDelete') confirmDelete: any

  public dtOptions: DataTables.Settings = {}
  public frenchDT: any
  public dtTrigger = new Subject()

  public listDiagnostic2: any = []
  public listSection: any = []
  public checkAction: any

  public diagnostic2Id: any
  public description: any
  public model: any
  public price: any
  public criterion: any
  public sectionId: any

  constructor(
    private diagnostic2Service: Diagnostic2Service,
    private sectionService: SectionsService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit(): void {

    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.diagnostic2Service.getDiagnostic2s()
      .subscribe((res: any) => {
        this.listDiagnostic2 = res.data
        console.log('listDiagnostic2', this.listDiagnostic2)
        this.dtTrigger.next()
      })

    this.getSection()
  }

  ngOnChanges(): void {
    this.loadListDiagnostic2()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  // Load list diagnostic par section
  public loadListDiagnostic2(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.diagnostic2Service.getDiagnostic2s()
        .subscribe((res: any) => {
          this.listDiagnostic2 = res.data
          console.log('listDiagnostic2', this.listDiagnostic2)
          this.dtTrigger.next()
        })
    })
  }

  /**
   * addDiagnostic2
   */
  public addDiagnostic2() {
    let body = {
      description: this.description,
      model: this.model,
      price: this.price,
      criterion: this.criterion,
      sectionId: this.sectionId
    }
    this.diagnostic2Service.createDiagnostic2(body)
      .subscribe(() => {
        this.loadListDiagnostic2()
        this.closeModal()
      }, (error) => {
        console.log(error)
      })
  }

  /**
   * getSection
   */
  public getSection() {
    this.sectionService.getAllSection()
      .subscribe((res: any) => {
        this.listSection = res.data
      })
  }

  /**
   * updateDiagnostic2
   */
  public updateDiagnostic2() {
    let body = {
      id: this.diagnostic2Id,
      description: this.description,
      model: this.model,
      price: this.price,
      criterion: this.criterion,
      sectionId: this.sectionId
    }
    this.diagnostic2Service.updateDiagnostic2(body)
      .subscribe(() => {
        this.loadListDiagnostic2()
        this.closeModal()
      }, (error) => {
        console.log(error)
      })
  }
  /**
   * emitData
   */
  public async emitData(param: any) {
    this.checkAction = 'update'

    this.diagnostic2Id = param.id
    this.description = param.description
    this.model = param.model
    this.price = param.price
    this.criterion = param.criterion
    this.sectionId = param.sectionId

    await <any>this.ngbModal.open(this.actionDiagnostics)
  }

  /**
   * beforeDelete
   */
  public async beforeDelete(param: any) {
    this.diagnostic2Id = param
    console.log('DELETE diagnostic2Id', this.diagnostic2Id)
    await <any>this.ngbModal.open(this.confirmDelete)
  }
  /**
   * deleteDiagnostic2
   */
  public deleteDiagnostic2() {
    console.log('idDelete', this.diagnostic2Id)
    let body = {
      id: this.diagnostic2Id
    }
    this.diagnostic2Service.deleteDiagnostic2(body)
      .subscribe((res: any) => {
        this.loadListDiagnostic2()
        this.closeModal()
      })
  }

  /**
   * Modal action
   */
  public openModal(modal) {
    this.checkAction = 'add'
    this.ngbModal.open(modal)
  }

  public closeModal() {
    this.ngbModal.dismissAll()
    this.description = this.model = this.criterion = this.price = this.sectionId = ''
  }

}
