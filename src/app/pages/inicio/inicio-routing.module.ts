import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage,
    children:[
      {
        path: 'qr',
        loadChildren: () => import('./../../pages/qr/qr.module').then( m => m.QrPageModule)
      },
      {
        path: 'asistencia',
        loadChildren: () => import('./../../pages/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
      },    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
