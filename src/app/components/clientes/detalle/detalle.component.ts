import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  titulo: string = 'Detalle del cliente';
  cliente: Cliente;

  fotoSeleccionada: File;

  constructor(
    private clienteService: ClienteService,
    private activateRoute: ActivatedRoute,
    ) {

  }
  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(
      (params: any) => {
        let id: number = +params.get('id');
        if (id) {
          this.clienteService.getCliente(id).subscribe(
            (cliente:any) => {
              this.cliente = cliente;
            }
          );
        }
      }
    );
  }

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
      .subscribe(cliente => {
        this.cliente = cliente;
        Swal.fire('La foto se ha subido completamente!', `La foto se ha súbido con éxito: ${this.cliente.foto}`, 'success');
      });
  }
}
