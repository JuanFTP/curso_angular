import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes que tengan que ver con el usuario
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';

const appRouters: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'home', component: HomeComponent },
	{ path: 'mis-datos', component: UserEditComponent },
	{ path: 'artist/:page', component: ArtistListComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRouters);