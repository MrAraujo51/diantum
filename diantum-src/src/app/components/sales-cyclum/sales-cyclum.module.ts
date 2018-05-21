import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';


import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { SalesCyclumRoutingModule } from './sales-cyclum-routing.module';
import { SalesCyclumComponent } from './sales-cyclum.component';
import { SimulationComponent } from './simulation/simulation.component';
import { RulesComponent } from './rules/rules.component';
import { DetailComponent } from './detail/detail.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    SalesCyclumRoutingModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  declarations: [SalesCyclumComponent, SimulationComponent, RulesComponent, DetailComponent]
})
export class SalesCyclumModule { }
