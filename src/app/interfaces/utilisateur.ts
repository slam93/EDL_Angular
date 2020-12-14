export class Utilisateur {

    id?: number;
    nom?: string;
    email?: string;
    coordonnee?: string;
    ville?: string;
    adresse?: string;
    photo?: string;
    type?: string;
    password?: string;
    codeverif?: string;
    token?: string;
    logo?: string;  // Url representation User
    role?: string;

    identification?: number;
    firstName?: string;
    lastName?: string;
    provider?: string;
    username?: string;
    enabled?: string;
    data?: string;

}

export class Email {
  email?: string;
  emaillength: number;
}
