import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesRegisterPageRoutingModule } from './profes-register-routing.module';

import { ProfesRegisterPage } from './profes-register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesRegisterPageRoutingModule
  ],
  declarations: [ProfesRegisterPage]
})
export class ProfesRegisterPageModule {}
