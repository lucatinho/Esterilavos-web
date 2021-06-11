import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';

@Component({
  selector: 'app-assinatura-create',
  templateUrl: './assinatura-create.component.html',
  styleUrls: ['./assinatura-create.component.css']
})
export class AssinaturaCreateComponent implements OnInit {

  assinatura: any = {}
  url: any;
  podeassinar: boolean = true;
  resultAssinatura: any;
  os: any = {}

  checked = {
    autoclave: {
      id: null
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


  creia: any = '1';

  recusou:boolean=false;

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    // this.id = +this.routeID.snapshot.paramMap.get('id')
    this.url = window.location.href.split("assinatura/create/");

    console.log(window.location.href);
    console.log(this.url);
    this.verificacao();
    this.getOsId();
  }

  verificacao() {
    if (this.url[1] == "") {
      this.podeassinar = false;
      alert("Por favor saia da pagina e tente entrar novamente pelo link, caso persista nos contate")
    } else if (this.url[1] == null) {
      this.podeassinar = false;
      alert("Por favor saia da pagina e tente entrar novamente pelo link, caso persista nos contate")
    }
  }

  getOsId() {
    if (this.podeassinar == true) {
      // chama a tela de carregamento
      this.spinner.show();
      this.apiesterilavos.getOsUnico(this.url[1])
        .then((response) => {
          this.os = response;
          this.checked = this.os.check

          this.spinner.hide();
          console.log("banco os:", this.os);
          if (this.os == null) {
            this.podeassinar = false;
            alert("OS não encontrada, por favor sair e entrar novamente pelo link, caso persista nos contate")
          } else if (this.os.assinatura != null) {
            this.podeassinar = false;
            alert("OS já assinada!");
          }
          // fecha a tela de carregamento
        })
        .catch((response) => {
          this.os = response;
          this.spinner.hide();
          alert("Erro, por favor tente mais tarde!")
          this.podeassinar = false;
          // fecha a tela de carregamento
        });
    }
  }

  recusar() {
    this.recusou = true
  }

  OnSumbit(form) {
    // console.log(form.value);
    this.assinatura = form.value;
    this.postAssinatura();
  }

  postAssinatura() {
    if (this.recusou != true) {
      this.assinatura.confirmacao = true
    }else{
      this.assinatura.confirmacao = false
    }
   
    this.spinner.show();
    console.log(this.assinatura);
    this.apiesterilavos.postAssinatura(this.assinatura).then((response: any) => {
      console.log("funcionou Assinatura = ", response);
      this.resultAssinatura = response
      // this.spinner.hide();
      // alert('OS assinada com Sucesso!')
      this.updateOS();

    })
      .catch((response) => {
        console.log("deu erro os = ", response);
        alert('Erro ao cadastrar assinatura!')
        this.spinner.hide();
      });

  }

  updateOS() {
    this.os.assinatura = {
      id: this.resultAssinatura.id
    }

    let usuarioTemp = this.os.usuario.login
        this.os.usuario = {}
        this.os.usuario.login = usuarioTemp


    console.log(this.os)
    this.apiesterilavos.postOs(this.os).then((response: any) => {
      console.log("funcionou os = ", response);
      this.spinner.hide();
      this.podeassinar = false;
      if (this.recusou != true) {
        alert('OS assinada com Sucesso!')
      }else{
        alert("OS recusada com Sucesso!")
      }
     

    })
      .catch((response) => {
        console.log("deu erro os = ", response);
        alert('Erro ao assinar OS!')
        this.spinner.hide();
      });
  }

}
