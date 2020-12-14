import { Diagnostic1 } from './diagnostic1';
import { Voiture } from './voiture';
import { Diagnostic2 } from './diagnostic2';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
export class Intervention {

  id?: number;
  dateInterDeb?: Date;
  dateInterFin?: Date;
  adresse?: string;
  problemeDescription?: string;
  problemePhoto?: string;
  userCli?: Utilisateur;
  userMec?: Utilisateur;
  diagId?: Diagnostic1;
  diagnostic2Id: Diagnostic2;
  voitureId?: Voiture;

}
