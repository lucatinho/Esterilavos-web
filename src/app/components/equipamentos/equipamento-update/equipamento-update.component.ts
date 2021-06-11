import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-equipamento-update',
  templateUrl: './equipamento-update.component.html',
  styleUrls: ['./equipamento-update.component.css']
})
export class EquipamentoUpdateComponent implements OnInit {
  id: number;
  result: any;
  equipamento:any={};
  // autoclave:any;

  dados:any={
    cliente: this.variables.getClienteNome(),
    equipamento: this.variables.getEquipamentoNome(),
    setor: this.variables.getSetor()
  }

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private routeID: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private variables: VariablesService,
  ) { }

  ngOnInit(): void {
    this.getEquipamentoId();
  }


  getEquipamentoId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getEquipamentoUnico(this.id)
      .then((response) => {
        this.equipamento = response;
        // this.autoclave = this.equipamento.autoclave.nome
        console.log("banco equipmento unico:", this.equipamento);
        this.spinner.hide();
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.equipamento = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

  OnSumbit(form) {
    console.log(form.value);
    this.updateEquipamento();
  }


  updateEquipamento() {
    let equipamento = {
      idEquipamento: this.equipamento.idEquipamento,
      numero_serie: this.equipamento.numero_serie,
      ano_fabrica: this.equipamento.ano_fabrica,
      numero_patrimonio: this.equipamento.numero_patrimonio,
      modelo: this.equipamento.modelo,
      fabricante: this.equipamento.fabricante,
      tensao_alimentacao: this.equipamento.tensao_alimentacao,
      img: this.equipamento.img,
      desativado: false,
      autoclave: {
        id: this.equipamento.autoclave.id
      },
      setor: {
        id: this.equipamento.setor.id
      },
      cliente: {
        idCliente: this.equipamento.cliente.idCliente
      }

    }

    console.log(equipamento)
    this.spinner.show();
    this.apiesterilavos.postEquipamentos(equipamento).then((response: any) => {
      console.log("funcionou pedido = ", response);
      this.result = response;
      this.spinner.hide();
      this.router.navigate(['/equipamentos']);

    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
        this.spinner.hide();
      });

  }



  cancel(): void {
    this.router.navigate(['/equipamentos']);
  }


}
