import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';
import {FormGroup, FormControl} from '@angular/forms';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-os-read-unico',
  templateUrl: './os-read-unico.component.html',
  styleUrls: ['./os-read-unico.component.css']
})
export class OsReadUnicoComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  id: number;
  result: any;
  os: any = [];

  list: any = {
    equipamento: this.variables.getEquipamento(),
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor(),
    autoclave: this.variables.getEquipamentoAutoclave()
  }
  creia: any = '1';
  task = {
    name: 'Indeterminate',
    completed: true,
    color: 'primary',
  }

  checked = {
    autoclave: {
      id: this.variables.getEquipamentoAutoclave().id
    },
    c1: true,
    c2: false,
    c3: false,
    c4: false,
    c5: false,
    c6: false,
    c7: false,
    c8: false,
    c9: false,
    c10: false,
    c11: false,
    c12: false,
    c13: false,
    c14: false,
    c15: false,
    c16: false,
    c17: false,
    c18: false,
    c19: false,
    c20: false,
    c21: false,
    c22: false,
    c23: false
  };

  imagem:any={}
  imagens:any=[]

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private routeID: ActivatedRoute,
    private variables: VariablesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getOsId();
  }

  onPrint(){
    this.variables.postImprimir(this.os)
    window.open("http://localhost:4200/os/imprimir");
    // window.print();
}

  getOsId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getOsUnico(this.id)
      .then((response) => {
        this.os = response;
        this.checked = this.os.check
        this.range = new FormGroup({
          start: new FormControl(this.os.datainicial),
          end: new FormControl(this.os.datafinal)
        });
        this.spinner.hide();
        this.getImg();
        console.log("banco os:", this.os);
        console.log("banco checked:", this.checked);
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.os = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });

  }

  getImg(){
    if ( this.os.img1 > 0) {
      let imgQtd = [ 
        this.os.img1,
        this.os.img2,
        this.os.img3,
        this.os.img4,
        this.os.img5,
        this.os.img6,
      ]
      for (let index = 0; index < imgQtd.length; index++) {
        if (imgQtd[index] > 0) {

          this.apiesterilavos.getImagemUnica(imgQtd[index])
          .then((response) => {
            // this.imagem[index] = response;
            this.imagem = response;

            this.imagens[index] = this.imagem.tipo +","+ this.imagem.img;
           
            // if (index + 1 == imgQtd.length) {
            //   console.log("banco imagens:",this.imagens);

            // }
            // fecha a tela de carregamento
          })
          .catch((response) => {
            this.os = response;
            // fecha a tela de carregamento
          });

        }
      }
    }
  }


  onExportClick(){
    const options ={
      filename: 'OS.pdf',
      image: { type: 'jpeg'},
      html2canvas: {},
      jsPDF: { orientation: 'landscape'}
    };

    const content: Element = document.getElementById('element-pdf');

    html2pdf()
    .from(content)
    .set(options)
    .save();
  }
  
  
  cancel(): void {
    this.router.navigate(['/os-pendente']);
  }

}
