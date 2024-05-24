import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticoEstudiantePageRoutingModule } from './diagnostico-estudiante-routing.module';

import { DiagnosticoEstudiantePage } from './diagnostico-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagnosticoEstudiantePageRoutingModule
  ],
  declarations: [DiagnosticoEstudiantePage]
})
export class DiagnosticoEstudiantePageModule {}
