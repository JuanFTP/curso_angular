import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { appRoutingProviders, routing } from './app.routing';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
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

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		UserEditComponent,
		ArtistListComponent,
		ArtistAddComponent,
		ArtistEditComponent,
		ArtistDetailComponent,
		AlbumAddComponent,
		AlbumEditComponent,
		AlbumDetailComponent,
		SongAddComponent
	],
	imports: [
		BrowserModule,
		SweetAlert2Module.forRoot(),
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		routing
	],
	providers: [appRoutingProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }