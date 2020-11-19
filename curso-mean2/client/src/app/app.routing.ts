import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes que tengan que ver con el usuario
import { UserEditComponent } from './components/user-edit.component';

const appRouters: Routes = [
	{ path: '', component: UserEditComponent },
	{ path: 'mis-datos', component: UserEditComponent },
	{ path: '**', component: UserEditComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRouters);