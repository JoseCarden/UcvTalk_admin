import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reporte-estudiante-profes',
  templateUrl: './reporte-estudiante.page.html',
  styleUrls: ['./reporte-estudiante.page.scss'],
})
export class ReporteEstudiantePage implements OnInit {

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    this.getDataAndCreatePieChart();
  }

  getDataAndCreatePieChart() {
    this.http.get<any[]>('http://localhost:3000/repor-estudiante').subscribe(data => {
      const asuntos = data.map(item => item.Asunto);
      const counts = this.countOccurrences(asuntos);
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
    const labels = Object.keys(counts).map(key => `${key} (${counts[key]})`);
    const data = Object.values(counts);
    const ctx = document.getElementById('myPieChart') as HTMLCanvasElement;
    const myPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          label: 'Asuntos',
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
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value}`;
              }
            }
          },
          legend: { 
            labels: {
              color: 'white',
            }
          }
        }
      }
    });
  }

  imprimir() {
    const chartContainer = document.getElementById('myPieChart');
    if (chartContainer) {
      html2canvas(chartContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('GRAFICO DE ASUNTOS', 105, 20, { align: 'center' });
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
        const positionY = 33;
        doc.addImage(imgData, 'PNG', 10, positionY, pdfWidth - 20, imgHeight);
        const date = new Date();
        const dateStr = date.toLocaleDateString();
        const timeStr = date.toLocaleTimeString();
        const text = `Fecha de descarga: ${dateStr}  |  Hora de descarga: ${timeStr}`;
        const textWidth = doc.getStringUnitWidth(text) * 18 / doc.internal.scaleFactor;
        const textX = (pdfWidth - textWidth) / 2;
        doc.setFontSize(10);
        doc.text(text, textX, positionY + imgHeight + 20);
        const pdfBlob = doc.output('blob');

        window.open(URL.createObjectURL(pdfBlob));
      });
    } else {
      console.error("El contenedor del gráfico no fue encontrado.");
    }
  }

  goBack() {
    this.navCtrl.back();
  }

}
