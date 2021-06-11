import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-fourcamps',
  templateUrl: './fourcamps.component.html',
  styleUrls: ['./fourcamps.component.css']
})
export class FourcampsComponent implements OnInit {
  typesOfShoes: string[] = ['Gerar nova ordem de Serviço', 'Ordem de Serviço Pendente', 'Ordem de Serviço Executadas', 'Dados do equipamento'];
  setores: any = [];
  dados: any = {
    cliente: null,
    equipamento: null,
    setor: null
  }


  role: string = "";
  id:any;
  equipamento:any ={}

  constructor(
    private router: Router,
    private variables: VariablesService,
    private apiesterilavos: ApiEsterilavosService,
    private routeID: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.role = this.variables.getSessao().role
    this.role_tecnico();
  }

  role_tecnico() {
    if (this.variables.getEquipamentoNome() != undefined) {
      this.dados ={
        cliente: this.variables.getClienteNome(),
        equipamento: this.variables.getEquipamentoNome(),
        setor: this.variables.getSetor()
      }
    }else{
      this.getEquipamentoId();
    }
  }



  getEquipamentoId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getEquipamentoUnico(this.id)
      .then((response) => {
        this.equipamento = response;

        this.variables.postCliente(this.equipamento.cliente.idCliente);
        this.variables.postClienteNome(this.equipamento.cliente.nome);
        this.variables.postEquipamento(this.equipamento.idEquipamento);
        this.variables.postEquipamentoNome(this.equipamento.modelo);
        this.variables.postSetor(this.equipamento.setor.nome);
        this.variables.postEquipamentoAutoclave(this.equipamento.autoclave);

        this.dados ={
          cliente: this.variables.getClienteNome(),
          equipamento: this.variables.getEquipamentoNome(),
          setor: this.variables.getSetor()
        }


        this.spinner.hide();
        console.log("banco equipmento unico:", this.equipamento);
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.equipamento = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

  selecionado(id) {
    // console.log(id)

    switch (id) {
      case 'Gerar nova ordem de Serviço': {
        this.router.navigate(['/os/create']);
        break;
      }
      case 'Ordem de Serviço Pendente': {
        this.router.navigate(['/os-pendente']);
        break;
      }
      case 'Ordem de Serviço Executadas': {
        this.router.navigate(['/os-executada']);
        break;
      }
      default: {
        this.router.navigate(['equipamento/readunico/' + this.variables.getEquipamento()]);
        break;
      }
    }

  }

  cancel(): void {
    this.router.navigate(['/equipamentos']);
  }
}
