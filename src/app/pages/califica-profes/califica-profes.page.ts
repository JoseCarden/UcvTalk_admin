import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-califica-profes',
  templateUrl: './califica-profes.page.html',
  styleUrls: ['./califica-profes.page.scss'],
})
export class CalificaProfesPage implements OnInit {

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.obtenerDatosYCrearGraficoDeTarta();
  }

  obtenerDatosYCrearGraficoDeTarta() {
    this.http.get<any[]>('http://localhost:3000/calificar-profe').subscribe(datos => {
      const calificaciones = datos.map(item => item.Calificacion);
      const conteos = this.contarOcurrencias(calificaciones);
      this.crearGraficoDeTarta(conteos);
    });
  }

  contarOcurrencias(arr: any[]): { [key: string]: number } {
    return arr.reduce((acumulador, valor) => {
      acumulador[valor] = acumulador[valor] ? acumulador[valor] + 1 : 1;
      return acumulador;
    }, {});
  }

  crearGraficoDeTarta(conteos: { [key: string]: number }) {
    const etiquetas = Object.keys(conteos).map(key => `${key} (${conteos[key]})`);
    const datos = Object.values(conteos);
  
    const ctx = document.getElementById('graficoDeTarta') as HTMLCanvasElement;
    const miGraficoDeTarta = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: etiquetas,
        datasets: [{
          label: 'Calificaciones',
          data: datos,
          backgroundColor: [
            'red',
            'blue',
            'yellow',
            'green',
            'purple',
            'orange'
          ],
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const etiqueta = context.label || '';
                const valor = context.parsed || 0;
                return `${etiqueta}: ${valor}`;
              }
            }
          },
          legend: {
            labels: {
              color: 'black',
            }
          }
        }
      }
    });
  }

  imprimir() {
    const contenedorGrafico = document.getElementById('contenedorGraficoDeTarta');
    if (contenedorGrafico) {
      html2canvas(contenedorGrafico).then(canvas => {
        const datosImagen = canvas.toDataURL('image/png');
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('GRÁFICO DE CALIFICACIONES', 105, 20, { align: 'center' });

        const propiedadesImagen = doc.getImageProperties(datosImagen);
        const anchoPDF = doc.internal.pageSize.getWidth();
        const altoPDF = doc.internal.pageSize.getHeight();
        const altoImagen = (propiedadesImagen.height * anchoPDF) / propiedadesImagen.width;

        const posicionY = 33;

        doc.addImage(datosImagen, 'PNG', 10, posicionY, anchoPDF - 20, altoImagen);

        const fecha = new Date();
        const fechaStr = fecha.toLocaleDateString();
        const horaStr = fecha.toLocaleTimeString();
        const texto = `Fecha de descarga: ${fechaStr}  |  Hora de descarga: ${horaStr}`;
        const anchoTexto = doc.getStringUnitWidth(texto) * 18 / doc.internal.scaleFactor;
        const textoX = (anchoPDF - anchoTexto) / 2;
        doc.setFontSize(10);
        doc.text(texto, textoX, posicionY + altoImagen + 20);

        doc.save('grafico.pdf');
      });
    } else {
      console.error("El contenedor del gráfico no fue encontrado.");
    }
  }

  regresar() {
    this.navCtrl.back();
  }

}
