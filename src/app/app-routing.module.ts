import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardRoutes } from './guard/authguard-routes';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'cadastro', loadChildren: './cadastro/cadastro.module#CadastroPageModule' },
  { path: 'principal',
    loadChildren: './principal/principal.module#PrincipalPageModule',
    canActivate: [AuthGuardRoutes] },
  { path: 'adicionar-contato',
    loadChildren: './contato/adicionar-contato/adicionar-contato.module#AdicionarContatoPageModule',
    canActivate: [AuthGuardRoutes]},
  { path: 'visualizar-contato', loadChildren: './contato/visualizar-contato/visualizar-contato.module#VisualizarContatoPageModule',
    canActivate: [AuthGuardRoutes] },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
