import { Router } from '@angular/router';
import { isToken } from './../delegationDeFonctions/fonctionRedondant';
import { UtilisateurService } from './../../services/utilisateur.service';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** ######################     VARIABLE     ######################## */


  /** ######################     CONSCTRUCTOR     ######################## */
  constructor(
    private utilisateurApi: UtilisateurService,
    private router: Router,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {

    // Test if demande en attente 
    if(localStorage.getItem('NextActualPage') == "app-liste-mecano"){
      this.router.navigateByUrl('listeMecanoOffre');
      localStorage.removeItem('NextActualPage');
    }

    this.utilisateurApi.getUtilisateurMe().subscribe((resultMe: any) => {
      console.log(resultMe);
    });

  }

  /** ######################     FONCTION     ######################## */
  public proc_change_page(myroute: string){
    console.log(myroute);
    if (isToken){
      this.router.navigate([myroute]);
    }
  }

  public deconnexion() {
   // console.log(myroute);
    this.authService.signOut();
    localStorage.setItem('token', '');
    console.log("##############################  SET TOKEN ######################################");
    this.router.navigate(['/login/connexion']);
  }
}
