import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as io from 'socket.io-client';

import { FormGroup, FormBuilder } from '@angular/forms';
// @ts-ignore
import { CONFIGURATION } from '../../interfdata/data-configuration';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat.service';
import { InterventionService } from 'src/app/services/intervention.service';

// @ts-ignore
const SOCKET_ENDPOINT = CONFIGURATION.SOCKET_ENDPOINT;
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss'],
})
export class ChatInboxComponent implements OnInit, OnChanges {
  @Input() item: any;
  title = 'angular-image-file-upload-tutorial';
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  emailSenderAnonyme = '';

  socket;
  message: string;
  constructor(private http: HttpClient,
    private formBuilder: FormBuilder,
    private chatApi: ChatService,
    private interventionApi: InterventionService) { }

  ngOnInit(): void {
    this.setupSocketConnection();
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: [''],
    });

    if (localStorage.getItem('userId') !== null) {
      const userData = JSON.parse(localStorage.getItem('user'));
      this.emailSenderAnonyme = userData.email;
      document.getElementById('email-adresse').style.display = 'none';
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentItem: SimpleChange = changes.item;
    console.log('prev value: ', currentItem.previousValue);
    console.log('got item: ', currentItem.currentValue);
    if (currentItem.currentValue) {
      this.openSpecificChat(currentItem.currentValue);
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: any) => {
      if (data) {
        console.log(data);
        const thejson = {
          idUser1: 10,
          idUser2: 11,
          idsender: data.idsender,
          idreceiver: data.idreceiver,
          name: 'Utilisateur 1',
          message: data.message,
          image: data.image,
        };

        let idUserConnected = 0;
        if (localStorage.getItem('userId') !== null) {
          idUserConnected = +localStorage.getItem('userId');
        }
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('userData', userData);
        if (userData.userRole === 'ADMIN') {
          idUserConnected = 0;
        }
        //cheker si le destinatire du message est connecter et afficher le message
        //ainsi changer le status du message en lu
        if (idUserConnected === Number(thejson.idreceiver)) {
          if (thejson.image !== '') {
            const element = document.createElement('li');
            element.innerHTML =
              '<img src="' +
              thejson.image +
              '" style="width: 100px; height: 100px"/>';
            const h = document.createElement('div');
            const t = document.createTextNode(thejson.message);
            h.appendChild(t);
            element.appendChild(h);
            element.style.background = '#eee';
            element.style.padding = '4px 15px';
            element.style.margin = '10px 0';
            document.getElementById('message-list').appendChild(element);
          } else {
            const element = document.createElement('li');
            element.innerHTML = thejson.message;
            element.style.background = '#eee';
            element.style.padding = '4px 15px';
            element.style.margin = '10px 0';
            element.style.borderRadius = '0 10px 10px 10px';
            document.getElementById('message-list').appendChild(element);
          }
        }
      }
    });
  }


  /**
   * ouvrir une fenetre de chat privee
   * entre un utilisateur et un mecanicien ou un administrateur
   */
  openSpecificChat(Id) {
    document.getElementById('message-list').innerHTML = '';
    document.getElementById('email-adresse').style.display = 'none';

    this.interventionApi.getInterventionById(Id).subscribe((interventionData: any) => {
      console.log('interventionData', interventionData);

      const userData = JSON.parse(localStorage.getItem('user'));
      const formulaire = document.getElementById('titrechat');
      formulaire.setAttribute('data-intervention', Id);
      if (userData.userRole === 'CLIENT') {
        formulaire.setAttribute('data-receiver', interventionData.data.mechanic.userId);
        formulaire.innerHTML = 'Discussion avec Garage ' + interventionData.data.mechanic.name;

      } else if (userData.userRole === 'MECANO') {
        formulaire.setAttribute('data-receiver', interventionData.data.user.id);
        formulaire.innerHTML = 'Discussion avec le Client ' + interventionData.data.user.username;

      }
    });
    this.openForm();
    this.chatApi.getChatByInterventionId({ interventionId: Id }).subscribe((listeChat: any) => {
      listeChat.data.forEach((value) => {
        // console.log(value);
        // console.log(value.image);
        const thejson = value;
        let idUserConnected = '0';
        if (localStorage.getItem('userId') !== null) {
          idUserConnected = localStorage.getItem('userId');
        }
        if (idUserConnected === thejson.idreceiver) {
          if (typeof thejson.image !== 'undefined') {
            const element = document.createElement('li');
            element.innerHTML =
              '<img src="' +
              thejson.image +
              '" style="width: 100px; height: 100px"/>';
            const h = document.createElement('div');
            const t = document.createTextNode(thejson.message);
            h.appendChild(t);
            element.appendChild(h);
            element.style.background = '#eee';
            element.style.padding = '4px 15px';
            element.style.margin = '10px 0';
            document.getElementById('message-list').appendChild(element);
          } else {
            const element = document.createElement('li');
            element.innerHTML = thejson.message;
            element.style.background = '#eee';
            element.style.padding = '4px 15px';
            element.style.margin = '10px 0';
            element.style.borderRadius = '0 10px 10px 10px';
            document.getElementById('message-list').appendChild(element);
          }
        } else if (idUserConnected === thejson.idsender) {
          if (typeof thejson.image !== 'undefined') {
            const element = document.createElement('li');
            element.innerHTML =
              '<img src="' +
              thejson.image +
              '" style="width: 100px; height: 100px"/>';
            const h = document.createElement('div');
            const t = document.createTextNode(thejson.message);
            h.appendChild(t);
            element.appendChild(h);
            element.style.background = '#9C3183';
            element.style.padding = '15px 30px';
            element.style.margin = '10px 0';
            element.style.textAlign = 'right';
            element.style.borderRadius = '10px 0 10px 10px';
            document.getElementById('message-list').appendChild(element);
          } else {
            const element = document.createElement('li');
            element.innerHTML = thejson.message;
            element.style.background = '#9C3183';
            element.style.padding = '4px 15px';
            element.style.margin = '10px 0';
            element.style.textAlign = 'right';
            element.style.color = '#fff';
            element.style.borderRadius = '10px 0 10px 10px';
            document.getElementById('message-list').appendChild(element);
          }
        }
      });
    });
  }

  SendMessage() {
    let thejson;
    const formulaire = document.getElementById('titrechat');
    let receiver = formulaire.getAttribute('data-receiver');
    const intervention = formulaire.getAttribute('data-intervention');

    if (receiver === null) { // pour ladmin
      receiver = '0';
      if (this.emailSenderAnonyme === '') {
        // affiche erreu
        alert('le champs adresse email doit etre rempli');
        return;
      }else{
        document.getElementById('email-adresse').style.display = 'none';
      }
    }

    console.log('ok', this.fileUploadForm.get('uploadedImage').value);
    if (this.fileUploadForm.get('uploadedImage').value === '') {
      let idUserConnected = '0';
      if (localStorage.getItem('userId') !== null) {
        idUserConnected = localStorage.getItem('userId');
      }
      thejson = {
        idUser1: 11,
        idUser2: 10,
        idsender: idUserConnected,
        idreceiver: receiver,
        name: 'Utilisateur 1',
        message: this.message,
        image: '',
        interventionId: intervention,
        emailSender: this.emailSenderAnonyme
      };
      this.socket.emit('message', thejson);
      const element = document.createElement('li');
      element.innerHTML = thejson.message;
      element.style.background = '#9C3183';
      element.style.padding = '4px 15px';
      element.style.margin = '10px 0';
      element.style.textAlign = 'right';
      element.style.color = '#fff';
      element.style.borderRadius = '10px 0 10px 10px';
      document.getElementById('message-list').appendChild(element);
      this.message = '';
    } else {
      // mis photo
      if (!this.fileUploadForm.get('uploadedImage').value) {
        alert('Please fill valid details!');
        return false;
      }

      const formData = new FormData();
      formData.append('data', this.fileUploadForm.get('uploadedImage').value);
      formData.append('text', this.message);
      // Reset the file input
      this.uploadFileInput.nativeElement.value = '';
      // this.fileUploadForm.get('uploadedImage').value ='';
      console.log('form data', formData);
      this.http.post<any>(SOCKET_ENDPOINT + 'upload', formData).subscribe(
        (response) => {
          console.log(response);
          if (response.statusCode === 200) {
            this.fileInputLabel = undefined;
            let idUserConnected = '0';
            if (localStorage.getItem('userId') !== null) {
              idUserConnected = localStorage.getItem('userId');
            }
            thejson = {
              idUser1: 11,
              idUser2: 10,
              idsender: idUserConnected,
              idreceiver: receiver,
              name: 'Utilisateur 1',
              message: this.message,
              image: response.url,
              interventionId: intervention,
              emailSender: this.emailSenderAnonyme

            };
            this.socket.emit('message', thejson);
            console.log('ms', this.message);
            if (this.message === '') {
              // affichage sar samirer
              const element = document.createElement('li');
              element.innerHTML =
                '<img src="' +
                response.url +
                '" style="width: 100px; height: 100px"/>';
              element.style.background = '#9C3183';
              element.style.padding = '15px 30px';
              element.style.margin = '10px 0';
              element.style.textAlign = 'right';
              element.style.borderRadius = '10px 0 10px 10px';
              document.getElementById('message-list').appendChild(element);
              this.message = '';
            } else {
              const element = document.createElement('li');
              element.innerHTML =
                '<img src="' +
                response.url +
                '" style="width: 100px; height: 100px"/>';
              const h = document.createElement('div');
              const t = document.createTextNode(thejson.message);
              h.appendChild(t);
              element.appendChild(h);
              element.style.background = '#9C3183';
              element.style.padding = '15px 30px';
              element.style.margin = '10px';
              element.style.textAlign = 'right';
              element.style.borderRadius = '10px 0 10px 10px';
              document.getElementById('message-list').appendChild(element);
              this.message = '';
            }
          }
        },
        (er) => {
          console.log(er);
          alert(er.error.error);
        }
      );
    }
  }

  openForm() {
    document.getElementById('myForm').style.display = 'block';
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
  }
}
