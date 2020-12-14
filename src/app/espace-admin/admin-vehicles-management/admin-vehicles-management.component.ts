import { Component, OnInit, ViewChild, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { VehiclesService } from 'src/app/services/vehicles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin-vehicles-management',
  templateUrl: './admin-vehicles-management.component.html',
  styleUrls: ['./admin-vehicles-management.component.scss']
})
export class AdminVehiclesManagementComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @ViewChild('actionVehicle') actionVehicle: any
  @ViewChild('confirmDelete') confirmDelete: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  public listVehicles: any

  public dtTrigger = new Subject()
  public frenchDT: any
  public dtOptions: DataTables.Settings = {}

  // variable gestion vehicle
  public vehicleId: any
  public vehicleBand: any
  public vehicleModel: any
  public vehicleYear: any //transform datatable
  public checkAction: any

  public year: any

  constructor(
    private vehicleService: VehiclesService,
    public ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.vehicleService.getAllVehicles()
      .subscribe((res: any) => {
        this.listVehicles = res.data
        this.dtTrigger.next()
        console.log('listVehicles', this.listVehicles)
      })

    let date = new Date()
    this.year = date.getFullYear()
    console.log('dateYear', this.year)
  }

  ngAfterViewInit(): void {
    this.loadListVehicle()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.loadListVehicle()
  }

  ngOnChanges(): void {
    this.loadListVehicle()
  }

  /**
   * loadListCategory
   */
  public loadListVehicle(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.vehicleService.getAllVehicles()
        .subscribe((res: any) => {
          this.listVehicles = res.data
          this.dtTrigger.next()
          console.log('listVehicles', this.listVehicles)
        })
    })
  }

  /**
   * name
   */
  public async emitDataModal(param: any) {
    this.checkAction = 'update'
    console.log('param emit vehicle', param)
    this.vehicleId = param.id
    this.vehicleBand = param.band
    this.vehicleModel = param.model
    this.vehicleYear = param.year

    await <any>this.ngbModal.open(this.actionVehicle)
  }

  /**
   * updateVehicle
   */
  public updateVehicle() {
    let body = {
      id: this.vehicleId,
      band: this.vehicleBand,
      model: this.vehicleModel,
      year: this.vehicleYear
    }
    this.vehicleService.updateVehicle(body)
      .subscribe(() => {        
        this.loadListVehicle()
        this.closeModal()
      })
  }

  /**
   * openModalForAction
   */
  public openModalForAction(modal) {
    this.checkAction = 'add'
    this.ngbModal.open(modal)
  }

  /**
   * addvehicle
   */
  public addvehicle() {
    let body = {
      band: this.vehicleBand,
      model: this.vehicleModel,
      year: this.vehicleYear
    }
    this.vehicleService.addVehicle(body)
      .subscribe((res: any) => {
        console.log(res)
        this.ngbModal.dismissAll()
        this.loadListVehicle()
        this.resetField()
      })
  }

  /**
   * deleteVehicle
   */

  public beforeDeleteVehiicle(param) {
    this.vehicleId = param
    console.log('delete this', this.vehicleId)
    this.ngbModal.open(this.confirmDelete)
  }

  public deleteVehicle() {
    let body = {
      id: this.vehicleId
    }

    this.vehicleService.deleteVehicle(body)
      .subscribe(() => {
        this.ngbModal.dismissAll()
        this.loadListVehicle()
      })
  }

  /**
   * resetField
   */
  public resetField() {
    this.vehicleBand = ''
    this.vehicleYear = ''
    this.vehicleModel = ''
  }

  public closeModal() {
    this.ngbModal.dismissAll()
    this.resetField()
  }

}
