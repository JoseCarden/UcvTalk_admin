import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReporteEstudiantePage } from './reporte-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: ReporteEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteEstudiantePageRoutingModule {}
