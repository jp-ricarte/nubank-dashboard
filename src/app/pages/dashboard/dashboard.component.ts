import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as moment from 'moment';

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
    public chart;
    public dados;
    public extratoMes;
    public mesSelecionado;

    constructor(
        public service: DashboardService
    ) {

    }

    ngOnInit() {
        console.log('iniciou');
        this.dados = this.service.dashboard()
        this.createChart(this.dados.gastosMensais);
        this.gastosMensal(moment().format('MM/YYYY'));
    }

    public async createChart(dados) {
        let ordersTimer = setTimeout(() => {
            let chartOrders: any = document.getElementById('chart-orders');
            if (chartOrders) {
                clearInterval(ordersTimer);
                this.chart = new Chart(chartOrders, {
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
                    options: chartDashboard.options
                });
            }
            document.getElementById("chart-orders").onclick = (evt) => {
                let activePoint = this.chart.getElementAtEvent(evt);
                let firstPoint = activePoint[0];
                let mes = this.chart.data.labels[firstPoint._index];
                this.gastosMensal(mes);
            };
        }, 500);

    }

    public gastosMensal(mes:string) {
        this.extratoMes = this.dados.data.filter((i) => moment(i.postDate).format('MM/YYYY') == mes);
        this.mesSelecionado = mes;
    }

}
