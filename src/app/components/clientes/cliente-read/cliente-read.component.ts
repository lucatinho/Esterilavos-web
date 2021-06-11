import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogClienteDeleteComponent } from './dialog-cliente-delete/dialog-cliente-delete.component';




@Component({
  selector: 'app-cliente-read',
  templateUrl: './cliente-read.component.html',
  styleUrls: ['./cliente-read.component.css']
})
export class ClienteReadComponent implements OnInit {
  result: any;

  clientes: any = [];
  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  pass: any = "";

  permissao:string = "";

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private variables: VariablesService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.readClientes();
    this.permissao = this.variables.getSessao().role
  }

  // lista todos os clientes
  readClientes() {
    // chama a tela de carregamento
    this.spinner.show();
    //  chama a função da api 
    this.apiesterilavos.getClientes()
      .then((response) => {
        this.clientes = response;
        // ordena por id os clientes 
        // this.clientes.sort((a, b) => a.idCliente.localeCompare(b.idCliente));

        this.dataSource = new MatTableDataSource(this.clientes);
        console.log("banco clientes:", this.clientes);
        // fecha a tela de carregamento
        this.ngAfterViewInit()
        // this.applyFilter("false");
        this.dataSource.filter = "false"
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

  // redireciona para pagina de edição
  update(id) {
    // console.log('test: ', "/categoria/update/" + id)
    this.router.navigate(['/cliente/update/' + id])

  }

  delete(dados) {
    // dialog
    const dialogRef = this.dialog.open(DialogClienteDeleteComponent, {
      width: '250px',
      data: { pass: this.pass }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pass = result;
      if (this.pass != undefined) {
        if (this.pass == this.variables.getSessao().password) {

          // alert
          if (confirm("Você tem certeza que deseja deletar: " + dados.nome)) {

            dados.desativado = true

            // this.openDialog()
            this.spinner.show();
            console.log(dados)
            this.apiesterilavos.postCliente(dados).then((response: any) => {
              console.log("funcionou pedido = ", response);
              this.result = response;
              this.readClientes();
              this.spinner.hide();

            })
              .catch((response) => {
                console.log("deu erro pedido = ", response);
                this.result = response;
                this.spinner.hide();
              });
          }


        } else {
          alert("Senha incorreta!")
        }
      }
    });
  }



  // filtro
  applyFilter(filterValue: string) {
    // this.applyFilter("false");
    console.log(filterValue)
    if (filterValue != "") {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log("entrou")
    } else {
      this.dataSource.filter = "false";
    }

  }

  // manda para pagina de setores
  view(id, nome) {
    this.variables.postCliente(id);
    this.variables.postClienteNome(nome);
    this.router.navigate(['/setores']);
  }


  // somente de exemplo - sem uso 
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogClienteDeleteComponent, {
      width: '250px',
      data: { pass: this.pass }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pass = result;
      if (this.pass != undefined) {
        if (this.pass == this.variables.getSessao().password) {
          console.log("bom")
        }
      }
    });
  }




}



