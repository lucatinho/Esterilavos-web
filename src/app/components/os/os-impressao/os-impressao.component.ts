import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { LocalStorageService } from 'ngx-webstorage';
import { VariablesService } from 'src/app/variables/variables.service';
import {FormGroup, FormControl} from '@angular/forms';


@Component({
  selector: 'app-os-impressao',
  templateUrl: './os-impressao.component.html',
  styleUrls: ['./os-impressao.component.css']
})
export class OsImpressaoComponent implements OnInit {
  os:any =[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // list:any ={
  //   autoclave:""
  // }

  checked = {
    autoclave: {
      id: ""
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

  constructor(
    private variables: VariablesService,
    private localStorage: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.getOS();
  }

 getOS(){
  this.os = this.localStorage.retrieve('OSimpressao');
  console.log(this.os)

  this.checked = this.os.check
  this.range = new FormGroup({
    start: new FormControl(this.os.datainicial),
    end: new FormControl(this.os.datafinal)
  });
  this.onPrint();

 }

 onPrint(){
  window.print();
}


}
