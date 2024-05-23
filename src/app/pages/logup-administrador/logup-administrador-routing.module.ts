import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogupAdministradorPage } from './logup-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: LogupAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogupAdministradorPageRoutingModule {}
