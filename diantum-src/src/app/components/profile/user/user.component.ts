import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { InstanceService } from '../../../service/instance.service';
import { ValidateService } from 'app/service/validate.service';
import { AuthService } from 'app/service/auth.service';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  profile: any
  instances: any = [];
  processing: any;
  suscription: any;
  message: any;
  messageClass: any;
  token: any;
  passForm: FormGroup;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public instanceService: InstanceService,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public validateService: ValidateService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.createForm()
   }

  ngOnInit() {
    this.getAllInstances()
  }

  createForm() {
    this.passForm = this.formBuilder.group({
      'password': [null, Validators.required],
      'newPassword': [null, Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validateService.validatePasswordUpperCase, // Custom validation
        this.validateService.validatePasswordLowerCase,
        this.validateService.validatePasswordNumber,
        this.validateService.validatePasswordSpecialCharacter
      ])],
      // Confirm Password Input
      'confirmNew': [null, Validators.required]
    }, {
      validator: this.validateService.validateMatchingPasswords('newPassword', 'confirmNew')
    })
  }

  haveAccess(iat, exp) {
    if (Date.parse(iat) < Date.now() && Date.parse(exp) > Date.now() ) { return {  access: true, class: 'btn-success', message: 'Acceso' } }

    if (Date.now() < Date.parse(iat) ) { return { access: false, class: 'btn-warning', message: 'Pendiente' } }

    if (Date.now() > Date.parse(exp) ) { return { access: false, class: 'btn-danger', message: 'Cerrado' } }
  }

  registerInstance() {
    const instanceToken = {
      instance_token: this.token
    }
    this.processing = true;

    this.instanceService.registerInstance(instanceToken).subscribe(data => {
      this.suscription = null;
      if (!data.success) {
        this.translate.get(data.message).subscribe((msg) => {
          this.toastr.error(msg)
        })
        this.processing = false;

      } else {
        this.translate.get(data.message).subscribe((msg) => {
          this.toastr.success(msg)
        })
        this.suscription = data.instance
        this.getAllInstances()
      }
      setTimeout(() => {
        this.message = false;
        this.processing = false;
      }, 2000)
    })
  }

  onChangeSubmitPass() {
    const passwords = {
      password: this.passForm.get('password').value,
      newPassword: this.passForm.get('newPassword').value,
      confirmNew: this.passForm.get('confirmNew').value
    }

    this.authService.resetPassword(passwords).subscribe(data => {
      setTimeout(() => {
        if (!data.success) {
          this.translate.get(data.message).subscribe((msg) => {
            this.toastr.error(msg)
          })
        } else {
          this.translate.get(data.message).subscribe((msg) => {
            this.toastr.success(msg)
          })
        }
        setTimeout(() => {
          this.message = false;
          this.processing = false;
        }, 2000)
      }, 500)
    });
  }

  getAllInstances() {
    this.instanceService.getInstances().subscribe(data => {
      if (data.success) {
        this.instances = data.instances;
        for (const key in this.instances) {
          if (this.instances.hasOwnProperty(key)) {
            this.instances[key].access = this.haveAccess(new Date(this.instances[key].iat), new Date(this.instances[key].exp));
          }
        }
      } else {
        this.translate.get(data.message).subscribe((msg) => {
          this.toastr.error(msg)
        })
      }
    })
  }

  goToInstace(ins) {
    if (ins.access.access) {
      if (ins.code === '1701') {
        localStorage.setItem('GID', ins._id);
        this.router.navigate(['/candies-game/simulation']);
      } else if (ins.code === '1709') {
        localStorage.setItem('GID', ins._id);
        this.router.navigate(['/sales-cyclum/simulation']);
      }
    }
  }
}
