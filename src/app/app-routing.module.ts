import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AssinaturaCreateComponent } from './components/assinatura/assinatura-create/assinatura-create.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteDesativadoComponent } from './components/clientes/cliente-desativado/cliente-desativado.component';
import { ClienteReadComponent } from './components/clientes/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/clientes/cliente-update/cliente-update.component';
import { EquipamentoCreateComponent } from './components/equipamentos/equipamento-create/equipamento-create.component';
import { EquipamentoDesativadoComponent } from './components/equipamentos/equipamento-desativado/equipamento-desativado.component';
import { EquipamentoListaComponent } from './components/equipamentos/equipamento-lista/equipamento-lista.component';
import { EquipamentoReadUnicoComponent } from './components/equipamentos/equipamento-read-unico/equipamento-read-unico.component';
import { EquipamentoReadComponent } from './components/equipamentos/equipamento-read/equipamento-read.component';
import { EquipamentoUpdateComponent } from './components/equipamentos/equipamento-update/equipamento-update.component';
import { OsCreateComponent } from './components/os/os-create/os-create.component';
import { OsImpressaoComponent } from './components/os/os-impressao/os-impressao.component';
import { OsReadUnicoComponent } from './components/os/os-read-unico/os-read-unico.component';
import { OsReadComponent } from './components/os/os-read/os-read.component';
import { OsUpdateComponent } from './components/os/os-update/os-update.component';
import { TestComponent } from './components/test/test.component';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { FourcampsComponent } from './pages/fourcamps/fourcamps.component';
import { OsExecutadasComponent } from './pages/fourcamps/os-executadas/os-executadas.component';
import { OsPendenteComponent } from './pages/fourcamps/os-pendente/os-pendente.component';
import { EnviarOSComponent } from './pages/setores/enviar-os/enviar-os.component';
import { SetoresComponent } from './pages/setores/setores.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';
import { UsuarioListaComponent } from './components/usuario/usuario-lista/usuario-lista.component';


const routes: Routes = [{
  path: "",
  component: ClienteReadComponent
},
{
  path: "clientes",
  component: ClienteReadComponent
},
{
  path: "cliente/create",
  component: ClienteCreateComponent
},
{
  path: "cliente/update/:id",
  component: ClienteUpdateComponent
},
{
  path: "cliente/delete",
  component: ClienteDesativadoComponent
},
{
  path: "equipamentos",
  component: EquipamentoReadComponent
},
{
  path: "equipamento/create",
  component: EquipamentoCreateComponent
},
{
  path: "equipamento/delete",
  component: EquipamentoDesativadoComponent
},
{
  path: "equipamento/update/:id",
  component: EquipamentoUpdateComponent
},
{
  path: "equipamento/readunico/:id",
  component: EquipamentoReadUnicoComponent
},
{
  path: "equipamento/lista",
  component: EquipamentoListaComponent
},
{
  path: "os",
  component: OsReadComponent
},
{
  path: "os/create",
  component: OsCreateComponent
},
{
  path: "os/update/:id",
  component: OsUpdateComponent
},
{
  path: "os/read/:id",
  component: OsReadUnicoComponent
},
{
  path: "os/imprimir",
  component: OsImpressaoComponent
},
{
  path: "os-pendente",
  component: OsPendenteComponent
},
{
  path: "os-executada",
  component: OsExecutadasComponent
},
{
  path: "teste",
  component: TestComponent
},
{
  path: "setores",
  component: SetoresComponent
},
{
  path: "fourcamps/:id",
  component: FourcampsComponent
},
{
  path: "enviarOS",
  component: EnviarOSComponent
},
{
  path: "osPendente",
  component: OsPendenteComponent
},
{
  path: "usuario/create",
  component: UsuarioCreateComponent
},
{
  path: "usuario/listar",
  component: UsuarioListaComponent
},
{
  path: "usuario/update/:id",
  component: UsuarioUpdateComponent
},
{
  path: "assinatura/create/:id",
  component: AssinaturaCreateComponent
},
{
  path: "assinatura/create",
  component: AssinaturaCreateComponent
},
{
  path: "**",
  component: ClienteReadComponent
},
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
