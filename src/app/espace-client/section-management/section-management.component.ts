import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CONFIGURATION } from 'src/app/interfdata/data-configuration';
import { SectionsService } from 'src/app/services/sections.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-section-management',
  templateUrl: './section-management.component.html',
  styleUrls: ['./section-management.component.scss']
})
export class SectionManagementComponent implements OnInit {

  @Input() public listSection: any = []
  public imageSection: any = []
  public apiUrlImage: any = CONFIGURATION.apiUrlImage

  @Output() public showRightMenu: EventEmitter<any> = new EventEmitter()

  public selectDiag2: any = []
  public listSkillLoaded: any = []

  public numberDiagnostic2Checked: boolean

  constructor(
    private sectionService: SectionsService,
    private skillService: SkillService
  ) {
    this.numberDiagnostic2Checked = false
  }

  ngOnInit(): void {

    this.sectionService.publicGetAllSection()
      .subscribe((res: any) => {
        this.listSection = res.data
        console.log('section management', this.listSection)
        for (let i = 0; i < this.listSection.length; i++) {
          this.imageSection[i] = this.apiUrlImage + res.data[i].image
        }
      })
  }

  public proc_checkService(service_id: any) {
    let exist = false
    this.listSection.map((res, index) => {
      const tabTrait = res.diagnostic2s
      let arrayTabSection = tabTrait.map((val, index) => {
        // console.log([val.id, service_id])
        if (val.id === service_id) {
          if (val.check === false) {
            val.check = true
          } else if (val.check === true) {
            val.check = false
            exist = true
          }
        }
        return val
      })
      // console.log('arrayTabSection', arrayTabSection)
      return res
    })
    // console.log(exist)
    if (exist === false) {
      this.selectDiag2.push(service_id)
    } else {
      const newliste = [];
      for (const item of this.selectDiag2) {
        if (item !== service_id) {
          newliste.push(item)
        }
      }
      this.selectDiag2 = newliste
    }
    console.log(this.selectDiag2)
    localStorage.setItem('selectDiagnostic2', this.selectDiag2)
    localStorage.setItem('SelectDiagnostic1Id', '3')
  }

  /**
   * pushDiagnostic2ForResult
   */
  public pushDiagnostic2ForResult() {
    let body = {
      diagnostic2Id: this.selectDiag2
    }
    this.skillService.publicGetSkillsByDiagnostic2Selected(body)
      .subscribe((res: any) => {
        this.listSkillLoaded = res.data
        console.log('listSkillLoaded', this.listSkillLoaded)
        if (this.selectDiag2.length == 0) {
          this.numberDiagnostic2Checked = true
          localStorage.setItem('numberDiag2', this.selectDiag2.length)
          this.emitShowMenu()
          setTimeout(() => {
            this.numberDiagnostic2Checked = false
          }, 2500)
        } else {
          localStorage.setItem('numberDiag2', this.selectDiag2.length)
          this.emitShowMenu()
        }
        console.log('showRightMenu', this.showRightMenu)
      })
  }

  /**
   * emitShowMenu
   */
  public emitShowMenu() {
    this.showRightMenu.emit()
  }
}
