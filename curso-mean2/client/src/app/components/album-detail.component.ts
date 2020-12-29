import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Album } from '../models/album';
import { Song } from '../models/song';
import { AlbumService } from '../services/album.service';
import { SongService } from '../services/song.service';

@Component({
	selector: 'album-detail',
	templateUrl: './../views/album-detail.html',
	providers: [
		AuthenticationService,
		UserService,
		AlbumService,
		SongService
	]
})

export class AlbumDetailComponent implements OnInit {
	public title: string;
	public url: string;
	public album: Album;
	public songs: Song[];
	public identity: any;
	public token: string;
	public listDescription: Array<String>;
	// Variables para mensages
	public alertMessage: string;
	public typeMessage: string = "alert-danger";
	// Variables del player

	public constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _authenticationService: AuthenticationService,
		private _userService: UserService,
		private _albumService: AlbumService,
		private _songService: SongService
	) {
		this.title = "Álbum";
		this.url = GLOBAL.url;
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();

		if(!this._authenticationService.isLogged(this.identity)) {
			this._router.navigate(['/home']);
		}
	}

	ngOnInit(): void {
		console.log("album-detail.component cargado...");

		// Obtener album de la base de datos
		this.getAlbum();
	}

	public getAlbum() {
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._albumService.getAlbum(this.token, id).subscribe(
				(res : any) => {
					if(!res.album) {
						this._router.navigate(['/home']);
					} else {
						this.album = res.album;

						// Obtener las canciones del álbum
						this._songService.getSongs(this.token, res.album._id).subscribe(
							(res : any) => {
								if(!res.songs) {
									// Álbum sin canciones
									console.log("Álbum sin canciones...");
									this.alertMessage = res.message;
									this.typeMessage = "alert-info";
								} else {
									// Setear canciones
									this.songs = res.songs;
								}
							},
							(err : any) => {
								var errorResult = <any>err;
								
								if(errorResult != null) {
									this.alertMessage = err.error.message;
									this.typeMessage = "alert-danger";
								}
							}
						);
					}
				},
				(err : any) => {
					var errorResult = <any>err;

					if(errorResult != null) {
						this.alertMessage = err.error.message;
						this.typeMessage = "alert-danger";
					}
				}
			);
		});
	}
	
	public deleteSongConfirm(id: any) {
		this._songService.deleteSong(this.token, id).subscribe(
			(res : any) => {
				if(!res.song) {
					this.alertMessage = res.message;
					this.typeMessage = "alert-danger";
				} else {
					this.alertMessage = res.message;
					this.typeMessage = "alert-succes";
					this.getAlbum();
				}
			},
			(err : any) => {
				var errorAddArtist = <any>err;
				
				if(errorAddArtist != null) {
					this.alertMessage = err.error.message;
					this.typeMessage = "alert-danger"
				}
			}
		);
	}

	// Métodos para el player
	// Cargar archivo en el Storage
	public loadSong(song: Song):void {
		// Cargar en memoria el objeto son a cargar
	}
}