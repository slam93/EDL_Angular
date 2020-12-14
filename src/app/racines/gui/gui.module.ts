import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagePromptComponent } from './message-prompt/message-prompt.component';



@NgModule({
  exports: [MessagePromptComponent],
  declarations: [MessagePromptComponent],
  imports: [
    CommonModule
  ]
})
export class GuiModule { }
