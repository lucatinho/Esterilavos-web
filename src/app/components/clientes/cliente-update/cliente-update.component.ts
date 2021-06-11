import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  id: number;
  result: any;
  clientes: any = [];

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private routeID: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getClienteId();
  }


  OnSumbit(form) {
    console.log(form.value);
    this.updateCliente();
  }


  getClienteId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getClienteUnico(this.id)
      .then((response) => {
        this.clientes = response;
        console.log("banco clientes:", this.clientes);
        this.spinner.hide();
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.clientes = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });

  }


  updateCliente() {
    let cliente = {
      idCliente: this.id,
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
      // this.apimercado.showMessage('Operação realizada com Sucesso !');
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
