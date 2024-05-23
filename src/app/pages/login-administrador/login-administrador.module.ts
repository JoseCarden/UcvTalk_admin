import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginAdministradorPageRoutingModule } from './login-administrador-routing.module';

import { LoginAdministradorPage } from './login-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginAdministradorPageRoutingModule
  ],
  declarations: [LoginAdministradorPage]
})
export class LoginAdministradorPageModule {}
