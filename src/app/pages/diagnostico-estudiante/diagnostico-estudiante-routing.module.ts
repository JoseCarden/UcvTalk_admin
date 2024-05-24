import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticoEstudiantePage } from './diagnostico-estudiante.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticoEstudiantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticoEstudiantePageRoutingModule {}
