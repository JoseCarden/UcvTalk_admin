import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-estudiante-profes',
  templateUrl: './reporte-estudiante.page.html',
  styleUrls: ['./reporte-estudiante.page.scss'],
})
export class ReporteEstudiantePage implements OnInit {

  reportes: any[] = [];
  descripcionFiltro: string = '';
  asuntoFiltro: string = '';

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadReportes();
  }

  goBack() {
    this.navCtrl.back();
  }

  loadReportes() {
    this.http.get('http://localhost:3000/repor-estudiante').subscribe((data: any) => {
      this.reportes = data;
    }, error => {
      console.error('Error loading reportes', error);
    });
  }

  filtrarReportes() {
    return this.reportes.filter(reporte => {
      const matchesDescripcion = reporte.Descripcion.toLowerCase().includes(this.descripcionFiltro.toLowerCase());
      if (this.asuntoFiltro === '') {
        return matchesDescripcion;
      } else {
        const matchesAsunto = reporte.Asunto.toLowerCase() === this.asuntoFiltro.toLowerCase();
        return matchesDescripcion && matchesAsunto;
      }
    });
  }

  imprimir() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Reporte de Estudiantes', 105, 20, { align: 'center' });

    // Table
    const data = this.filtrarReportes().map(reporte => [
      reporte.Id_Reporte,
      reporte.Descripcion,
      reporte.Asunto,
    ]);

    autoTable(doc, {
      head: [['ID', 'Descripción', 'Asunto']],
      body: data,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [255, 0, 0] },
      didDrawPage: function (data) {
        // Footer
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

    doc.save('ReporteEstudiantes.pdf');
  }
}
