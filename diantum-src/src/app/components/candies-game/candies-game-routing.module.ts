import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandiesGameComponent } from 'app/components/candies-game/candies-game.component';
import { SimulationComponent } from 'app/components/candies-game/simulation/simulation.component';
import { RulesComponent } from 'app/components/candies-game/rules/rules.component';
import { DetailComponent } from 'app/components/candies-game/detail/detail.component';


const routes: Routes = [
  {
    path: 'candies-game',
    component: CandiesGameComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'detail',
      },
      {
        path: 'detail',
        component: DetailComponent,
        data: {
          title: 'Diantum | Detalles'
        }
      },
      {
        path: 'simulation',
        component: SimulationComponent,
        data: {
          title: 'Diantum | Candies Simulation',
        }
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: {
          title: 'Diantum | Candies Rules',

      }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandiesGameRoutingModule { }
