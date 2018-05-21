import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, MissingTranslationHandler } from 'ng2-translate';


import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { TeamTunningRoutingModule } from './team-tunning-routing.module';
import { SimulationComponent } from './simulation/simulation.component';
import { OnlyNumberDirective } from './../../directives/only-number.directive';
import { LimitNumberDirective } from './../../directives/limit-number.directive';
import { ActionsModalComponent } from './actions-modal/actions-modal.component';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { GoalUpdateModalComponent } from './goal-update-modal/goal-update-modal.component';
import { LogModalComponent } from './log-modal/log-modal.component';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TeamTunningRoutingModule,
    ChartsModule,
    FormsModule,
    NgbModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),
    NgCircleProgressModule.forRoot(),
  ],
  declarations: [
    SimulationComponent, 
    OnlyNumberDirective, 
    LimitNumberDirective, 
    ActionsModalComponent, 
    ProfileModalComponent, 
    GoalUpdateModalComponent, 
    LogModalComponent
  ],
  entryComponents: [ActionsModalComponent, ProfileModalComponent, GoalUpdateModalComponent, LogModalComponent]
})
export class TeamTunningModule { }
