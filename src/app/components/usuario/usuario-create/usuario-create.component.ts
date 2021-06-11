import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css']
})
export class UsuarioCreateComponent implements OnInit {

  usuario: any = {
    role: 'ROLE_TECNICO'
  };
  result: any;
  pass: string;

  usuarios: any = []

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.readUsuarios();
  }

  // lista todos os usuarios
  readUsuarios() {
    // chama a tela de carregamento
    this.spinner.show();
    //  chama a função da api 
    this.apiesterilavos.getUsuarios()
      .then((response) => {
        this.usuarios = response;
        // ordena por id os clientes 
        console.log("banco Usuarios:", this.usuarios);
        // fecha a tela de carregamento
        this.spinner.hide();
      })
      .catch((response) => {
        this.usuarios = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }


  OnSumbit(form) {
    console.log(form.value);
    this.Encrypt();
    this.usuarioExiste();
  }

  usuarioExiste() {
    let existe = false;

    for (let index = 0; index < this.usuarios.length; index++) {
      if (this.usuarios[index].login == this.usuario.login) {
        console.log("Usuario banco: ", this.usuarios[index].login, "Usuario escrito: ", this.usuario.login)
        existe = true
        alert("Nome de usuario ja axiste!")
        break;
      }
    }

    if (existe == false) {
      this.postCliente();
      console.log("chamou")
    }

  }

  Encrypt() {
    console.log("senha a:", this.usuario.senha);
    this.pass = bcrypt.hashSync(this.usuario.senha, 10);
    console.log("senha b:", this.pass);
  }

  postCliente() {
    let usuarioF = {
      login: this.usuario.login,
      senha: this.pass,
      nome: this.usuario.nome,
      email: this.usuario.email,
      celular: this.usuario.celular,
      ativo: true,
      roles: [{
        nomeRole: this.usuario.role
      }]
    }
    console.log(usuarioF)

    this.spinner.show();
    this.apiesterilavos.postUsuario(usuarioF).then((response: any) => {
      console.log("funcionou usuario = ", response);
      this.result = response;
      this.spinner.hide();
      this.router.navigate(['/clientes']);

    })
      .catch((response) => {
        console.log("deu erro usuario = ", response);
        this.result = response;
        this.spinner.hide();
      });

  }


}
