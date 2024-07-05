import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-profes-register',
  templateUrl: './profes-register.page.html',
  styleUrls: ['./profes-register.page.scss'],
})
export class ProfesRegisterPage implements OnInit {

  profesionales: any[] = [];
  nombreFiltro: string = '';
  especialidadFiltro: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.loadProfesionales();
  }

  goBack() {
    this.navCtrl.back();
  }

  loadProfesionales() {
    this.http.get('http://localhost:3000/profesional').subscribe((data: any) => {
      this.profesionales = data;
    }, error => {
      console.error('Error loading profesionales', error);
    });
  }

  filtrarProfesionales() {
    return this.profesionales.filter(profesional => {
      const matchesNombre = profesional.Nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase());
      if (this.especialidadFiltro === '') {
        return matchesNombre;
      } else {
        const matchesEspecialidad = profesional.Especialidad.toLowerCase() === this.especialidadFiltro.toLowerCase();
        return matchesNombre && matchesEspecialidad;
      }
    });
  }

  imprimir() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Registro de Profesionales', 105, 20, { align: 'center' });
    const data = this.filtrarProfesionales().map(profesional => [
      profesional.Id_ProfesRegis,
      profesional.Nombre,
      profesional.Apellido,
      profesional.Especialidad,
    ]);

    autoTable(doc, {
      head: [['ID', 'Nombre', 'Apellido', 'Especialidad']],
      body: data,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [255, 0, 0] },
      didDrawPage: function (data) {
        const date = new Date();
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        const text = `Fecha de descarga: ${dateStr}  |  Hora de descarga: ${timeStr}`;
        const textWidth = doc.getStringUnitWidth(text) * 18 / doc.internal.scaleFactor;
        const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
        doc.setFontSize(10);
        doc.text(text, textX, doc.internal.pageSize.getHeight() - 10);
      }
    });

    doc.save('RegistroProfesionales.pdf');
  }
}
