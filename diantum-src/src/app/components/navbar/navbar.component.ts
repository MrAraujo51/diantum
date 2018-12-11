/*
 * @author: Manuel Araujo
 * Created on 2017-08-18 00:55:23
 */
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastsManager } from 'ng2-toastr';
// import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser;
  constructor(
    public translate: TranslateService,
    public router: Router,
    public authService: AuthService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    ) {

    }

  ngOnInit() {
    this.authService.loadUser()
    this.authService.currentUser.subscribe(
      (userData) => {
        if(userData){
          this.currentUser = userData.username;
        }
      }
    )
  }

  isColorDark() {
    if (this.router.url === '/home' || this.router.url === '/signup' || this.router.url === '/signin') {
      return false;
    }
    return true;
  }

  onLogoutClick() {
    this.authService.logout();
    this.translate.get('Sesión cerrada').subscribe((res) => {
      this.toastr.error(res)
        .then(() => {
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 500)
        })
    })
    return false;


  }

  changeLanguage(lang) {
    this.translate.use(lang);
    this.translate.currentLang = this.translate.currentLang;
  }

  goTo(dir) {
    console.log(dir);
    this.router.navigate([dir.toString()]);
  }

}
