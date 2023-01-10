import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as moment from 'moment';
import 'moment/locale/pt-br'  // without this line it didn't work
moment.locale('pt-br');
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
    public maisRecentesButtonColor = 'btn-primary';
    public maioresValoresButtonColor = 'btn-secondary';

    constructor(
        public service: DashboardService
    ) {

    }

    ngOnInit() {
        this.getInfo();
    }

    public getInfo() {
        this.service.dashboard().subscribe((response) => {
            this.dados = response;
            this.createChart(this.dados.gastosMensais);
            this.gastosMensal(moment().format('MM/YYYY'));
            console.log('iniciou', this.dados);
        });
    }

    
    public deletePopUp(id) {
        this.service.deleteAlert().then((result) => {
            if (result.isConfirmed) {
                this.deleteExtrato(id);
            }    
        });
    }
    
    public deleteExtrato(id) {
        this.service.deleteExtrato(id).subscribe((response) => {
            this.getInfo();
        });
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
                if (this.maioresValoresButtonColor == 'btn-primary') {
                    this.maioresValores();
                }
            };
        }, 500);

    }

    public gastosMensal(mes:string) {
        this.extratoMes = this.dados.data.filter((i) => moment(i.postDate).format('MM/YYYY') == mes).reverse();
        this.mesSelecionado = moment(mes.split('/')[0]).format('MMMM') + '/' + mes.split('/')[1];
    }

    public maioresValores() {
        this.extratoMes.sort((a, b) => b.value - a.value);
        this.maisRecentesButtonColor = 'btn-secondary';
        this.maioresValoresButtonColor = 'btn-primary';
    }
    
    public maisRecentes() {
        this.extratoMes.sort((a, b) => +new Date(b.postDate) - +new Date(a.postDate));
        this.maisRecentesButtonColor = 'btn-primary';
        this.maioresValoresButtonColor = 'btn-secondary';
    }

    public variacaoCor(numero) {
        if (numero > 0) {
            return {
               cor: 'text-danger',
               setinha: 'fa fa-arrow-up'
            }
        } 
        else if (numero < 0) {
            return {
                cor: 'text-success',
                setinha: 'fa fa-arrow-down'
             }
        }
        else {
            return {
                cor: '',
                setinha: 'fa fa-equals'
             }
        }
    }

}
