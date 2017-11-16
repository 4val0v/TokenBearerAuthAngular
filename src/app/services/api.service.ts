import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {
    constructor(
        private http: Http
    ) { }

    private setHeaders(): Headers {
        let headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        let accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            console.log('Authorization setted');
            headersConfig['Authorization'] = `Bearer ${accessToken}`
        }

        return new Headers(headersConfig);
    }

    private formatErrors(error: any) {
        //return (Observable.throw(error.json().error || 'Server error'));
        return (Observable.throw(error));
    }

    get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
        console.log('api service get');
        console.log(environment.api_url  + path);
        console.log(this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
        .catch(this.formatErrors)
        .map((res: Response) => res.json()));
        return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(), search: params })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
            
    }

    put(path: string, body: Object = {}): Observable<any> {
        
        return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    delete(path): Observable<any> {
        return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() }
        )
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }

    post(path: string, body: Object = {}): Observable<any> {
        console.log('api');
        console.log(body);
        return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), { headers: this.setHeaders() })
            .catch(this.formatErrors)
            .map((res: Response) => res.json());
    }
}