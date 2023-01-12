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
            next: (cliente) => this.cliente = cliente
          }
        );
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe(
      {
        complete: () => {
          this.router.navigate(['/clientes']);
          swal.fire(
            'Nuevo Cliente',
            `Cliente ${this.cliente.nombre} creado con exito.`,
            'success')
        },
        error: (e) => swal.fire(
          'Nuevo Cliente',
          `Cliente ${this.cliente.nombre} no se creado con exito.`,
          'error')

      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      {
        complete: () => {
          this.router.navigate(['/clientes']);
          swal.fire(
            'Cliente Actualizado',
            `Cliente ${this.cliente.nombre} actualizado con éxito`,
            'success'
          );
        }
      }
    );
  }
}
