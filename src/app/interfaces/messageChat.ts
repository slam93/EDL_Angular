import { FichierChat } from './fichierChat';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
export class MessageChat {

  id?: number;
  message?: string;
  dateChat?: string;
  state: boolean;
  userAdmin?: Utilisateur;
  userCli?: Utilisateur;
  userMec?: Utilisateur;
  idFichierChat?: FichierChat;

}
