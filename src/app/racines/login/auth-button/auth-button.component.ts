import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { SocialAuthService } from 'angularx-social-login';
// @ts-ignore
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';
import { UtilisateurService } from '../../../services/utilisateur.service';
@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent implements OnInit {
  /* #################################    VARIABLE    ################################## */

  // à ajouter dans la base données   |  Rattachées à un compte normal de l'utilisateur
  @Input() user: SocialUser;
  // user: SocialUser;
  loggedIn: boolean;
  /* #################################    CONSCTRUCTOR    ################################## */
  constructor(
    private authService: SocialAuthService,
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit() {
    this.authService.authState.subscribe(async (user) => {
      this.user = user;
      this.loggedIn = user != null;
      // this.editoraddUser();
      console.log('le user', user, this.user);
    });
  }

  editoraddUser() {
    console.log('this Us', this.user);
    // const isemailexist = await this.utilisateurService.getifemailexist(user.email);
    const user = this.user;
    if (this.user !== null && this.user !== undefined) {
      this.utilisateurService.getifemailexist(user.email).subscribe((data) => {
        console.log('the data', data);
        const fborgoogledata = {
          email: user.email,
          identification: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          provider: user.provider,
          username: user.name,
          enabled: 1,
        };
        if (data.emaillength === 0) {
          // tslint:disable-next-line:no-shadowed-variable
          this.utilisateurService
            .addUserToInsertFbOrGoogle(fborgoogledata)
            .subscribe((data) => {
              console.log("la retour d'ajout", data);
              this.savedatalocalstorage(data.data, data.provider);
            });
        } else if (data.emaillength >= 1) {
          // tslint:disable-next-line:no-shadowed-variable
          this.utilisateurService
            .editUserToInsertFbOrGoogle(fborgoogledata)
            .subscribe((data) => {
              console.log("la retour d'edition", data);
              this.savedatalocalstorage(data.data, data.provider);
            });
        }
      });
    } else {
      console.log('undefined le iz');
    }
  }

  savedatalocalstorage(token, provider) {
    console.log(
      '##############################  SET TOKEN ######################################'
    );
    localStorage.setItem('token', token);
    localStorage.setItem('provider', provider);
    console.log('inscrit or logged', provider);
  }

  ngOnChange() {}

  /* #################################    FONCTION    ################################## */
  public signInWithGoogle(): void {
    const googleLoginOptions = {
      scope: 'profile, email',
    }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      this.editoraddUser();
      console.log('google', data);
    });
    console.log('goog');
    // this.router.navigateByUrl('accueil-client')
  }

  public signInWithFB(): void {
    console.log('facebook');
    const fbLoginOptions = {
      // scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages'
      scope: 'email',
    }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      this.editoraddUser();
      console.log('fb', data);
    });
    console.log('fb');
  }

  public signOut(): void {
    this.authService.signOut();
  }
}
