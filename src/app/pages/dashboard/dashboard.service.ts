import { Injectable } from '@angular/core';
import { mock } from 'src/app/variables/mock';

@Injectable()
export class DashboardService {

    constructor() {
    }

    public dashboard() {
        let data = mock.data.filter((item) => item.title == "Compra no débito" || item.title == "Pagamento da fatura" || (item.title == "Transferência enviada" && !item.detail.toLowerCase().includes("joao pedro ricarte gomes")));
        let total = 0;
        let totalMes = 0;
        let gastosMensais = [];
        for (let item of data) {
            item.value = item.detail.split("R$")[1];
            if (item.title == "Pagamento da fatura") {
                item.detail = item.title + " " + item.value;
            } 
            else {
                item.detail = item.detail.split("R$")[0];
            }

            if (item.value.includes(".")) {
                item.value = +item.value.replace(".", "").replace(",",".");
            } 
            else {
                item.value = +item.value.replace(",", ".");
            }
            
            let monthItem = item.postDate.split("-");
            monthItem = monthItem[1]+"/"+monthItem[0];

            
            total += item.value;
            if (gastosMensais.some((item) => item.mes == monthItem)) {
                totalMes += item.value;
                gastosMensais[gastosMensais.length-1].totalMes = totalMes;
            }
            else {
                totalMes = item.value;
                gastosMensais.push({
                    mes: monthItem,
                    totalMes: totalMes
                });
            }
        }
        let gastosMensaisOrdemCrescente = [];
        for (let i = gastosMensais.length-1; i >= 0; i--) {
            gastosMensaisOrdemCrescente.push(gastosMensais[i]);
        }

        return {
            data: data,
            gastosMensais: gastosMensaisOrdemCrescente,
            cards: {
                totalGastos: total,
            }
        }
        
    }

}