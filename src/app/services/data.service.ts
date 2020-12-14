import { Utilisateur } from 'src/app/interfaces/utilisateur';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    /* ##############################   VARIABLE FONCTIONNEL    ############################## */
    private messageSource = new BehaviorSubject<string>('default message');
    currentMessage = this.messageSource.asObservable();

    private connectedToken = new BehaviorSubject<string>('');
    currentToken = this.connectedToken.asObservable();

    private connectedImage = new BehaviorSubject<string>('');
    currentUrlImageConnected = this.connectedImage.asObservable();

    private connectedImageGarage = new BehaviorSubject<string>('');
    currentUrlImageGarage = this.connectedImageGarage.asObservable();

    private connectedId = new BehaviorSubject<number>(0);
    currentConnected = this.connectedId.asObservable();

    private connectedNom = new BehaviorSubject<string>('');
    currentNomConnected = this.connectedNom.asObservable();

    private sectionImage = new BehaviorSubject<string>('')
    currentSectionImage = this.sectionImage.asObservable()

    private user: Utilisateur = {};
    private userConnected = new BehaviorSubject<Utilisateur>(this.user);
    currentUserConnected = this.userConnected.asObservable();

    /* ##############################   CONSTRUCTOR    ############################## */
    constructor() { }


    /* ##############################   FUNCTION    ############################## */
    public changeMessage(message: string) {
        this.messageSource.next(message);
    }

    public changeUrlImageConnected(urlImage: string) {
        this.connectedImage.next(urlImage);
    }

    public changeUrlImageGarage(urlImage: string) {
        this.connectedImageGarage.next(urlImage);
    }

    public changeToken(newtoken: string) {
        this.connectedToken.next(newtoken);
    }

    public changeConnected(id: number) {
        this.connectedId.next(id);
    }

    public changeNomConnected(nom: string) {
        this.connectedNom.next(nom);
    }

    public changeUserConnected(user: Utilisateur) {
        this.userConnected.next(user);
    }

    public changeUrlSection(urlImage: string) {
        this.sectionImage.next(urlImage);
    }

}