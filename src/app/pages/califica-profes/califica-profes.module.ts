import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalificaProfesPageRoutingModule } from './califica-profes-routing.module';

import { CalificaProfesPage } from './califica-profes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalificaProfesPageRoutingModule
  ],
  declarations: [CalificaProfesPage]
})
export class CalificaProfesPageModule {}
