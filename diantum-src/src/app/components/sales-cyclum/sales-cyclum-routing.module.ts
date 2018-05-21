import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalesCyclumComponent } from 'app/components/sales-cyclum/sales-cyclum.component';
import { SimulationComponent } from 'app/components/sales-cyclum/simulation/simulation.component';
import { RulesComponent } from 'app/components/sales-cyclum/rules/rules.component';
import { DetailComponent } from 'app/components/sales-cyclum/detail/detail.component';

const routes: Routes = [
  {
    path: 'sales-cyclum',
    component: SalesCyclumComponent,
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
          title: 'Diantum | Sales Cyclum Detalles',
        }
      },
      {
        path: 'simulation',
        component: SimulationComponent,
        data: {
          title: 'Diantum | Sales Cyclum Simulation',
        }
      },
      {
        path: 'rules',
        component: RulesComponent,
        data: {
          title: 'Diantum | Sales Cyclum Rules',

      }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesCyclumRoutingModule { }
