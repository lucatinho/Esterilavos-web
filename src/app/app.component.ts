import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ApiEsterilavosService } from './apis/api-esterilavos.service';
import { NgxSpinnerService } from "ngx-spinner";
import { VariablesService } from './variables/variables.service';
import { iif } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  test: number = 0;

  username: string;
  password: string;

  login: any
  id: any;

  imprimir:boolean = false;
  constructor(
    private localStorage: LocalStorageService,
    private service: ApiEsterilavosService,
    private Router: Router,
    private spinner: NgxSpinnerService,
    private variables: VariablesService,
    private routeID: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (window.location.href == this.variables.getLocaleUrl() + '/os/imprimir') {
      this.imprimir = true;
      this.test = 99;
    }else{
      this.logado();
    }
    
    
  }

  // ve se ja tem uma login salvo no navegador
  logado() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    console.log("passou", this.id)
    // this.Router.navigate(['/']);

    let loginSalvo = this.localStorage.retrieve('loginSessao');

    if (loginSalvo != null) {
      this.variables.postSessao(loginSalvo.username, loginSalvo.password, loginSalvo.role, loginSalvo.ativo)

      if (loginSalvo.ativo == true) {
        if (loginSalvo.role == 'ROLE_ADMINISTRATIVO') {
          this.test = 1
          // this.Router.navigate(['/']);
        } else if (loginSalvo.role == 'ROLE_TECNICO') {
          console.log("entrou 2")
          this.test = 2
        } else if (loginSalvo.role == 'ROLE_CLIENTE') {
          console.log("entrou 3")
          this.test = 3
  
        }
      } else {
        alert("Usuario bloqueado, contate um adiministrador!")
      }
      
    } else {
      this.spinner.hide();
      this.test = 0
      /* alert("Você não está logado"); */
    }
  }


  // faz login
  doLogin() {

    let loginSalvo = {
      username: this.username,
      password: this.password
    }
    console.log(loginSalvo);
    // chama a tela de carregamento
    this.spinner.show();



    this.service.getUsuario(loginSalvo.username, loginSalvo.password)
      .then((response) => {
        this.login = response;
        console.log(this.login)

        this.variables.postSessao(loginSalvo.username, loginSalvo.password, this.login.roles[0].nomeRole, this.login.ativo)
        this.logado();
        this.spinner.hide();
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.spinner.hide();
        this.login = response;
        console.log("erro: ", response);
        alert("Usuario ou senha incorretos !");
        // fecha a tela de carregamento
      });

  }

}
