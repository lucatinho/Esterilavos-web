import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';

@Component({
  selector: 'app-equipamento-read-unico',
  templateUrl: './equipamento-read-unico.component.html',
  styleUrls: ['./equipamento-read-unico.component.css']
})
export class EquipamentoReadUnicoComponent implements OnInit {
  id: number;
  result: any;
  equipamento:any={};

  imagem:any={}
  imagens:any=[]

  public myAngularxQrCode: string = null;

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private routeID: ActivatedRoute,
    private spinner: NgxSpinnerService,
  ) { 
    this.myAngularxQrCode = 'Your QR code data';
  }

  ngOnInit(): void {
    this.getEquipamentoId();
  }

  getEquipamentoId() {
    this.id = +this.routeID.snapshot.paramMap.get('id')
    // chama a tela de carregamento
    this.spinner.show();
    this.apiesterilavos.getEquipamentoUnico(this.id)
      .then((response) => {
        this.equipamento = response;
        this.myAngularxQrCode = 'https://esterilavos.com/equipamento/readunico/' + this.equipamento.idEquipamento;
        this.spinner.hide();
        this.getImg();
        console.log("banco equipmento unico:", this.equipamento);
        // fecha a tela de carregamento
      })
      .catch((response) => {
        this.equipamento = response;
        this.spinner.hide();
        // fecha a tela de carregamento
      });
  }

  getImg(){
    if ( this.equipamento.img1 > 0) {
      let imgQtd = [ 
        this.equipamento.img1,
        this.equipamento.img2,
        this.equipamento.img3,
        this.equipamento.img4,
        this.equipamento.img5,
        this.equipamento.img6,
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
            this.equipamento = response;
            // fecha a tela de carregamento
          });

        }
      }
    }
  }
 

  cancel(): void {
    this.router.navigate(['/fourcamps/' + this.id]);
  }



}
