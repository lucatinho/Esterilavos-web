import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
  styleUrls: ['./setores.component.css']
})
export class SetoresComponent implements OnInit {
  // typesOfShoes: string[] = ['CME', 'LACTÁRIO', 'LABORATÓRIO', 'OUTROS'];

  displayedColumns: string[] = ['position','name', 'symbol'];
  setores:any=[];
  dataSource:any;

  dados:any={
    cliente: this.variables.getClienteNome()
  }

  constructor(
    private router: Router,
    private variables: VariablesService,
    private apiesterilavos: ApiEsterilavosService) { }

  ngOnInit(): void {
    this.getSetores()
  }



  getSetores() {
    // chama a tela de carregamento
    this.apiesterilavos.getSetores()
      .then((response) => {
        this.setores = response;

       

        this.setores.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource = this.setores;
        // this.dataSource = new MatTableDataSource(this.equipamentosFiltrados);
        console.log("banco setores:", this.setores);
        // fecha a tela de carregamento
        // this.ngAfterViewInit()
        // this.applyFilter("false");
        // this.dataSource.filter = "false"
      })
      .catch((response) => {
        this.setores = response;
        // fecha a tela de carregamento
      });
  }

  verEquipamento(nome,id){
    this.variables.postSetor(nome);
    this.variables.postSetorID(id)
    this.router.navigate(['/equipamentos']);

  }

  enviarOS(nome,id){
    this.variables.postSetor(nome);
    this.variables.postSetorID(id)
    this.router.navigate(['/enviarOS']);
  }

  selecionado(nome,id){
    // console.log(id)
    this.variables.postSetor(nome);
    this.variables.postSetorID(id)
    this.router.navigate(['/equipamentos']);
  }

  cancel(): void {
    this.router.navigate(['/clientes']);
  }
}
