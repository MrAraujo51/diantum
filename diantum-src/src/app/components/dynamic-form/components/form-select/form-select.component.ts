import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  selector: 'form-select',
  styleUrls: [],
  template: `
    <div
      class="form-group"
      [formGroup]="group">
      <label class="col-md-8">{{ config.label | translate }}</label>
      <select class="form-control col-md-4 input-sm form-white" [formControlName]="config.name">
        <option value="">{{ config.placeholder | translate }}</option>
        <option *ngFor="let option of config.options">
          {{ option }}
        </option>
      </select>
    </div>
  `
})
export class FormSelectComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}
