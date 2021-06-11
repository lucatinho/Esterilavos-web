import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-cliente-desativado',
  templateUrl: './cliente-desativado.component.html',
  styleUrls: ['./cliente-desativado.component.css']
})
export class ClienteDesativadoComponent implements OnInit {
  result:any;

  clientes: any = [];
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  permissao:string="";

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router : Router,
    private spinner: NgxSpinnerService,
    private variables: VariablesService
  ) { }

  ngOnInit(): void {
    this.readClientes();
    this.permissao = this.variables.getSessao().role
  }

  //  chama a API
  readClientes() {
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getClientes()
      .then((response) => {
        this.clientes = response;
        this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource = new MatTableDataSource(this.clientes);  
        console.log("banco clientes:", this.clientes);
        // fecha a tela de carregamento
        this.ngAfterViewInit()
        // this.applyFilter("false");
        this.dataSource.filter = "true"
        this.spinner.hide();
      })
      .catch((response) => {
        this.clientes = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  update(dados) {
  if(confirm("Você tem certeza que deseja Reativar: "+ dados.nome)) {

    dados.desativado = false

    console.log(dados)
    this.apiesterilavos.postCliente(dados).then((response: any) => {
      console.log("funcionou pedido = ", response);
      this.result = response;
      this.readClientes();

    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
      });
    }
  }

  // filtro
  applyFilter(filterValue: string) {
    console.log(filterValue)
    if (filterValue != "") {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log("entrou")
    }else{
      this.dataSource.filter = "true";
    }
    
  }

}
