import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogupAdministradorPageRoutingModule } from './logup-administrador-routing.module';

import { LogupAdministradorPage } from './logup-administrador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LogupAdministradorPageRoutingModule
  ],
  declarations: [LogupAdministradorPage]
})
export class LogupAdministradorPageModule {}
