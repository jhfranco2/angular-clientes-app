import { Injectable } from '@angular/core';
import { CLIENTES } from '../components/clientes/clientes.json';
import { Cliente } from '../models/cliente';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = "http://localhost:8080/api/clientes";
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get(this.url).pipe(
      map(response => response as Cliente[])
    );
  }
}
