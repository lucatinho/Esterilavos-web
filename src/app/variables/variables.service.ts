import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class VariablesService {

  private url: string = "http://localhost:4200";
  private sessao: any = {};
  private cliente: any = {};
  private clienteNome: any;
  private setor: string;
  private equipamento: any;
  private equipamentoNome: any;
  private setorid: any;
  private equipamentoAutoclave: any;
  private os: any;
  private imprimir: number;
  private usuarioupdate: string;

  constructor(private localStorage: LocalStorageService) { }


  getLocaleUrl() {
    return this.url;
  }
  getSessao() {
    return this.sessao;
  }

  postSessao(username, password, role, ativo) {
    this.sessao = { username, password, role, ativo }
    // console.log("logo sessão: ", this.sessao)

    this.localStorage.store("loginSessao", this.sessao)
  }


  // pega o cliente selecionado na pagina home
  getCliente() {
    return this.cliente;
  }
  postCliente(id) {
    this.cliente = id;
  }

  getClienteNome() {
    return this.clienteNome;
  }
  postClienteNome(nome) {
    this.clienteNome = nome;
  }

  // setor
  getSetor() {
    return this.setor;
  }
  postSetor(id) {
    this.setor = id;
  }

  getSetorID() {
    return this.setorid;
  }
  postSetorID(id) {
    this.setorid = id;
  }

  // equipamento
  getEquipamento() {
    return this.equipamento;
  }
  postEquipamento(id) {
    this.equipamento = id;
  }

  getEquipamentoNome() {
    return this.equipamentoNome;
  }
  postEquipamentoNome(nome) {
    this.equipamentoNome = nome;
  }
  // auto clave equipamento
  getEquipamentoAutoclave() {
    return this.equipamentoAutoclave;
  }
  postEquipamentoAutoclave(Autoclave) {
    this.equipamentoAutoclave = Autoclave;
  }
  // imprimir os
  postImprimir(os) {
    this.os = os
    this.localStorage.store("OSimpressao", this.os)
  }
  getOs() {
    return this.os
  }

  // pegar Usuario Update
  postUsuarioUpdate(usuarioupdate) {
    this.usuarioupdate = usuarioupdate
  }
  getUsuarioUpdate() {
    return this.usuarioupdate
  }



}
