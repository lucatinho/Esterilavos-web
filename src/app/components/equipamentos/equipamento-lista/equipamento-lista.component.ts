import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';

@Component({
  selector: 'app-equipamento-lista',
  templateUrl: './equipamento-lista.component.html',
  styleUrls: ['./equipamento-lista.component.css']
})
export class EquipamentoListaComponent implements OnInit {

  result: any;

  equipamentos: any = [];
  displayedColumns: string[] = ['position', 'cliente', 'setor', 'Tipo', 'modelo', 'numero_serie', 'symbol'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.readClientes();
  }

  //  chama a API
  readClientes() {
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getEquipamentos()
      .then((response) => {
        this.equipamentos = response;
        this.equipamentos.sort((a, b) => a.modelo.localeCompare(b.modelo));
        this.dataSource = new MatTableDataSource(this.equipamentos);
        console.log("banco equipamentos:", this.equipamentos);
        // fecha a tela de carregamento
        this.ngAfterViewInit()
        // this.applyFilter("false");
        this.spinner.hide();
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

  view(id) {
    this.router.navigate(['/fourcamps/' + id]);
  }

}
