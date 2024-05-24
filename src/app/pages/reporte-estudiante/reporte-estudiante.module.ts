import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReporteEstudiantePageRoutingModule } from './reporte-estudiante-routing.module';

import { ReporteEstudiantePage } from './reporte-estudiante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReporteEstudiantePageRoutingModule
  ],
  declarations: [ReporteEstudiantePage]
})
export class ReporteEstudiantePageModule {}
