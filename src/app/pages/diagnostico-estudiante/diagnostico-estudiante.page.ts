import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { NavController } from '@ionic/angular';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-diagnostico-estudiante',
  templateUrl: './diagnostico-estudiante.page.html',
  styleUrls: ['./diagnostico-estudiante.page.scss'],
})
export class DiagnosticoEstudiantePage implements OnInit {

  constructor(private navCtrl: NavController, private http: HttpClient) { }

  ngOnInit() {
    this.getDataAndCreateBarChart();
  }

  getDataAndCreateBarChart() {
    this.http.get<any[]>('http://localhost:3000/diagnostico').subscribe(data => {
      const diagnosticos = data.map(item => item.Diagnostico);
      const counts = this.countOccurrences(diagnosticos);
      const labels = Object.keys(counts);
      const values = Object.values(counts);
      this.createBarChart(labels, values, data.length); // Pasar la cantidad de datos obtenidos
    });
  }

  countOccurrences(arr: any[]): { [key: string]: number } {
    return arr.reduce((acc, val) => {
      acc[val] = acc[val] ? acc[val] + 1 : 1;
      return acc;
    }, {});
  }

  createBarChart(labels: string[], data: number[], dataLength: number) {
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    const backgroundColors = data.map(() => getRandomColor());

    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const value = tooltipItem.formattedValue;
                return `${value}`;
              }
            }
          }
        }
      }
    });

    const chartContainer = document.getElementById('myBarChartContainer');
    if (chartContainer) {
      const legend = document.createElement('div');
      legend.style.marginTop = '10px';
      legend.style.textAlign = 'center';
      labels.forEach((label, index) => {
        const legendItem = document.createElement('span');
        legendItem.style.display = 'inline-block';
        legendItem.style.marginRight = '10px';
        legendItem.innerHTML = `
          <div>
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${backgroundColors[index]};"></span>
            <span style="font-size: 12px; margin-left: 5px;">${label}</span>
          </div>
        `;
        legend.appendChild(legendItem);
      });
      chartContainer.insertBefore(legend, chartContainer.firstChild);
    } else {
      console.error("El contenedor del gráfico no fue encontrado.");
    }
  }

  goToOptions() {
    this.navCtrl.navigateForward('/options');
  }

  goBack() {
    this.navCtrl.back();
  }

  imprimir() {
    const chartContainer = document.getElementById('myBarChartContainer');
    if (chartContainer) {
      html2canvas(chartContainer).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();

        // Agregar título
        doc.setFontSize(18);
        doc.text('REGISTRO PROFESIONALES', 105, 20, { align: 'center' });

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
}
