import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';

import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

import { CandiesGameRoutingModule } from './candies-game-routing.module';
import { CandiesGameComponent } from 'app/components/candies-game/candies-game.component';
import { SimulationComponent } from './simulation/simulation.component';
import { RulesComponent } from './rules/rules.component';
import { Http } from '@angular/http';
import { DetailComponent } from './detail/detail.component';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    CandiesGameRoutingModule,
    ChartsModule,
    FormsModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
  ],
  declarations: [CandiesGameComponent, SimulationComponent, RulesComponent, DetailComponent]
})
export class CandiesGameModule { }
