import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = "http://localhost:8080/api/clientes";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) {
    return this.http.post(this.url, cliente, { headers: this.httpHeaders });
  }

  getCliente(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  update(cliente: Cliente) {
    return this.http.put(`${this.url}/${cliente.id}`, cliente, { headers: this.httpHeaders });
  }

  delete(id?:number ){
    return this.http.delete(`${this.url}/${id}`, {headers: this.httpHeaders})
  }
}

