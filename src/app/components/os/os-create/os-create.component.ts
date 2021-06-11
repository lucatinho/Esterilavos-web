import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiEsterilavosService } from 'src/app/apis/api-esterilavos.service';
import { VariablesService } from 'src/app/variables/variables.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  result: any;
  Os: any = {
    tipo: 'Corretiva',
    ano: '2021',
    mes: '06'
  };
  creia: any = '1';
  list: any = {
    equipamento: this.variables.getEquipamento(),
    cliente: this.variables.getClienteNome(),
    setor: this.variables.getSetor(),
    autoclave: this.variables.getEquipamentoAutoclave(),
    tecnico: this.variables.getSessao().username
  }

  checked = {
    autoclave: {
      id: this.variables.getEquipamentoAutoclave().id
    },
    c1: false,
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

  image1: any = null;
  image2: any = null;
  image3: any = null;
  image4: any = null;
  image5: any = null;
  image6: any = null;
  salvarOutra: number = 1;
  contadorImagem: number = 0;
  imgquebrada: any = [];
  chamarOS: boolean = false;

  imagens: any = [];


  constructor(
    private apiesterilavos: ApiEsterilavosService,
    private router: Router,
    private variables: VariablesService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    console.log("lista:", this.list)
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
  saveImage4(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image4 = myReader.result;

      this.imgquebrada[3] = this.image4.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 5;
    }

    myReader.readAsDataURL(file);

    console.log(this.image4)
  }
  saveImage5(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image5 = myReader.result;

      this.imgquebrada[4] = this.image5.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 6;
    }

    myReader.readAsDataURL(file);

    console.log(this.image5)
  }
  saveImage6(files: FileList) {
    var file: File = files.item(0);
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image6 = myReader.result;

      this.imgquebrada[5] = this.image6.split(",");
      console.log(this.imgquebrada)
      this.salvarOutra = 7;
    }

    myReader.readAsDataURL(file);

    console.log(this.image6)
  }
  //  !------------ pegar imagens -----------------


  OnSumbit(form) {
    console.log(form.value);
    if (this.Os.tipo == "Corretiva") {
      this.verificarImagens();
    } else if (this.Os.tipo == "Preventiva") {
      this.Os.motivo = null
      this.postCheck();
    }

  }


  // salva a check list e pega id
  postCheck() {
    console.log(this.checked)
    this.spinner.show();
    this.apiesterilavos.postCheck(this.checked).then((response: any) => {
      console.log("funcionou check = ", response);
      this.result = response;
      this.verificarImagens();

    })
      .catch((response) => {
        console.log("deu erro pedido = ", response);
        this.result = response;
        this.spinner.hide();
      });
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
          // verifica se ja salvou todas as imagens para chamar funcao de salvar os
          if (chamarpostOS == this.imgquebrada.length) {
            console.log(chamarpostOS, "==", this.imgquebrada.length)
            console.log("imagem ", this.imagens);
            // chama função para salvar a os em si
            this.postOS();
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
      // chama função para salvar a os em si caso nao tenha imagem
      this.postOS();
    }

  }


  postOS() {
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

    // cadastrar os corretiva
    if (this.Os.tipo == "Corretiva") {
      let os = {
        tipo: this.Os.tipo,
        ano: this.Os.ano,
        mes: this.Os.mes,
        status: 'Pendente',
        motivo: this.Os.motivo,
        observacao: this.Os.observacao,
        peca: this.Os.peca,
        datainicial: this.range.value.start,
        datafinal: this.range.value.end,
        cliente: {
          idCliente: this.variables.getCliente()
        },
        equipamento: {
          idEquipamento: this.variables.getEquipamento()
        },
        usuario:{
          login: this.variables.getSessao().username
        },
        check: null,
        img1: campImagem[0],
        img2: campImagem[1],
        img3: campImagem[2],
        img4: campImagem[3],
        img5: campImagem[4],
        img6: campImagem[5]
      }
      console.log(os)

      this.apiesterilavos.postOs(os).then((response: any) => {
        console.log("funcionou os = ", response);
        this.result = response;
        this.spinner.hide();
        this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
        alert('Os Corretiva registrada com Sucesso!')

      })
        .catch((response) => {
          console.log("deu erro pedido = ", response);
          this.result = response;
          this.spinner.hide();
        });
      // cadastrar os preventiva
    } else if (this.Os.tipo == "Preventiva") {
      let os = {
        tipo: this.Os.tipo,
        ano: this.Os.ano,
        mes: this.Os.mes,
        status: 'Pendente',
        motivo: this.Os.motivo,
        observacao: this.Os.observacao,
        peca: this.Os.peca,
        datainicial: this.range.value.start,
        datafinal: this.range.value.end,
        cliente: {
          idCliente: this.variables.getCliente()
        },
        equipamento: {
          idEquipamento: this.variables.getEquipamento()
        },
        usuario:{
          login: this.variables.getSessao().username
        },
        check: {
          id: this.result.id
        },
        img1: campImagem[0],
        img2: campImagem[1],
        img3: campImagem[2],
        img4: campImagem[3],
        img5: campImagem[4],
        img6: campImagem[5]
      }
      console.log(os)
      this.spinner.hide();
      this.spinner.show();
      this.apiesterilavos.postOs(os).then((response: any) => {
        console.log("funcionou os = ", response);
        this.result = response;
        this.spinner.hide();
        this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
        alert('Os Preventiva registrada com Sucesso!')

      })
        .catch((response) => {
          console.log("deu erro pedido = ", response);
          this.result = response;
          this.spinner.hide();
        });
    }


  }
  // volta para a pagina anterior 
  cancel(): void {
    this.router.navigate(['/fourcamps/' + this.variables.getEquipamento()]);
  }



  // postImagens(imagem) {
  //   console.log("chegou: ", imagem)
  //   let imagemformatada = {
  //     tipo: imagem[0],
  //     img: imagem[1]
  //   }

  //   console.log(imagemformatada)
  //   this.spinner.show();
  //   this.apiesterilavos.postImagem(imagemformatada).then((response: any) => {
  //     console.log("funcionou imagem ", this.contadorImagem, " = ", response);
  //     this.imagens[this.contadorImagem] = response;
  //     this.contadorImagem++;
  //     this.spinner.hide();
  //     // chama função para salvar a os em si
  //     if (this.chamarOS == true) {
  //       this.postOS();
  //       console.log("imagem ", this.imagens);
  //     }

  //   })
  //     .catch((response) => {
  //       console.log("deu erro imagem = ", response);
  //       // this.result = response;
  //       this.spinner.hide();
  //     });

  // }

}
