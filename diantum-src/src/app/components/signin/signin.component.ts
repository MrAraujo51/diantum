/*
 * @Author: Manuel Araujo
 * @Date: 2017-07-02 13:49:32
 * @Last Modified time: 2017-07-02 13:49:32
 */
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../service/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit {

  rForm: FormGroup;
  previusUrl;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public authGuard: AuthGuard,
    public translate: TranslateService,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.rForm = formBuilder.group ({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
    });
  }

  ngOnInit() {
    if (this.authGuard.redirectUrl) {
      this.previusUrl = this.authGuard.redirectUrl;
      this.authGuard.redirectUrl = undefined;
    }
  }
  onSignInSubmit() {
    const user = {
      username: this.rForm.get('username').value,
      password: this.rForm.get('password').value
    }

    this.authService.authUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.translate.get('Login realizado con éxito').subscribe((res) => {
          this.toastr.success(res, null, {positionClass: 'toast-top-center'})
            .then(() => {
              setTimeout(() => {
                if (this.previusUrl) {
                  this.router.navigate([this.previusUrl]);
                } else {
                  this.router.navigate(['profile']);
                }
              }, 500);
            });
        })
      } else {
        this.translate.get(data.message).subscribe((res) => {
          this.toastr.error(res, null, {positionClass: 'toast-bottom-center'})
        });
      }
    }, (err) => {
      console.log(err);
    });
  }
  goToSignUp() {
    this.router.navigate(['signup']);
  }

}
