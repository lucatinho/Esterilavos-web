import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  result: any;

  usuarios: any = [];
  displayedColumns: string[] = ['nome', 'nivel', 'login', 'ativo', 'symbol'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  permissao:string="";

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private variables: VariablesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.permissao = this.variables.getSessao().role
    if (this.permissao != "ROLE_TECNICO") {
      this.readUsuarios();
    }
   
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
        // this.clientes.sort((a, b) => a.idCliente.localeCompare(b.idCliente));

        this.dataSource = new MatTableDataSource(this.usuarios);
        console.log("banco Usuarios:", this.usuarios);

        this.ngAfterViewInit()
        // fecha a tela de carregamento
        this.spinner.hide();
      })
      .catch((response) => {
        this.usuarios = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // filtro
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // redireciona para pagina de edição
  update(id) {
    // console.log('test: ', "/categoria/update/" + id)
    this.variables.postUsuarioUpdate(id);
    this.router.navigate(['/usuario/update/' + id])

  }

  delete(dados) {
    if (dados.ativo == true) {
      // alert
      if (confirm("Você tem certeza que deseja desativar o usuario: " + dados.nome)) {

        let usuarioF = {
          login: dados.login,
          senha: dados.senha,
          nome: dados.nome,
          email: dados.email,
          celular: dados.celular,
          ativo: false,
          roles: [{
            nomeRole: dados.roles[0].nomeRole
          }]
        }
        console.log("enviar: ", usuarioF)


        this.spinner.show();
        this.apiesterilavos.postUsuario(usuarioF).then((response: any) => {
          console.log("funcionou usuario = ", response);
          dados.ativo = false
          this.result = response;
          this.spinner.hide();
          this.router.navigate(['/usuario/listar']);

        })
          .catch((response) => {
            console.log("deu erro usuario = ", response);
            this.result = response;
            this.spinner.hide();
          });

      }
    } else {
      // alert
      if (confirm("Você tem certeza que deseja reativar o usuario: " + dados.nome)) {

        let usuarioF = {
          login: dados.login,
          senha: dados.senha,
          nome: dados.nome,
          email: dados.email,
          celular: dados.celular,
          ativo: true,
          roles: [{
            nomeRole: dados.roles[0].nomeRole
          }]
        }
        console.log("enviar: ", usuarioF)
        
        this.spinner.show();
        this.apiesterilavos.postUsuario(usuarioF).then((response: any) => {
          console.log("funcionou usuario = ", response);
          dados.ativo = true
          this.result = response;
          this.spinner.hide();
          this.router.navigate(['/usuario/listar']);

        })
          .catch((response) => {
            console.log("deu erro usuario = ", response);
            this.result = response;
            this.spinner.hide();
          });
      }
    }


  }

}
