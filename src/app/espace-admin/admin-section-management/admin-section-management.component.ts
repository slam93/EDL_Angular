import { Component, OnInit, ViewChild, OnChanges, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FrenchDataTables } from './../../interfdata/data-french-dt';
import { Subject } from 'rxjs';
import { SectionsService } from 'src/app/services/sections.service';
import { DataService } from 'src/app/services/data.service';
import { DataTableDirective } from 'angular-datatables';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';

@Component({
  selector: 'app-admin-section-management',
  templateUrl: './admin-section-management.component.html',
  styleUrls: ['./admin-section-management.component.scss']
})
export class AdminSectionManagementComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('actionSection') actionSection: any
  @ViewChild('confirmDelete') confirmDelete: any
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  public dtTrigger = new Subject()
  public frenchDT: any
  public dtOptions: DataTables.Settings = {}

  public listSections: any = []

  // variable image
  public apiUrlImage = CONFIGURATION.apiUrlImage
  public fileToUpload: any
  public filePrint: any = []

  public sectionDescription: any
  public checkAction: any
  public sectionId: any

  constructor(
    private sectionService: SectionsService,
    private ngbModal: NgbModal,
    private dataService: DataService
  ) { }

  ngOnInit(): void {

    this.frenchDT = FrenchDataTables
    this.dtOptions = { language: this.frenchDT, destroy: true }

    this.sectionService.getAllSection()
      .subscribe((res: any) => {
        this.listSections = res.data
        for (let i = 0; i < res.data.length; i++) {
          this.filePrint[i] = this.apiUrlImage + res.data[i].image
          console.log('filePrint[i]', this.filePrint[i])
        }
        this.dtTrigger.next()
        console.log('listSections', this.listSections)
      })
  }

  ngOnChanges(): void {
    this.loadListSection()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
    this.loadListSection()
  }

  /**
   * loadListSection
   */
  public loadListSection(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.sectionService.getAllSection()
        .subscribe((res: any) => {
          this.listSections = res.data
          // this.filePrint = this.apiUrlImage + res.data.image
          for (let i = 0; i < res.data.length; i++) {
            this.filePrint[i] = this.apiUrlImage + res.data[i].image
            console.log('filePrint[i]', this.filePrint[i])
          }
          this.dtTrigger.next()
          console.log('listSections', this.listSections)
        })
    })
  }

  // Checking file upload via function
  // public handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0)
  // }

  public emitCropped(value) {
    const imageName = 'image-name.png';
    const imageFile = new File([value], imageName, { type: 'image/png' });

    this.fileToUpload = imageFile;
    console.log(this.fileToUpload);
  }

  /**
   * addSection
   */
  public addSection() {
    if (this.fileToUpload !== undefined) {
      const formData = new FormData()
      formData.append('data', this.fileToUpload)

      this.sectionService.uploadImageSection(formData)
        .subscribe((res: any) => {
          console.log('IMAGE SECTION', res)

          let body = {
            description: this.sectionDescription,
            image: res.nameFile
          }

          this.sectionService.addSection(body)
            .subscribe((result: any) => {
              if (!res) {
                console.log('ERROR UPLOAD IMAGE')
              } else {
                console.log('IMAGE UPLOADED OK')
                console.log('result', result)
                for (let i = 0; i < result.length; i++) {
                  this.dataService.changeUrlSection(this.apiUrlImage + res[i].nameFile)
                  this.filePrint[i] = this.apiUrlImage + res[i].nameFile
                }
                this.loadListSection()
                this.closeModal()
              }
            })
        })
    }
  }

  /**
   * emitEditSection
   */
  public async emitEditSection(param: any) {
    this.checkAction = 'update'
    console.log('ckeckAction', this.checkAction)
    console.log('emit section', param)
    this.sectionId = param.id
    this.sectionDescription = param.description
    await <any>this.ngbModal.open(this.actionSection)
  }

  // UPDATE SECTION

  public updatSection() {
    console.log([this.sectionId, this.sectionDescription])

    if (this.fileToUpload !== undefined) {
      const formData = new FormData()
      formData.append('data', this.fileToUpload)

      this.sectionService.uploadImageSection(formData)
        .subscribe((res: any) => {
          console.log('IMAGE SECTION', res)

          let body = {
            id: this.sectionId,
            description: this.sectionDescription,
            image: res.nameFile
          }

          this.sectionService.updateSection(body)
            .subscribe((result: any) => {
              if (!res) {
                console.log('ERROR UPLOAD IMAGE')
              } else {
                console.log('IMAGE UPLOADED OK')
                console.log('result', result)
                for (let i = 0; i < result.length; i++) {
                  this.dataService.changeUrlSection(this.apiUrlImage + res[i].nameFile)
                  this.filePrint[i] = this.apiUrlImage + res[i].nameFile
                }
              }
              this.closeModal()
              this.loadListSection()
            })
        })
    }
  }

  // Action DELETE ======================================
  public emitDeleteSection(section) {
    this.sectionId = section
    console.log('delete sectionID', this.sectionId)
    this.ngbModal.open(this.confirmDelete)
  }

  public deleteSection() {
    let body = {
      id: this.sectionId
    }

    this.sectionService.deleteSection(body)
      .subscribe(() => {
        this.dtTrigger.next()
        this.loadListSection()
        this.ngbModal.dismissAll()
      })
  }
  // =================================================

  // ==== MODAL ==========================

  public openModalForAction(modal) {
    this.checkAction = 'add'
    this.sectionDescription = ''
    this.ngbModal.open(modal)
  }

  public closeModal() {
    this.ngbModal.dismissAll()
    this.sectionDescription = ''
  }
}
