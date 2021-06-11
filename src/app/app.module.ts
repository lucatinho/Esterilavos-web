import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EquipamentoReadComponent } from './components/equipamentos/equipamento-read/equipamento-read.component';
import { EquipamentoCreateComponent } from './components/equipamentos/equipamento-create/equipamento-create.component';
import { EquipamentoUpdateComponent } from './components/equipamentos/equipamento-update/equipamento-update.component';
import { ClienteReadComponent } from './components/clientes/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './components/clientes/cliente-update/cliente-update.component';
import { ClienteCreateComponent } from './components/clientes/cliente-create/cliente-create.component';
import { ClienteDesativadoComponent } from './components/clientes/cliente-desativado/cliente-desativado.component';
import { OsReadComponent } from './components/os/os-read/os-read.component';
import { OsUpdateComponent } from './components/os/os-update/os-update.component';
import { OsCreateComponent } from './components/os/os-create/os-create.component';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';
import { TestComponent } from './components/test/test.component';
import { SetoresComponent } from './pages/setores/setores.component';
import { FourcampsComponent } from './pages/fourcamps/fourcamps.component';
import { EnviarOSComponent } from './pages/setores/enviar-os/enviar-os.component';
import { OsPendenteComponent } from './pages/fourcamps/os-pendente/os-pendente.component';
import { EquipamentoReadUnicoComponent } from './components/equipamentos/equipamento-read-unico/equipamento-read-unico.component';
import { OsExecutadasComponent } from './pages/fourcamps/os-executadas/os-executadas.component';
import { EquipamentoDesativadoComponent } from './components/equipamentos/equipamento-desativado/equipamento-desativado.component';
import { DialogClienteDeleteComponent } from './components/clientes/cliente-read/dialog-cliente-delete/dialog-cliente-delete.component';
import { DialogEquipamentoDeleteComponent } from './components/equipamentos/equipamento-read/dialog-equipamento-delete/dialog-equipamento-delete.component';
import { EquipamentoListaComponent } from './components/equipamentos/equipamento-lista/equipamento-lista.component';
import { OsReadUnicoComponent } from './components/os/os-read-unico/os-read-unico.component';

import {HttpClientModule} from '@angular/common/http';

// forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// localstorage
import {NgxWebstorageModule} from 'ngx-webstorage';
// animacao de loading
import { NgxSpinnerModule } from "ngx-spinner";
// QR code
import { QRCodeModule } from 'angularx-qrcode';
// import { NgxQRCodeModule } from 'ngx-qrcode2';
// material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { AssinaturaCreateComponent } from './components/assinatura/assinatura-create/assinatura-create.component';
import { OsImpressaoComponent } from './components/os/os-impressao/os-impressao.component';

import { RouterModule } from '@angular/router';
import { UsuarioListaComponent } from './components/usuario/usuario-lista/usuario-lista.component';
import { UsuarioUpdateComponent } from './components/usuario/usuario-update/usuario-update.component';












@NgModule({
  declarations: [
    AppComponent,
    EquipamentoReadComponent,
    EquipamentoCreateComponent,
    EquipamentoUpdateComponent,
    ClienteReadComponent,
    ClienteUpdateComponent,
    ClienteCreateComponent,
    ClienteDesativadoComponent,
    OsReadComponent,
    OsUpdateComponent,
    OsCreateComponent,
    HeaderComponent,
    FooterComponent,
    TestComponent,
    SetoresComponent,
    FourcampsComponent,
    EnviarOSComponent,
    OsPendenteComponent,
    EquipamentoReadUnicoComponent,
    OsExecutadasComponent,
    EquipamentoDesativadoComponent,
    DialogClienteDeleteComponent,
    DialogEquipamentoDeleteComponent,
    EquipamentoListaComponent,
    OsReadUnicoComponent,
    UsuarioCreateComponent,
    AssinaturaCreateComponent,
    OsImpressaoComponent,
    UsuarioListaComponent,
    UsuarioUpdateComponent
  ],
  exports: [ RouterModule ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    NgxSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    QRCodeModule,
    MatNativeDateModule
    
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
