import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariablesService } from '../variables/variables.service';


@Injectable({
  providedIn: 'root'
})
export class ApiEsterilavosService {

  // baseUrlonline = "http://localhost:8080/api/"
  baseUrlonline = "https://esterilavos.herokuapp.com/api/"

  constructor(
    private http: HttpClient,
    private variables: VariablesService
  ) { }


  // login
  getUsuario(username: string, password: string) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/usuario/" + username
    // link rede
    let url = this.baseUrlonline + "usuario/" + username
    return this.http.get(url, { headers }).toPromise();
  }

  // ---------------------- Clientes ----------------------
  // listar todos
  getClientes() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/clientes"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "clientes"
    return this.http.get(url, { headers }).toPromise();
  }

  // pegar somente um detalhado
  getClienteUnico(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/cliente/" + id;
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "cliente/" + id;
    return this.http.get(url, { headers }).toPromise();

  }
// adicionar um novo cliente
  postCliente(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/cliente', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "cliente";
    return this.http.post(url, id, { headers }).toPromise();
  }

  // ---------------------- Equipamentos ----------------------
  // listar todos
  getEquipamentos() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/equipamentos"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "equipamentos";
    return this.http.get(url, { headers }).toPromise();
  }

  // pegar um unico equipamento detalhado
  getEquipamentoUnico(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/equipamento/" + id;
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "equipamento/" + id;
    return this.http.get(url, { headers }).toPromise();

  }

  // gravar um equipamento
  postEquipamentos(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/equipamento', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "equipamento";
    return this.http.post(url, id, { headers }).toPromise();
  }


  // ---------------------- OS ----------------------

  // listar todos
  getOs() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/os"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "os"
    return this.http.get(url, { headers }).toPromise();
  }

  // pegar uma unica detalhada
  getOsUnico(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/os/" + id;
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "os/" + id
    return this.http.get(url, { headers }).toPromise();

  }

  // gravar OS
  postOs(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/os', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "os"
    return this.http.post(url, id, { headers }).toPromise();
  }

  // ---------------------- check OS ----------------------

  // listar todos
  getCheck() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/cheackautoclave"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "cheackautoclave";
    return this.http.get(url, { headers }).toPromise();
  }

  // pegar um unico detalhado
  getCheckUnico(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/cheackautoclave/" + id;
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "cheackautoclave/" + id;
    return this.http.get(url, { headers }).toPromise();

  }
// gravar checklist
  postCheck(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/cheackautoclave', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "cheackautoclave";
    return this.http.post(url, id, { headers }).toPromise();
  }

  // ---------------------- Imagem ----------------------
  // pegar somente uma
  getImagemUnica(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/imagem/" + id;
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url =  this.baseUrlonline + "imagem/" + id;
    return this.http.get(url, { headers }).toPromise();

  }

  // cadastrar
  postImagem(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/imagem', id, { headers }).toPromise();
    // link rede
    let url =  this.baseUrlonline + "imagem";
    return this.http.post(url, id, { headers }).toPromise();
  }




  // ---------------------- Setores ----------------------

  // listar todos
  getSetores() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/setores"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "setores"
    return this.http.get(url, { headers }).toPromise();
  }

  // ---------------------- Usuario ----------------------
  // cadastrar
  postUsuario(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/usuario', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "usuario"
    return this.http.post(url, id, { headers }).toPromise();
  }

  // pegar usuario unico
  getUsuarioUnico(id:any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/setores"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "usuario/" + id
    // console.log(" url:  ", url)
    return this.http.get(url, { headers }).toPromise();
  }

  // listar
  getUsuarios() {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // link local
    // let url = "http://localhost:8080/api/setores"
    // return this.http.get(url, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "usuarios"
    return this.http.get(url, { headers }).toPromise();
  }

  // update
  // postUsuario(id: any) {
  //   let username = this.variables.getSessao().username;
  //   let password = this.variables.getSessao().password;

  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
  //   // link local
  //   // return this.http.post('http://localhost:8080/api/usuario', id, { headers }).toPromise();
  //   // link rede
  //   let url = this.baseUrlonline + "usuario"
  //   return this.http.post(url, id, { headers }).toPromise();
  // }

  // ---------------------- Assinatura ----------------------
  // cadastrar
  postAssinatura(id: any) {
    let username = this.variables.getSessao().username;
    let password = this.variables.getSessao().password;

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password), 'Content-Type': 'application/json' });
    // link local
    // return this.http.post('http://localhost:8080/api/assinatura', id, { headers }).toPromise();
    // link rede
    let url = this.baseUrlonline + "assinatura"
    return this.http.post(url, id, { headers }).toPromise();
  }







}
