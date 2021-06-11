import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import * as bcrypt from 'bcryptjs';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-usuario-update',
  templateUrl: './usuario-update.component.html',
  styleUrls: ['./usuario-update.component.css']
})
export class UsuarioUpdateComponent implements OnInit {
  id: string;
  usuario: any = {
    roles: [
      {
        nomeRole: ""
      }
    ]
  };
  result: any;
  pass: string = "";


  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private routeID: ActivatedRoute,
    private variables: VariablesService,
  ) { }

  ngOnInit(): void {
    this.getUsuarioeId();
  }

  getUsuarioeId() {
    // this.id = +this.routeID.snapshot.paramMap.get('id')
    this.id = this.variables.getUsuarioUpdate();
    // console.log("chegou: ", this.id)
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getUsuarioUnico(this.id)
      .then((response) => {
        this.usuario = response;
        console.log("banco usuario:", this.usuario);
        this.spinner.hide();
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.usuario = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });

  }

  OnSumbit(form) {
    console.log(form.value);
    // this.Encrypt();
    if (this.pass != "") {
      this.Encrypt();
    }
    this.postCliente();
  }



  Encrypt() {
    console.log("senha a:", this.pass);
    this.pass = bcrypt.hashSync(this.pass, 10);
    this.usuario.senha = this.pass;
    console.log("senha b:", this.pass);
  }

  postCliente() {

    let usuarioF = {
      login: this.usuario.login,
      senha: this.usuario.senha,
      nome: this.usuario.nome,
      email: this.usuario.email,
      celular: this.usuario.celular,
      ativo: this.usuario.ativo,
      roles: [{
        nomeRole: this.usuario.roles[0].nomeRole
      }]
    }
    console.log("enviar: ", usuarioF)

    this.spinner.show();
    this.apiesterilavos.postUsuario(usuarioF).then((response: any) => {
      console.log("funcionou usuario = ", response);
      this.result = response;
      this.spinner.hide();
      this.router.navigate(['/usuario/listar']);

    })
      .catch((response) => {
        console.log("deu erro usuario = ", response);
        this.result = response;
        this.spinner.hide();
        alert("erro ao atualizar usuario")
      });

  }

  cancel() {
    this.router.navigate(['/usuario/listar']);
  }
}
