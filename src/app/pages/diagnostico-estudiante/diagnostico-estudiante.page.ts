import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-diagnostico-estudiante',
  templateUrl: './diagnostico-estudiante.page.html',
  styleUrls: ['./diagnostico-estudiante.page.scss'],
})
export class DiagnosticoEstudiantePage implements OnInit {

  diagnosticos: any[] = [];
  usuarioFiltro: string = '';
  diagnosticoFiltro: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.loadDiagnosticos();
  }

  goBack() {
    this.navCtrl.back();
  }

  loadDiagnosticos() {
    this.http.get('http://localhost:3000/diagnostico').subscribe((data: any) => {
      this.diagnosticos = data;
    }, error => {
      console.error('Error loading diagnosticos', error);
    });
  }

  filtrarDiagnosticos() {
    return this.diagnosticos.filter(diagnostico => {
      const matchesUsuario = diagnostico.Est_Usuario.toLowerCase().includes(this.usuarioFiltro.toLowerCase());
      if (this.diagnosticoFiltro === '') {
        return matchesUsuario;
      } else {
        const matchesDiagnostico = diagnostico.Diagnostico.toLowerCase() === this.diagnosticoFiltro.toLowerCase();
        return matchesUsuario && matchesDiagnostico;
      }
    });
  }

  imprimir() {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Diagnostico de Estudiantes', 105, 20, { align: 'center' });

    // Table
    const data = this.filtrarDiagnosticos().map(diagnostico => [
      diagnostico.Id_EstudianteRegis,
      diagnostico.Est_Usuario,
      diagnostico.Diagnostico,
    ]);

    autoTable(doc, {
      head: [['ID', 'E.U', 'Diagnóstico']],
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

    doc.save('DiagnosticoEstudiantes.pdf');
  }
}
