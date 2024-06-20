import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NavController } from '@ionic/angular'; // Importa NavController

@Component({
  selector: 'app-califica-profes',
  templateUrl: './califica-profes.page.html',
  styleUrls: ['./califica-profes.page.scss'],
})
export class CalificaProfesPage implements OnInit {

  constructor(private http: HttpClient, private navCtrl: NavController) { } // Agrega NavController a la lista de parámetros

  ngOnInit() {
    this.getDataAndCreatePieChart();
  }

  getDataAndCreatePieChart() {
    this.http.get<any[]>('http://localhost:3000/calificar-profe').subscribe(data => {
      const calificaciones = data.map(item => item.Calificacion);
      const counts = this.countOccurrences(calificaciones);
      this.createPieChart(counts);
    });
  }

  countOccurrences(arr: any[]): { [key: string]: number } {
    return arr.reduce((acc, val) => {
      acc[val] = acc[val] ? acc[val] + 1 : 1;
      return acc;
    }, {});
  }

  createPieChart(counts: { [key: string]: number }) {
    const labels = Object.keys(counts).map(key => `${key} (${counts[key]})`); // Modificar las etiquetas para incluir las cantidades
    const data = Object.values(counts);
  
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Calificaciones',
          data: data,
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
              label: (context) => { // Mostrar la cantidad en la etiqueta del gráfico
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value}`;
              }
            }
          },
          legend: { // Configuración para el estilo del texto de la leyenda
            labels: {
              color: 'black', // Cambiar el color del texto a negro
              
            }
          }
        }
      }
    });
  }
  
  
  

  imprimir() {
    const chartContainer = document.getElementById('myPieChartContainer');
    if (chartContainer) {
      html2canvas(chartContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();

        // Agregar título
        doc.setFontSize(18);
        doc.text('GRAFICO DE CALIFICACIONES', 105, 20, { align: 'center' });

        // Calcular posición del gráfico para centrarlo verticalmente
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Ajustar la posición vertical del gráfico
        const positionY = 33; // Puedes ajustar este valor para mover el gráfico más cerca o más lejos del texto

        // Agregar gráfico debajo del título
        doc.addImage(imgData, 'PNG', 10, positionY, pdfWidth - 20, imgHeight);

        // Agregar fecha y hora de descarga en la misma línea
        const date = new Date();
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        const text = `Fecha de descarga: ${dateStr}  |  Hora de descarga: ${timeStr}`;
        const textWidth = doc.getStringUnitWidth(text) * 18 / doc.internal.scaleFactor; // Estimación del ancho del texto
        const textX = (pdfWidth - textWidth) / 2; // Centrar el texto horizontalmente
        doc.setFontSize(10);
        doc.text(text, textX, positionY + imgHeight + 20); // Ajustar la posición vertical según sea necesario

        doc.save('grafico.pdf');
      });
    } else {
      console.error("El contenedor del gráfico no fue encontrado.");
    }
  }

  goBack() {
    this.navCtrl.back(); // Implementación de la función goBack para volver atrás
  }

}