import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { EspaceClientModule } from 'src/app/espace-client/espace-client.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ChatInboxModule } from '../chat-inbox/chat-inbox.module';
import { EspaceMecanoModule } from 'src/app/espace-mecano/espace-mecano.module';

@NgModule({
  declarations: [ ContainerComponent ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    ChatInboxModule,
    PagesModule,
    EspaceClientModule,
    EspaceMecanoModule
  ]
})

export class ContainerModule { }
