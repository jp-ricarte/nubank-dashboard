import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartDashboard
} from "../../variables/charts";
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(
    public service: DashboardService
  ) {
    
  }

  ngOnInit() {
    let result = this.service.dashboard();
    this.createChart(result.gastosMensais);
  }


  public createChart(dados) {
        let ordersTimer = setTimeout(() => {
            let chartOrders: any = document.getElementById('chart-orders');
            if (chartOrders) {
                clearInterval(ordersTimer);
                new Chart(chartOrders, {
                    type: 'bar',
                    data: {
                        labels: dados.map((d) => d.mes),
                        datasets: [
                            {
                                data: dados.map((d) => d.totalMes),
                                backgroundColor: '#530082',
                                label: 'Valor Total',
                            }
                        ]
                    },
                    options: chartDashboard.options,
                });
            }
        }, 500);
    }

}
