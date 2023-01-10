import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
@Injectable()
export class DashboardService {

    public headers = {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    }

    constructor(
        private http: HttpClient
    ) {
    }

    public dashboard() {
        return this.http.get(environment.apiUrl + '/api/dashboard/get-extratos', this.headers);
    }

    public deleteExtrato(id) {
        return this.http.delete(environment.apiUrl + `/api/dashboard/delete-extrato/${id}` , this.headers);
    }

    public deleteAlert() {
        return Swal.fire({
            title: 'Deletar item?',
            text: "Não será possível reverter esta ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Sim, deletar!'
          });
    }

}