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
  estudiantes: any[] = [];
  categorias: any[] = [];
  filtroUsuario: string = '';
  filtroDiagnostico: string = '';

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.cargarDiagnosticos();
    this.cargarEstudiantes();
    this.cargarCategorias(); // Cargar categorías al inicializar el componente
    this.filtroDiagnostico = ''; // Establecer el filtro inicialmente a 'Ninguno'
  }

  regresar() {
    this.navCtrl.back();
  }

  cargarDiagnosticos() {
    this.http.get('http://localhost:3000/diagnostico').subscribe((data: any) => {
      this.diagnosticos = data;
    }, error => {
      console.error('Error cargando diagnósticos', error);
    });
  }

  cargarEstudiantes() {
    this.http.get('http://localhost:3000/estudiante').subscribe((data: any) => {
      this.estudiantes = data;
    }, error => {
      console.error('Error cargando estudiantes', error);
    });
  }

  cargarCategorias() {
    this.http.get('http://localhost:3000/categoria').subscribe((data: any) => {
      this.categorias = data;
    }, error => {
      console.error('Error cargando categorías', error);
    });
  }

  filtrarDiagnosticos() {
    return this.diagnosticos.filter(diagnostico => {
      const estudiante = this.estudiantes.find(est => est.Id_EstudianteRegis === diagnostico.Id_EstudianteRegis);
      const coincideUsuario = estudiante ? estudiante.idUcv_estu.toLowerCase().includes(this.filtroUsuario.toLowerCase()) : false;
      const categoria = this.categorias.find(cat => cat.Nombre_Cat === this.filtroDiagnostico); // Buscar la categoría seleccionada
      const idCategoria = categoria ? categoria.Id_Categoria : null; // Obtener el Id_Categoria si se encontró la categoría
  
      if (!idCategoria) {
        return coincideUsuario;
      } else {
        return coincideUsuario && diagnostico.Id_Categoria === idCategoria;
      }
    });
  }

  combinarDatos() {
    return this.filtrarDiagnosticos().map(diagnostico => {
      const estudiante = this.estudiantes.find(est => est.Id_EstudianteRegis === diagnostico.Id_EstudianteRegis);
      const categoria = this.categorias.find(cat => cat.Id_Categoria === diagnostico.Id_Categoria);
      return {
        ...diagnostico,
        idUcv_estu: estudiante ? estudiante.idUcv_estu : '',
        Id_Categoria: categoria ? categoria.Nombre_Cat : ''
      };
    });
  }

  imprimir() {
    const doc = new jsPDF();
  
    // Título
    doc.setFontSize(18);
    doc.text('Diagnóstico de Estudiantes', 105, 20, { align: 'center' });
  
    // Tabla
    const datos = this.combinarDatos().map(diagnostico => [
      diagnostico.idUcv_estu,
      diagnostico.Est_Usuario,
      diagnostico.Id_Categoria,
      diagnostico.Diagnostico
    ]);
  
    autoTable(doc, {
      head: [['ID E.', 'Estado Usuario', 'Categoría', 'Diagnóstico']],
      body: datos,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [255, 0, 0] },
      didDrawPage: function (data) {
        // Pie de página
        const date = new Date();
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        const texto = `Fecha de descarga: ${dateStr}  |  Hora de descarga: ${timeStr}`;
        const textWidth = doc.getStringUnitWidth(texto) * 18 / doc.internal.scaleFactor;
        const textX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
        doc.setFontSize(10);
        doc.text(texto, textX, doc.internal.pageSize.getHeight() - 10);
      }
    });
  
    doc.save('DiagnosticoEstudiantes.pdf');
  }
}
