import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {
  result: any;
  clientes: any = [];

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private spinner: NgxSpinnerService,
) { }

  ngOnInit(): void {
  }

  OnSumbit(form) {
    console.log(form.value);
    this.postCliente();
  }

  postCliente() {
    let cliente = {
      nome: this.clientes.nome,
      email: this.clientes.email,
      celular: this.clientes.celular,
      endereco: this.clientes.endereco,
      cidade: this.clientes.cidade,
      uf: this.clientes.uf,
      solicitante: this.clientes.solicitante
    }
    this.spinner.show();
    this.apiesterilavos.postCliente(cliente).then((response: any) => {
      console.log("funcionou pedido = ", response);
      this.result = response;
      this.spinner.hide();
      this.router.navigate(['/clientes']);

    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
        this.spinner.hide();
      });

  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }

}
