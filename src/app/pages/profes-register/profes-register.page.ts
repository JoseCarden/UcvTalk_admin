import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-profes-register',
  templateUrl: './profes-register.page.html',
  styleUrls: ['./profes-register.page.scss'],
})
export class ProfesRegisterPage implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getDataAndCreateBarChart();
  }

  getDataAndCreateBarChart() {
    this.http.get<any[]>('http://localhost:3000/profesional').subscribe(data => {
      const especialidades = data.map(item => item.Especialidad);
      const counts = this.countOccurrences(especialidades);
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
    // Función para generar un color aleatorio
    const getRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    // Generar colores aleatorios para las barras
    const backgroundColors = data.map(() => getRandomColor());

    const ctx = document.getElementById('myBarChart') as HTMLCanvasElement;
    const myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          // label: 'Especialidades',
          data: data,
          backgroundColor: backgroundColors,
          hoverBackgroundColor: backgroundColors // Asignar el mismo color para evitar cambio en hover
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
            display: false // Aquí se oculta la leyenda
          }
        }
      }
    });

    // Agregar leyendas dinámicamente en línea
    const chartContainer = document.getElementById('myBarChartContainer');
    if (chartContainer) {
      const legend = document.createElement('div');
      legend.style.marginTop = '10px'; // Espaciado entre las leyendas y el gráfico
      legend.style.textAlign = 'center'; // Alinear al centro
      labels.forEach((label, index) => {
        const legendItem = document.createElement('span');
        legendItem.style.display = 'inline-block'; // Mostrar en línea
        legendItem.style.marginRight = '10px'; // Espacio entre leyendas
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
}
