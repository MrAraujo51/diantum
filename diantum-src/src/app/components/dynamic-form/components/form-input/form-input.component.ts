import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-input',
  styleUrls: [],
  template: `
    <div
      class="form-group"
      [formGroup]="group">
      <label class="col-md-8">{{ config.label | translate }}</label>
      <input
        class="form-control col-md-4 input-sm form-white"
        [type]="config.inputType ? config.inputType : 'text'"
        [min]="config.min"
        [max]="config.max"
        [attr.placeholder]="config.placeholder"
        [formControlName]="config.name"
        (keyup)="onKeyUp($event)">

    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;


  onKeyUp(event) {
    console.log(this.group);
    if (typeof (event.key) === 'string') {
      event.target.value = parseInt(event.target.value)}
    if (this.config.min !== null && this.config.max !== null) {
      if (event.target.value < this.config.min) {event.target.value = this.config.min}
      if (event.target.value > this.config.max) {event.target.value = this.config.max}
    }

  }
}
