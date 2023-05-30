import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FornecedorComponent } from './fornecedor/fornecedor.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'fornecedor', component: FornecedorComponent },
  { path: 'cliente', component: ClienteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
