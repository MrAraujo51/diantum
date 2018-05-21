import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { InstanceService } from 'app/service/instance.service';

import { ProductService } from 'app/service/product.service';
import { DynamicFormComponent } from 'app/components/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from 'app/components/dynamic-form/models/field-config.interface';
import { Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit,  AfterViewInit {
  @ViewChildren(DynamicFormComponent) query: QueryList<DynamicFormComponent>;

  products: any = [];
  pin: any = [];
  processing: boolean;
  users: any = [];
  message: any;
  messageClass: string;
  configForm: FieldConfig[]
  productsLoaded = false;

  instances: any;
  forms: any;

  constructor(
    public instanceService: InstanceService,
    public productService: ProductService,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    this.getAllInstances();

    this.productService.getProducts().subscribe(res => {
      if (res.success) {
        this.products = res.products
        this.productsLoaded = true;
      }
    })
  }

  ngAfterViewInit() {
    this.setParamsValue()
  }

  getAllInstances() {
    this.instanceService.getInstances().subscribe(data => {
      if (data.success) {
        this.instances = data.instances;
        for (const key in this.instances) {
          if (this.instances.hasOwnProperty(key)) {
            this.getUsers(this.instances[key]._id, key);
          }
        }
      } else {
        this.translate.get(data.message).subscribe((msg) => {
          this.toastr.error(msg)
        })
      }
    })
  }

  getUsers(ins, i) {
    this.instanceService.getUsers(ins).subscribe(data => {
      if (!data.success) {
        this.translate.get(data.message).subscribe((msg) => {
          this.toastr.error(msg)
        })
      } else {
        this.users[i] = data.users
      }
    })
  }

  changeRol(ins, i) {
    const req = {
      instance_id: ins._id,
      pin: this.pin[i]
    }

    this.processing = true;
    this.instanceService.changeRol(req).subscribe(data => {
      setTimeout(() => {
        if (!data.success) {
          this.translate.get(data.message).subscribe((msg) => {
            this.toastr.error(msg)
          })
        } else {
          this.translate.get(data.message).subscribe((msg) => {
            this.toastr.success(msg)
          })
          this.instances[i].rol = 'admin'
          this.setParamsValue()
        }
        setTimeout(() => {
          this.message = false;
          this.processing = false;
        }, 2000)
       }, 500)
    })
  }

  getColumnsName(code) {
    const product = this.products.filter(prod => prod.code === code)[0];
    return product.columnName;
  }

  getConfigParams(code) {
    const product = this.products.filter(prod => prod.code === code)[0];
    return product.configParams;
  }

  setParamsValue() {
    this.query.changes.subscribe( () => {
      this.forms = this.query.toArray();
      if (!this.instances || !this.forms.length) { return null; }
      for (let i = 0; i < this.forms.length; i++) {
        const obj = this.instances.find(ins => ins._id === this.forms[i].id).params
        if(obj) {
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              this.forms[i].setValue(key, obj[key])
            }
          }
        }
      }
    });
  }
  submit(i, id) {
    console.log(this.forms[i].value);
    this.instanceService.changeParameters(id, this.forms[i].value).subscribe((res) => {
      if (res.success) {
        this.translate.get(res.message).subscribe((msg) => {
          this.toastr.success(msg)
        })
      } else {
        this.translate.get(res.message).subscribe((msg) => {
          this.toastr.error(msg)
        })
      }
    })
  }
}
