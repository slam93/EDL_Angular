import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-admin-category-management',
  templateUrl: './admin-category-management.component.html',
  styleUrls: ['./admin-category-management.component.scss']
})
export class AdminCategoryManagementComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('actionCategory') actionCategory: any
  @ViewChild('confirmDelete') confirmDelete: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  public listCategories: any = []

  // Datatable
  public dtTrigger = new Subject()
  public frenchDT: any
  public dtOptions: DataTables.Settings = {}

  // add param
  public addDescription: any = ''
  public addPrice: any = ''

  // param category action update + delete
  public categoryId: any
  public typeCategorie: any
  public deleteCategoryId: number

  public checkAction: any

  constructor(
    private categoriesService: CategoriesService,
    public ngbModal: NgbModal
  ) { }

  ngOnInit(): void {
    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.categoriesService.getAllCategories()
      .subscribe((res: any) => {
        this.listCategories = res.data
        this.dtTrigger.next()
        console.log('category list management', this.listCategories)
      })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.loadListCategory()
  }

  ngOnChanges(): void {
    this.loadListCategory()
  }

  public loadListCategory() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.categoriesService.getAllCategories()
        .subscribe((res: any) => {
          this.listCategories = res.data
          this.dtTrigger.next()
          console.log('category list management', this.listCategories)
        })
    })
  }

  public openModalAddCategory(modal) {
    this.checkAction = 'add'
    this.resetForm()
    this.ngbModal.open(modal)
  }

  public addCategory() {
    let body = {
      description: this.addDescription,
      typeCategories: 'MECANO',
      price: this.addPrice
    }
    this.categoriesService.addCategories(body)
      .subscribe((res) => {
        console.log(res)
        this.dtTrigger.next()
        this.ngbModal.dismissAll()
        this.loadListCategory()
        this.resetForm()
      })
  }

  public async emitDataCategory(param: any) {
    this.checkAction = 'edit'
    this.categoryId = param.id
    this.addDescription = param.description
    this.typeCategorie = param.typeCategories
    this.addPrice = param.price

    console.log([this.addDescription, this.typeCategorie, this.addPrice])

    await <any>this.ngbModal.open(this.actionCategory)
  }

  public updateCategory() {
    let body = {
      id: this.categoryId,
      description: this.addDescription,
      typeCategories: 'MECANO',
      price: this.addPrice
    }
    this.categoriesService.updateCategories(body)
      .subscribe((res: any) => {
        console.log(res)
        this.ngbModal.dismissAll()
        this.loadListCategory()
      })
  }

  public beforeDeleteCategory(param) {
    this.deleteCategoryId = param
    console.log('delete this', this.deleteCategoryId)
    this.ngbModal.open(this.confirmDelete)
  }

  public deleteCategory() {
    console.log('process delete', this.deleteCategoryId)
    let body = {
      id: this.deleteCategoryId
    }
    this.categoriesService.deleteCategories(body)
      .subscribe((res) => {
        console.log(res)
        this.loadListCategory()
        this.ngbModal.dismissAll()
      })
  }

  public closeModal() {
    this.ngbModal.dismissAll()
  }

  public resetForm() {
    this.addDescription = ''
    this.addPrice = ''
  }
}
