import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamTunningComponent } from './team-tunning.component';
import { SimulationComponent } from './simulation/simulation.component';

const routes: Routes = [
  {
    path: 'team-tunning',
    component: TeamTunningComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'detail',
      },

      {
        path: 'simulation',
        component: SimulationComponent,
        data: {
          title: 'Diantum | Team Tunning Simulation',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamTunningRoutingModule { }
