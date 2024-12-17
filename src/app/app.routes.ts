import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShipmentSummaryComponent } from './pages/shipment-summary/shipment-summary.component';

export const routes: Routes = [
    {path:'',component:LoginComponent},
    {path:'login',component: LoginComponent},
    {path: 'shipment-summary', loadComponent: () => import('./pages/shipment-summary/shipment-summary.component').then(m => m.ShipmentSummaryComponent) },
    {path:'shipment-list',loadComponent:() => import('./pages/shipment-list/shipment-list.component').then(m => m.ShipmentListComponent)
        
    },

    
];
