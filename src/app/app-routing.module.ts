import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login-administrador',
    loadChildren: () => import('./pages/login-administrador/login-administrador.module').then( m => m.LoginAdministradorPageModule)
  },
  {
    path: 'logup-administrador',
    loadChildren: () => import('./pages/logup-administrador/logup-administrador.module').then( m => m.LogupAdministradorPageModule)
  },
  {
    path: 'login-administrador',
    loadChildren: () => import('./pages/login-administrador/login-administrador.module').then( m => m.LoginAdministradorPageModule)
  },
  { 
    path: 'logup-administrador',
    loadChildren: () => import('./pages/logup-administrador/logup-administrador.module').then( m => m.LogupAdministradorPageModule)
  },
  {
    path: 'options',
    loadChildren: () => import('./pages/options/options.module').then( m => m.OptionsPageModule)
  },
  {
    path: 'profes-register',
    loadChildren: () => import('./pages/profes-register/profes-register.module').then( m => m.ProfesRegisterPageModule)
  },
  {
    path: 'califica-profes',
    loadChildren: () => import('./pages/califica-profes/califica-profes.module').then( m => m.CalificaProfesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
