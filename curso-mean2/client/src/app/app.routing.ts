import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar los componentes que tengan que ver con el usuario
import { HomeComponent } from './components/home.component';

import { UserEditComponent } from './components/user-edit.component';

import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.component';
import { ArtistDetailComponent } from './components/artist-detail.component';

import { AlbumAddComponent } from './components/album-add.component';
import { AlbumEditComponent } from './components/album-edit.component';
import { AlbumDetailComponent } from './components/album-detail.component';

import { SongAddComponent } from './components/song-add.component';

const appRouters: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{ path: 'home', component: HomeComponent },
	{ path: 'mis-datos', component: UserEditComponent },
	{ path: 'artists/:page', component: ArtistListComponent },
	{ path: 'create-artist', component: ArtistAddComponent },
	{ path: 'artist/:id', component: ArtistDetailComponent },
	{ path: 'edit-artist/:id', component: ArtistEditComponent },
	{ path: 'create-album/:artist', component: AlbumAddComponent },
	{ path: 'album/:id', component: AlbumDetailComponent },
	{ path: 'edit-album/:id', component: AlbumEditComponent },
	{ path: 'add-song/:album', component: SongAddComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRouters);