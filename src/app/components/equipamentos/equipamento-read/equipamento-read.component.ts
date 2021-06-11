import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';
import { DialogEquipamentoDeleteComponent } from './dialog-equipamento-delete/dialog-equipamento-delete.component';

@Component({
  selector: 'app-equipamento-read',
  templateUrl: './equipamento-read.component.html',
  styleUrls: ['./equipamento-read.component.css']
})
export class EquipamentoReadComponent implements OnInit {
  dados:any={
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor()
  }

  equipamentos: any = [];
  equipamentosFiltrados: any = [];
  displayedColumns: string[] = ['position', 'name', 'numero_serie', 'setor','cliente', 'symbol'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: any;
  pass: any = "";

  permissao:string="";

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private variables: VariablesService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEquipmanetos();
    this.permissao = this.variables.getSessao().role
  }


  //  chama a API
  getEquipmanetos() {
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getEquipamentos()
      .then((response) => {
        this.equipamentos = response;
        // filtra equipamentos
        let index2 = 0;
        this.equipamentosFiltrados = []
        for (let index = 0; index < this.equipamentos.length; index++) {
          if (this.equipamentos[index].setor.nome == this.variables.getSetor() &&
          this.equipamentos[index].desativado == false &&
           this.equipamentos[index].cliente.idCliente ==  this.variables.getCliente()
           ) {
            this.equipamentosFiltrados[index2] = this.equipamentos[index];
            index2++;
          }
        }
        if (index2 == 0) {
          this.equipamentosFiltrados = []
          console.log("nada na lista")
        }

        // this.equipamentosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource = new MatTableDataSource(this.equipamentosFiltrados);
        console.log("banco equipmanetos:", this.equipamentosFiltrados);
        this.spinner.hide();
        this.dataSource.filter = "false"
        // fecha a tela de carregamento
        this.ngAfterViewInit()
        
      })
      .catch((response) => {
        this.equipamentos = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }


  // filtrarEquipamentos() {

  //   let index2 = 0;
  //   for (let index = 0; index < this.equipamentos.length; index++) {
  //     if (this.equipamentos[index].setor == this.variables.getSetor()) {
  //       this.equipamentosFiltrados[index2] = this.equipamentos[index];
  //       index2++;
  //     }
  //   }
  // }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // filtro
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }


  delete(descricao) {
    // dialog
    const dialogRef = this.dialog.open(DialogEquipamentoDeleteComponent, {
      width: '250px',
      data: { pass: this.pass }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pass = result;
      if (this.pass != undefined) {
        if (this.pass == this.variables.getSessao().password) {


          if (confirm("Você tem certeza que deseja deletar: " + descricao.modelo)) {
            
            descricao.desativado = true
             
            
            // this.openDialog()
            this.spinner.show();
            console.log(descricao)
            this.apiesterilavos.postEquipamentos(descricao).then((response: any) => {
              console.log("funcionou equipamento = ", response);
              this.result = response;
              this.getEquipmanetos();
              this.spinner.hide();
            })
              .catch((response) => {
                console.log("deu erro equipamento = ", response);
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

  update(id) {
    // console.log('test: ', "/categoria/update/" + id)
    this.router.navigate(['/equipamento/update/' + id])

  }

  view(id, nome, autoclave) {
    this.variables.postEquipamento(id);
    this.variables.postEquipamentoNome(nome);
    this.variables.postEquipamentoAutoclave(autoclave)
    this.router.navigate(['/fourcamps/' + id]);

    // this.openDialog();
    // ainda sera implementado
  }

  cancel(): void {
    this.router.navigate(['/setores']);
  }

  
  add(): void {
    this.router.navigate(['/equipamento/create']);
  }

}
