import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
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

}