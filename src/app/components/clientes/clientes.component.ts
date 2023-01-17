import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes?: Cliente[];
  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let page = 0;
    this.clienteService.getClientes(page).pipe(
      tap(response => {
        console.log('ClienteService: 3');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        })
      })
    ).subscribe(
      (response => {
        this.clientes = response.content as Cliente[]; 
      }))
  }

  delete(cliente: Cliente): void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: `¿Seguro que quieres eliminar a el cliente ${cliente.nombre} ${cliente.apellido}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          {
            complete: () => {
              this.clientes = this.clientes?.filter(cli => cli !== cliente)
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `Cliente ${cliente.nombre} eliminado con exito.`,
                'success'
              );
            }

          }
        );

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'Tu Cliente esta a salvo :)',
          'error'
        )
      }
    })
  }
}
