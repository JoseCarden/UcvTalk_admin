import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAdministradorPage } from './login-administrador.page';

const routes: Routes = [
  {
    path: '',
    component: LoginAdministradorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAdministradorPageRoutingModule {}
