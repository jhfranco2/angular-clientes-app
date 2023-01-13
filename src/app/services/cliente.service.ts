import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { catchError, Observable, of, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = "http://localhost:8080/api/clientes";

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  getClientes() {
    return this.http.get(this.url).pipe(
      map(response => response as Cliente[])
    );
  }

  create(cliente: Cliente) {
    return this.http.post(this.url, cliente, { headers: this.httpHeaders }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError((e) => {
        if (e == 400) {
          return throwError(() => new Error(e));
        }
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error');
        return throwError(() => new Error(e));
      }
      )
    );
  }

  getCliente(id?: number) {
    return this.http.get(`${this.url}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(
          'Error al editar',
          e.error.mensaje,
          'error');
        return throwError(() => new Error(e));
      }
      )
    );
  }

  update(cliente: Cliente) {
    return this.http.put(`${this.url}/${cliente.id}`, cliente, { headers: this.httpHeaders }).pipe(
      catchError((e) => {
        if (e == 400) {
          return throwError(() => new Error(e));
        }
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error');
        return throwError(() => new Error(e));
      }
      )
    );
  }

  delete(id?: number) {
    return this.http.delete(`${this.url}/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(
          e.error.mensaje,
          e.error.error,
          'error');
        return throwError(() => new Error(e));
      }
      )
    );
  }
}

