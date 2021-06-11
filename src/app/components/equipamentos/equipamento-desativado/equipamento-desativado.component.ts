import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-equipamento-desativado',
  templateUrl: './equipamento-desativado.component.html',
  styleUrls: ['./equipamento-desativado.component.css']
})
export class EquipamentoDesativadoComponent implements OnInit {

  equipamentos: any = [];
  equipamentosFiltrados: any = [];
  displayedColumns: string[] = ['position', 'name', 'numero_serie', 'setor', 'cliente', 'symbol'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  result: any;

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
          if (this.equipamentos[index].desativado == true) {
            this.equipamentosFiltrados[index2] = this.equipamentos[index];
            index2++;
          }
        }
        if (index2 == 0) {
          this.equipamentosFiltrados = []
        }

        this.equipamentosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource = new MatTableDataSource(this.equipamentosFiltrados);
        console.log("banco att:", this.equipamentosFiltrados);
        console.log("banco novo:", this.equipamentos);
        this.spinner.hide();
        // fecha a tela de carregamento
        this.ngAfterViewInit()
        this.dataSource.filter = "true"
      })
      .catch((response) => {
        this.equipamentos = response;
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

  ativar(descricao) {

    if (confirm("Você tem certeza que deseja reativar: " + descricao.modelo)) {

      
      descricao.desativado = false
        
      // this.openDialog()
      this.spinner.show();
      console.log(descricao)
      this.apiesterilavos.postEquipamentos(descricao).then((response: any) => {
        console.log("funcionou equipamento = ", response);
        this.result = response;
        this.getEquipmanetos();
        this.spinner.hide();
        this.router.navigate(['/equipamento/delete']);
       
      })
        .catch((response) => {
          console.log("deu erro equipamento = ", response);
          this.result = response;
          this.spinner.hide();
        });

    }
  }




}
