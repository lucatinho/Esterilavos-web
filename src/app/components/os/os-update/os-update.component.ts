import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-os-update',
  templateUrl: './os-update.component.html',
  styleUrls: ['./os-update.component.css']
})
export class OsUpdateComponent implements OnInit {
  id: number;
  result: any;
  os: any = [];

  range = new FormGroup({
    start: new FormControl(this.os.datainicial),
    end: new FormControl(this.os.datafinal)
  });



  list: any = {
    equipamento: this.variables.getEquipamento(),
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor(),
    autoclave: this.variables.getEquipamentoAutoclave()
  }
  task = {
    name: 'Indeterminate',
    completed: true,
    color: 'primary',
  }

  checked = {
    autoclave: {
      id: this.variables.getEquipamentoAutoclave().id
    },
    c1: true,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
    c7: false,
    c8: false,
    c9: false,
    c10: false,
    c11: false,
    c12: false,
    c13: false,
    c14: false,
    c15: false,
    c16: false,
    c17: false,
    c18: false,
    c19: false,
    c20: false,
    c21: false,
    c22: false,
    c23: false
  };

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private routeID: ActivatedRoute,
    private variables: VariablesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getOsId();
  }

  viewcheck() {
    console.log("check:", this.checked);
  }


  getOsId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getOsUnico(this.id)
      .then((response) => {
        this.os = response;
        this.checked = this.os.check

        this.range = new FormGroup({
          start: new FormControl(this.os.datainicial),
          end: new FormControl(this.os.datafinal)
        });

        this.spinner.hide();
        console.log("banco os:", this.os);
        console.log("banco checked:", this.checked);
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.os = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });

  }
  postCheckbox() {
    console.log(this.checked)
  }

  OnSumbit(form) {
    console.log(form.value);
    if (this.os.tipo == "Corretiva") {
      this.updateOS();
    } else if (this.os.tipo == "Preventiva") {
      this.os.motivo = null
      this.updateCheck();
    }

  }
  updateCheck() {
    // primeiro salva check list
    console.log(this.checked)
    this.spinner.show();
    this.apiesterilavos.postCheck(this.checked).then((response: any) => {
      console.log("funcionou check = ", response);
      this.result = response;
      // chama função para salvar a os em si
      this.updateOS();
    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
        this.spinner.hide();
      });

  }

  updateOS() {
    if (this.os.assinatura == null) {
      this.os.status = "Pendente"
      alert("O status nao foi alterado pois o cliente ainda nao assinou!")
    } else {
      if (this.os.assinatura.confirmacao != true) {
        this.os.status = "Pendente"
        alert("O status nao foi alterado pois o cliente não quis assinar!")
      }
    }

    if (this.os.tipo == "Corretiva") {
      let os = {
        idOS: this.os.idOS,
        tipo: this.os.tipo,
        ano: this.os.ano,
        mes: this.os.mes,
        status: this.os.status,
        motivo: this.os.motivo,
        observacao: this.os.observacao,
        datainicial: this.range.value.start,
        datafinal: this.range.value.end,
        envEmail: this.os.envEmail,
        peca: this.os.peca,
        cliente: {
          idCliente: this.variables.getCliente()
        },
        assinatura: this.os.assinatura,
        equipamento: {
          idEquipamento: this.variables.getEquipamento()
        },
        usuario: {
          login: this.os.usuario.login
        },
        check: null,
        img1: this.os.img1,
        img2: this.os.img2,
        img3: this.os.img3,
        img4: this.os.img4,
        img5: this.os.img5,
        img6: this.os.img6
      }
      console.log(os)
      // this.spinner.hide();
      // this.spinner.show();
      this.apiesterilavos.postOs(os).then((response: any) => {
        console.log("funcionou os = ", response);
        this.result = response;
        this.spinner.hide();
        this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
        alert('Os alterada com Sucesso!')

      })
        .catch((response) => {
          console.log("deu erro pedido = ", response);
          this.result = response;
          this.spinner.hide();
        });
    } else if (this.os.tipo == "Preventiva") {
      let os = {
        idOS: this.os.idOS,
        tipo: this.os.tipo,
        ano: this.os.ano,
        mes: this.os.mes,
        status: this.os.status,
        motivo: this.os.motivo,
        observacao: this.os.observacao,
        envEmail: this.os.envEmail,
        peca: this.os.peca,
        datainicial: this.range.value.start,
        datafinal: this.range.value.end,
        cliente: {
          idCliente: this.variables.getCliente()
        },
        assinatura: this.os.assinatura,
        equipamento: {
          idEquipamento: this.variables.getEquipamento()
        },
        usuario: {
          login: this.os.usuario.login
        },
        check: {
          id: this.result.id
        },
        img1: this.os.img1,
        img2: this.os.img2,
        img3: this.os.img3,
        img4: this.os.img4,
        img5: this.os.img5,
        img6: this.os.img6

      }
      console.log(os)
      // this.spinner.hide();
      // this.spinner.show();
      this.apiesterilavos.postOs(os).then((response: any) => {
        console.log("funcionou os = ", response);
        this.result = response;
        this.spinner.hide();
        this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
        alert('Os alterada com Sucesso!')

      })
        .catch((response) => {
          console.log("deu erro pedido = ", response);
          this.result = response;
          this.spinner.hide();
        });
    }
  }



  cancel(): void {
    this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
  }

}
