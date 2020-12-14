import { Categorie } from './categorie';
import { Utilisateur } from 'src/app/interfaces/utilisateur';
export class Abonnement {

  id?: number;
  dateAbonDeb?: Date;
  dateAbonFin?: Date;
  catId?: Categorie;
  userCli?: Utilisateur;

}
