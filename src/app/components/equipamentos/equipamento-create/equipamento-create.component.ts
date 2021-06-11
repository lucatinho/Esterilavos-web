import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';

@Component({
  selector: 'app-equipamento-create',
  templateUrl: './equipamento-create.component.html',
  styleUrls: ['./equipamento-create.component.css']
})
export class EquipamentoCreateComponent implements OnInit {

  result: any;
  equipamento: any = [];

  dados: any = {
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor()
  }


  image1: any = null;
  image2: any = null;
  image3: any = null;
  salvarOutra: number = 1;
  contadorImagem: number = 0;
  imgquebrada: any = [];
  imagens: any = [];

  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private variables: VariablesService,
  ) { }

  ngOnInit(): void {
    this.equipamento.autoclave = "1";
  }

  //  ------------ pegar imagens -----------------
  saveImage1(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image1 = myReader.result;

      this.imgquebrada[0] = this.image1.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 2;
    }

    myReader.readAsDataURL(file);
    //convert to base64 ends

    console.log(this.image1)
  }
  saveImage2(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image2 = myReader.result;

      this.imgquebrada[1] = this.image2.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 3;
    }

    myReader.readAsDataURL(file);

    console.log(this.image2)
  }
  saveImage3(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image3 = myReader.result;

      this.imgquebrada[2] = this.image3.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 4;
    }

    myReader.readAsDataURL(file);

    console.log(this.image3)
  }

  OnSumbit(form) {
    console.log(form.value);
    // this.postEquipamento();
    this.verificarImagens();
  }

  verificarImagens() {
    // verifica se existe imagem 
    if (this.imgquebrada.length > 0) {
      let chamarpostOS = 0;
      for (let index = 0; index < this.imgquebrada.length; index++) {

        // formata do jeito que tem que ser salvo 
        let imagemformatada = {
          tipo: this.imgquebrada[index][0],
          img: this.imgquebrada[index][1]
        }

        this.spinner.show();
        this.apiesterilavos.postImagem(imagemformatada).then((response: any) => {
          console.log("funcionou imagem ", this.contadorImagem, " = ", response);
          this.imagens[this.contadorImagem] = response;
          this.contadorImagem++;
          chamarpostOS++;
          this.spinner.hide();
          console.log(chamarpostOS, "==", this.imgquebrada.length)
          // verifica se ja salvou todas as imagens para chamar funcao de salvar o equipamento
          if (chamarpostOS == this.imgquebrada.length) {
            console.log(chamarpostOS, "==", this.imgquebrada.length)
            console.log("imagem ", this.imagens);
            // chama função para salvar o equipamento em si
            this.postEquipamento();
          }

        })
          .catch((response) => {
            console.log("deu erro imagem = ", response);
            alert("Erro ao salvar imagem")
            // this.result = response;
            this.spinner.hide();
          });


      }
    } else {
      // chama função para salvar o equipamento em si caso nao tenha imagem
      this.postEquipamento();
    }

  }

  postEquipamento() {
    // coloca tudo null para ser aceitavel caso nao tenha imagem
    let campImagem = [
      null,
      null,
      null,
      null,
      null,
      null
    ];
    // coloca imagem nos campos
    if (this.imagens.length > 0) {
      for (let index = 0; index < this.imagens.length; index++) {
        campImagem[index] = this.imagens[index].id
        console.log("ver: ", campImagem);
      }
    }

    let equipamento = {
      numero_serie: this.equipamento.numero_serie,
      ano_fabrica: this.equipamento.ano_fabrica,
      numero_patrimonio: this.equipamento.numero_patrimonio,
      modelo: this.equipamento.modelo,
      fabricante: this.equipamento.fabricante,
      tensao_alimentacao: this.equipamento.tensao_alimentacao,
      desativado: false,
      autoclave: {
        id: this.equipamento.autoclave
      },
      setor: {
        id: this.variables.getSetorID()
      },
      cliente: {
        idCliente: this.variables.getCliente()
      },
      img1: campImagem[0],
      img2: campImagem[1],
      img3: campImagem[2],
    }

    console.log(equipamento)
    this.spinner.show();
    this.apiesterilavos.postEquipamentos(equipamento).then((response: any) => {
      console.log("funcionou pedido = ", response);
      this.result = response;
      this.spinner.hide();
      this.router.navigate(['/equipamentos']);

    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
        this.spinner.hide();
      });

  }



  cancel(): void {
    this.router.navigate(['/equipamentos']);
  }
}
