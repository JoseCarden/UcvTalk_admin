import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-estudiante',
  templateUrl: './reporte-estudiante.page.html',
  styleUrls: ['./reporte-estudiante.page.scss'],
})
export class ReporteEstudiantePage implements OnInit {

  reportes: any[] = [];
  descripcionFiltro: string = '';
  asuntoFiltro: string = '';

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.cargarReportes();
  }

  regresar() {
    this.navCtrl.back();
  }

  cargarReportes() {
    this.http.get('http://localhost:3000/repor-estudiante').subscribe((datos: any) => {
      this.reportes = datos;
    }, error => {
      console.error('Error al cargar los reportes', error);
    });
  }

  filtrarReportes() {
    return this.reportes.filter(reporte => {
      const coincideDescripcion = reporte.Descripcion.toLowerCase().includes(this.descripcionFiltro.toLowerCase());
      if (this.asuntoFiltro === '') {
        return coincideDescripcion;
      } else {
        const coincideAsunto = reporte.Asunto.toLowerCase() === this.asuntoFiltro.toLowerCase();
        return coincideDescripcion && coincideAsunto;
      }
    });
  }

  imprimir() {
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text('Reporte de Estudiantes', 105, 20, { align: 'center' });

    // Tabla
    const datos = this.filtrarReportes().map(reporte => [
      reporte.Id_Reporte,
      reporte.Descripcion,
      reporte.Asunto,
    ]);

    autoTable(doc, {
      head: [['ID', 'Descripción', 'Asunto']],
      body: datos,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [255, 0, 0] },
      didDrawPage: function (data) {
        // Pie de página
        const fecha = new Date();
        const fechaStr = fecha.toLocaleDateString();
        const horaStr = fecha.toLocaleTimeString();
        const texto = `Fecha de descarga: ${fechaStr}  |  Hora de descarga: ${horaStr}`;
        const anchoTexto = doc.getStringUnitWidth(texto) * 18 / doc.internal.scaleFactor;
        const textoX = (doc.internal.pageSize.getWidth() - anchoTexto) / 2;
        doc.setFontSize(10);
        doc.text(texto, textoX, doc.internal.pageSize.getHeight() - 10);
      }
    });

    doc.save('ReporteEstudiantes.pdf');
  }
}
