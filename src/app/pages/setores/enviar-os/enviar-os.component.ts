import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-enviar-os',
  templateUrl: './enviar-os.component.html',
  styleUrls: ['./enviar-os.component.css']
})
export class EnviarOSComponent implements OnInit {
  filter = {
    ano: '2021',
    mes: '06'
  };
  os: any = [];
  osfiltrado: any = [];
  activeTable:boolean=false;

  // displayedColumns: string[] = ['position', 'name', 'setor','status', 'symbol'];
  displayedColumns: string[] = ['position', 'name','setor','status', 'symbol'];

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dados:any={
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor()
  }

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private variables: VariablesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("variavel", this.filter)
  }

  pesquisar(){
    this.getOS();
    this.activeTable=true;

  }

  //  chama a API
  getOS() {
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getOs()
      .then((response) => {
        this.os = response;
        // filtra equipamentos
        let index2 = 0;
        for (let index = 0; index < this.os.length; index++) {
          if (
            this.os[index].equipamento.setor.nome == this.variables.getSetor() && 
            this.os[index].ano == this.filter.ano && 
            this.os[index].mes == this.filter.mes && 
            this.os[index].cliente.idCliente == this.variables.getCliente()
            ) {
            this.osfiltrado[index2] = this.os[index];
            index2++;
          }
        }

        // this.osfiltrado.sort((a, b) => a.nome.localeCompare(b.nome));
        this.dataSource = new MatTableDataSource(this.osfiltrado);
        this.spinner.hide();
        console.log("banco equipmanetos:", this.osfiltrado);
        // fecha a tela de carregamento
        this.ngAfterViewInit()   
      })
      .catch((response) => {
        this.os = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

   // filtro
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  voltarFiltro(){
    this.activeTable=false;
  }

  enviar(dados){
    if (confirm("Você tem certeza que deseja enviar a OS nº " + dados.idOS)) { 
      // let celular = "https://api.whatsapp.com/send?phone=" + dados.cliente.celular
      if(dados.cliente.celular.length == 13){

        let celular = "https://api.whatsapp.com/send?phone=" + dados.cliente.celular
        let mensagem = "&text=Entre%20no%20link%20para%20assinar%20a%20OS%20%20%20"
        let usuario= "Usuario:cliente%20%20Senha:123%20%20%20"
        let linkAssinar = "https://esterilavos.com/assinatura/create/" + dados.idOS
        
        let link = celular + mensagem + usuario + linkAssinar
        window.open(link);
       
        dados.envEmail = true
        console.log(dados)
        this.spinner.show();
        this.apiesterilavos.postOs(dados).then((response: any) => {
          console.log("funcionou os = ", response);
          this.getOS();
          this.spinner.hide();
  
          alert("OS nº "+ dados.idOS + " enviada");
    
        })
          .catch((response) => {
            console.log("deu erro pedido = ", response);
            this.spinner.hide();
            alert("OS nº "+ dados.idOS + " erro ao enviar!");
          });
      }else{
        alert("O numero cadastrado não tem os 13 digitos nescessarios para enviar uma mensagem")
      }
     

    
    }
  }
  cancel(): void {
    this.router.navigate(['/setores']);
  }
}
