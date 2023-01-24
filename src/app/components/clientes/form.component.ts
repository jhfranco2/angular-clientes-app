import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  titulo: string = 'Crear Cliente';
  cliente: Cliente = new Cliente();

  errores?: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }
  cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          {
            next: (cliente:any) => this.cliente = cliente
          }
        );
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      {
        next: ((cliente) => {
          this.router.navigate(['/clientes']);
          swal.fire(
            'Nuevo Cliente',
            `El cliente ${cliente.nombre} ha sido creado con exito`,
            'success')
        }
        ),
        error: (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código de error desde el backend ' + err?.status);
          console.log(err.error.errors);
        }
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      {
        next: (json: any) => {
          this.router.navigate(['/clientes']);
          swal.fire(
            'Cliente Actualizado',
            `${json.mensaje}: ${json.cliente.nombre}`,
            'success'
          );
        }, error:
          (err) => {
            this.errores = err.error.errors as string[];
            console.error('Código de error desde el backend' + err.status);
            console.error(err.error.errors);
          }
      }
    );
  }
}
