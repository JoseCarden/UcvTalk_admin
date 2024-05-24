import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reporte-estudiante-profes',
  templateUrl: './reporte-estudiante.page.html',
  styleUrls: ['./reporte-estudiante.page.scss'],
})
export class ReporteEstudiantePage implements OnInit {

  constructor(private http: HttpClient) { }

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
    const labels = Object.keys(counts);
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
      }
    });
  }
}
